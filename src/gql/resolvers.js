import { gql } from 'apollo-server-express'
import {todo_domain} from '../app/todo-domain.js' 
import { socket } from '../server.js'

export const resolvers = {
    Query: {
        getList: async (parent, args) => {
            const todoList = await todo_domain.listAllTodos()
            console.log(todoList)
            return todoList
        }
    },
    Mutation: {
        addTodo: async (parent, args) => {
            const todo = await todo_domain.addTodo({
                name: args.name, todo: args.todo
            })
            console.log(todo)
            if (socket != null){
                socket.clients.forEach(client => {
                    client.send(JSON.stringify({id: todo.id, name: todo.name, todo: todo.todo}))
                });
            }
            return todo
        }
    }
}