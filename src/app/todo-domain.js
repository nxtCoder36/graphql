import mongoose from "mongoose";
import { nanoid } from "nanoid";
import { tododb } from "../db/connect.js";

const todoSchema = new mongoose.Schema({
    id: {type: String, unique: true, default: ()=>"todo-"+nanoid(40)},
    name: String,
    todo: String
})

const model = tododb.model("todotable", todoSchema);

const listAllTodos = async () => {
    return model.find();
}

const addTodo = async ({name,todo}) => {
    return model.create({name,todo})
}

export const todo_domain = {listAllTodos,addTodo}