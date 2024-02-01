# Todo Manager

A secure and efficient Todo List application with user registration and login features. The project utilizes bcrypt for password hashing and MongoDB for data storage.
The project is deployed on [Render](https://to-do-q8pb.onrender.com)


## Table of Contents
- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Dependencies](#dependencies)
- [Contributing](#contributing)
- [License](#license)

## Features

- **User Registration**: Allows users to register an account with a secure password hash.
- **User Login**: Provides a login system for registered users.
- **Todo Management**: Allows users to create, update, and delete their todo tasks.
- **Secure Authentication**: Implements bcrypt for password hashing and ensures secure user authentication.
- **Persistent Data Storage**: Utilizes MongoDB to store user information and todo tasks.

## Installation

To run the Todo Manager locally, follow these steps:

1. Clone the repository to your local machine.
    ```bash
    git clone https://github.com/PacifiedPizza/todo.git
    ```

2. Install the dependencies.
    ```bash
    cd capestone-todo
    npm install
    ```

3. Create a `.env` file in the project root and configure the MongoDB connection URL:
    ```env
    MONGODB_URI=your_mongodb_connection_url
    SESSION_SECRET=your_session_secret
    ```

4. Start the server.
    ```bash
    npm start
    ```

5. Open your web browser and navigate to [http://localhost:3000](http://localhost:3000) to use the Todo Manager application.

## Usage

- Register a new account using the provided registration form.
- Log in with your registered credentials.
- Add, update, or delete todo tasks from the user dashboard.

## Dependencies

This project uses the following npm packages:

- [bcrypt](https://www.npmjs.com/package/bcrypt): A library to help you hash passwords.
- [body-parser](https://www.npmjs.com/package/body-parser): Node.js body parsing middleware.
- [dotenv](https://www.npmjs.com/package/dotenv): A zero-dependency module that loads environment variables.
- [ejs](https://www.npmjs.com/package/ejs): Embedded JavaScript templates for building dynamic web applications.
- [express](https://www.npmjs.com/package/express): A fast, unopinionated, minimalist web framework for Node.js.
- [express-session](https://www.npmjs.com/package/express-session): Session middleware for Express.
- [mongodb](https://www.npmjs.com/package/mongodb): The official MongoDB driver for Node.js.
- [mongoose](https://www.npmjs.com/package/mongoose): A MongoDB object modeling tool designed to work in an asynchronous environment.
- [passport](https://www.npmjs.com/package/passport): Simple, unobtrusive authentication for Node.js.
- [passport-local](https://www.npmjs.com/package/passport-local): Passport strategy for authenticating with a username and password.

## Contributing

Feel free to contribute to the project. If you have any improvements or new features, please open an issue or submit a pull request.

1. Fork the repository
2. Create your feature branch 
3. Commit your changes 
4. Push to the branch 
5. Open a pull request

## License

This project is licensed under the ISC License - see the [LICENSE](LICENSE) file for details.
