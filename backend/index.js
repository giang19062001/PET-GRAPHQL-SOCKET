import express from 'express'
import http from 'http'
import bodyParser from 'body-parser'
import cors from 'cors'
import mongoose from 'mongoose'
import {Server} from 'socket.io'
import { ApolloServer } from '@apollo/server'
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import { makeExecutableSchema } from '@graphql-tools/schema';
import { WebSocketServer } from 'ws';
import { useServer } from 'graphql-ws/lib/use/ws';
import {expressMiddleware} from '@apollo/server/express4'
import 'dotenv/config'
import {typeDefs} from './schemas/index.js'
import {resolvers} from './resolvers/index.js'
import Redis  from 'ioredis'
import storeSocketRedis from './socket.js'

const app = express()
const httpServer = http.createServer(app)

// tạo kết nối socket 
const io = new Server(httpServer, {
  cors: {
    origin: 'http://localhost:3000', 
    methods: ['GET', 'POST'], 
    credentials: true, 
  }
});

// Thiết lập Redis client
const redisClient = new Redis("rediss://default:AZwRAAIncDE3YWFmOWI2MWZmOTI0MTYzODY4YjE0MTM4NDczZWRjOXAxMzk5NTM@eternal-stingray-39953.upstash.io:6379");
io.on('connection', (socket) => {
  storeSocketRedis(io, socket, redisClient)
});

// Tạo máy chủ GraphQL
const wsServer = new WebSocketServer({
    server: httpServer,
    path: '/graphql',
  });
const schema = makeExecutableSchema({typeDefs, resolvers})
const serverCleanup = useServer({ schema }, wsServer);
const server = new ApolloServer({
    schema,
    plugins: [
      ApolloServerPluginDrainHttpServer({ httpServer }),
        {
        async serverWillStart() {
          return {
            async drainServer() {
              await serverCleanup.dispose();
            },
          };
        },
      },
    ],
  });
await server.start()

// sử dụng các thư viện
app.use(cors(), bodyParser.json(), expressMiddleware(server,{}))

// Khởi động máy chủ
mongoose.connect(process.env.DB_MONGO, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then( async ()=>{
    await new Promise((resolve) => httpServer.listen({port : process.env.PORT || 4000}, resolve))
    console.log('http://localhost:4000/')
})


