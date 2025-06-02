import "reflect-metadata"
import express, {json, Request, Response } from 'express';
import cors from "cors"
import jwt from "jsonwebtoken"
import path from 'path';
import { buildSchema } from 'type-graphql';
import { printSchema } from 'graphql';
import mongoose from "mongoose";
import cookieParser from 'cookie-parser';
import { UserResolvers } from './Users/resolvers/user.resolver';
import { ProjectsResolvers } from './Projects/resolvers/admin/projects.resolver';
import { errorValidationHandler } from "./helper/validationError";
import { createYoga,createPubSub } from 'graphql-yoga';

interface Context {
  req: Request
  res: Response
}

async function bootstrap() {
  const pubSub = createPubSub();
  const schema = await buildSchema({
    resolvers: [UserResolvers,ProjectsResolvers],
    validate: true,
    emitSchemaFile: true,
    // pubSub
    // globalMiddlewares: [errorValidationHandler],
  });


  const app: express.Application = express();
  const port: number = 5001;
  
  const {connect} = mongoose
  var whitelist = ['http://localhost:5001','http://localhost:3000', 'chrome-extension://flnheeellpciglgpaodhkhmapeljopja']
  var corsOptions = {
      credentials: true,
      // origin: function(origin, callback) {
      //   // i can not access from http://localhost:5001
        
      //     console.log("origin",origin)
      //   if (!origin) return callback(null, true);
      //   if (whitelist.indexOf(origin) !== -1) {
      //     callback(null, true)
      //   } else {
      //     callback(new Error('Not allowed by CORS'))
      //   }
      // }
      origin: function(origin, callback) {
        // i can not access from http://localhost:5001
        
          console.log("origin",origin)
        if (!origin) return callback(null, true);
        if (whitelist.indexOf(origin) !== -1) {
          callback(null, true)
        } else {
          callback(new Error('Not allowed by CORS'))
        }
      }
  }
  app.use(cors(corsOptions))
  app.use(json())
  app.use(cookieParser())
  
  const connectDB = async () => {
    await connect('mongodb://localhost:27017/e3mar')
      .then(() => console.log('Connected Successfully'))
      .catch((err) =>{
          console.log("err mongoose connect", err)
          console.error('Not Connected')
      });
  }
  
  connectDB()

  const yoga = createYoga({
    schema,
    context: {
      pubSub
    },
    graphiql: true
  })

  // app.use('/graphql', graphqlHTTP((req, res) => {
  //   return {
  //     schema ,
  //     context:{req, res},
  //     graphiql: {

  //     },

  //      // Enable GraphiQL for in-browser testing
  //     // customExecuteFn: errorValidationHandler
  //     // customFormatErrorFn:errorValidationHandler
  //   }

  // }));
  app.use('/graphql', yoga)
  // GraphiQL endpoint


  app.get('/', async (req: Request, res: Response) => {

    res.send('Hello, Binyan!');
  });

  app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
    console.log('GraphiQL at http://localhost:5001/graphql');
  });

}
bootstrap()