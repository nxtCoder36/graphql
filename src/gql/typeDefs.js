import { gql } from 'apollo-server-express'

export const typeDefs = gql `
    type todos {
        id: String,
        name: String,
        todo: String
    }

    type Query {
        getList: [todos]
    }
    
    type Mutation {
        addTodo(name: String!, todo: String!): todos
    } 
` 