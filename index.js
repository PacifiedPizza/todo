import express from "express";
import bodyParser from "body-parser";
import env from "dotenv"; 
import mongoose from "mongoose";
import Todo from './schema.js'; 
import bcrypt from "bcrypt";
import passport from "passport";
import session from "express-session";
import  LocalStrategy from "passport-local";


env.config();
const app = express();
const saltRounds = 10;
const port = process.env.port;

app.use(
    session({
        secret: process.env.secret,
        resave: false,
        saveUninitialized: true,
    }));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.urlencoded({ extended: true }));

app.use(express.static("public"));


app.use(passport.initialize());
app.use(passport.session());

mongoose.connect(process.env.atlasroute)

const isAuthenticated = (req, res, next) => {
    if (req.isAuthenticated()) {
        return next();
    } else {
        res.redirect('/login');
    }
};

app.get("/", (req, res) => {
    res.render("home.ejs");
});

app.get("/login", (req, res) => {
    res.render("login.ejs");
});

app.get("/register", (req, res) => {
    res.render("register.ejs");
});

app.get("/logout", (req, res) => {
    req.logout(function (err) {
        if (err) {
            return next(err);
        }
        res.redirect("/");
    });
});

app.post("/register", async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    try {
        const checkResult = await Todo.find({ username: username });

        if (checkResult.length > 0) {
            res.send("Username already exists. Try logging in.");
        } else {
            bcrypt.hash(password, saltRounds, async (err, hash) => {
                if (err) {
                    console.error("Error hashing password:", err);
                } else {
                    await Todo.create({ username: username, password: hash });

                    res.render("login.ejs");
                }
            });
        }
    } catch (err) {
        console.log(err);
    }
});

app.post('/login', passport.authenticate('local', {
    successRedirect: '/todos', 
    failureRedirect: '/login', 
    failureFlash: false, 
}));

app.get("/todos", isAuthenticated, async (req, res) => {
    try {
        const loggedInUsername = req.user ? req.user.username : null;
        const result = await Todo.find({ username: loggedInUsername }).exec();
        let todosArray;
        if (result.length > 0) {
            todosArray = result[0].todos;
        } else {
            todosArray = [];
        }
        res.render("index.ejs", { todos: todosArray, loggedInUsername: loggedInUsername });
    } catch (error) {
        console.error('Error:', error);
        res.render("index.ejs", { todos: [], loggedInUsername: null });
    }
});

app.post("/update-todos", isAuthenticated, async (req, res) => {
    try {
        const newitem = req.body.newitem;
        const result = await Todo.updateOne(
            { username: req.user.username },
            {
                $push: {
                    todos: {
                        $each: [newitem]
                    }
                }
            }
        );

        res.redirect("/todos"); 
    } catch (error) {
        console.error('Error:', error);
        res.status(500).send('Internal Server Error');
    }
});

app.post("/delete-todos", isAuthenticated, async (req, res) => {
    try {
        const userindex = req.body.userindex; 
        const unsetResult = await Todo.updateOne(
            { "username": req.user.username },
            { $unset: { [`todos.${userindex}`]: 1 } }
        );

        const pullResult = await Todo.updateOne({ "username": req.user.username },
            { $pull: { "todos": null } }
        );

        res.redirect("/todos"); 
    } catch (error) {
        console.error('Error:', error);
        res.status(500).send('Internal Server Error');
    }
});

passport.use(
    new LocalStrategy(async (username, password, done) => {
        try {
            const result = await Todo.find({ username: username });

            if (result.length > 0) {
                const user = result[0];
                const storedHashedPassword = user.password;

                bcrypt.compare(password, storedHashedPassword, (err, valid) => {
                    if (err) {
                        console.error("Error comparing passwords:", err);
                        return done(err);
                    } else {
                        if (valid) {
                            return done(null, user); 
                        } else {
                            return done(null, false, { message: "Incorrect Password" });
                        }
                    }
                });
            } else {
                return done(null, false, { message: "User not found" });
            }
        } catch (err) {
            console.error("Error:", err);
            return done(err);
        }
    })
);

passport.serializeUser((user, done) => {
    done(null, user._id);
});

passport.deserializeUser(async (id, done) => {
    try {
        const user = await Todo.findById(id);
        done(null, user);
    } catch (err) {
        done(err);
    }
});


app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
