import express from 'express'
import { ApolloServer } from 'apollo-server-express';
import { resolvers } from './gql/resolvers.js'
import { typeDefs } from './gql/typeDefs.js';
import cors from 'cors'
import http from 'http'
import {WebSocketServer} from 'ws';

// // Configuring graphql server
// const app = express()

// const apolloServer = new ApolloServer({
//     typeDefs,
//     resolvers
// });

// const port = process.env.PORT

// await apolloServer.start();
// apolloServer.applyMiddleware({ app })

// app.listen({port}, (err) => {
//     if(err) {
//         console.log("Error: ", err)
//     }
//     console.log(`Server listening on Port ${port}`)
// })

// Configuring graphql server along with websocket

const app = express()
const server = http.createServer(app);

const apolloServer = new ApolloServer({
    typeDefs,
    resolvers
});

const port = process.env.PORT

app.use(cors())
await apolloServer.start();
apolloServer.applyMiddleware({ app })

export const socket = new WebSocketServer({ server })

socket.on('connection', wss => {
    console.log('Websocket connection started')
    wss.on('close', () => {
        console.log('Connection Closed')
    })
})

server.listen(port, (err) => {
    if(err) {
        console.log(err)
    }
    console.log(`server listening on port ${port}`)
}) 