import "reflect-metadata";
import express, { json, Request, Response } from 'express';
import cors from "cors";
import path from 'path';
import { buildSchema } from 'type-graphql';
import mongoose from "mongoose";
import cookieParser from 'cookie-parser';
import { createServer } from 'http';
import { createYoga, createPubSub } from 'graphql-yoga';
import { GraphQLError } from 'graphql';
import { UserResolvers } from './Users/resolvers/user.resolver';
import { ProjectsResolvers } from './Projects/resolvers/admin/projects.resolver';
import { languageError, throwGraphqlError, verifyToken } from "./helper";

interface Context {
  req: Request;
  res: Response;
}

export const pubSub = createPubSub();

async function bootstrap() {
  const schema = await buildSchema({
    resolvers: [UserResolvers, ProjectsResolvers],
    validate: true,
    emitSchemaFile: true,
    pubSub
  });

  const app: express.Application = express();
  const port: number = 5001;
  
  // CORS Configuration
  const whitelist = [
    'http://localhost:5001',
    'http://localhost:3000', 
    'chrome-extension://flnheeellpciglgpaodhkhmapeljopja'
  ];
  
  app.use(cors({
    credentials: true,
    origin: (origin, callback) => {
      if (!origin || whitelist.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    }
  }));
  
  app.use(json());
  app.use(cookieParser());

  // MongoDB Connection
  const connectDB = async () => {
    await mongoose.connect('mongodb://localhost:27017/e3mar')
      .then(() => console.log('Connected Successfully'))
      .catch((err) => {
        console.error('Connection error:', err);
      });
  };
  
  await connectDB();

  // Create Yoga instance
  const yoga = createYoga({
    schema,
     context:({request}) => {
      pubSub
    },
    graphiql: true
  });

  // Create HTTP server
  const httpServer = createServer(app);
  

  // Apply Yoga middleware
  app.use('/graphql', yoga);

  // Create WebSocket server
  // const wsServer = new WebSocketServer({
  //   server: httpServer,
  //   path: '/graphql',

  // });



// wsServer.on("connection", (s,r)=> {
//   console.log("connected", r.headers.cookie)
//   if(!r.headers.cookie) {
//     console.log('no headers')
//     wsServer.close()
//   }
//   s.on("message", async (ss)=> {
//     console.log("message", ss)
//   })
// })
  // Basic route
  app.get('/', (req: Request, res: Response) => {
    res.send('Hello, Binyan!');
  });

  // Start server
  httpServer.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
    console.log('GraphiQL at http://localhost:5001/graphql');
  });
}

bootstrap()