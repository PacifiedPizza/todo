import { Schema, model } from 'mongoose';

const todoSchema = new Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    todos: { type: [String], default: [] },
});

const Todo = model('Todo', todoSchema, 'todolist'); 


export default Todo;
