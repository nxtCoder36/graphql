import { gql } from 'apollo-server-express'
import {todo_domain} from '../app/todo-domain.js' 

export const resolvers = {
    Query: {
        getList: async (parent, args) => {
            const todoList = await todo_domain.listAllTodos()
            return todoList
        }
    },
    Mutation: {
        addTodo: async (parent, args) => {
            const todo = await todo_domain.addTodo({
                name: args.name, todo: args.todo
            })
            return todo
        }
    }
}