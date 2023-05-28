import express from 'express'
import { ApolloServer } from 'apollo-server';
import { resolvers } from './gql/resolvers.js'
import { typeDefs } from './gql/typeDefs.js';
import cors from 'cors'
import http from 'http'
import {WebSocketServer} from 'ws';

// Configuring graphql server

// const server = new ApolloServer({
//     typeDefs: typeDefs,
//     resolvers: resolvers
// })

// const port = process.env.PORT

// server.listen({port}, (err) => {
//     if(err) {
//         console.log("Error: ", err)
//     }
//     console.log(`Server listening on Port ${port}`)
// })

// Configuring graphql server along with websocket

const app = express()

const server = new ApolloServer({
    typeDefs: typeDefs,
    resolvers: resolvers
})

const httpServer = http.createServer({server})

const port = process.env.PORT

const socket = new WebSocketServer({ server: httpServer })

socket.on('connection', wss => {
    console.log('Websocket connection started')
    wss.on('close', () => {
        console.log('Connection Closed')
    })
})

httpServer.listen(port, '0.0.0.0', (err) => {
    if (err) {
        console.log(err)
    }
    console.log(`Server listening on Port ${port}`)
})