import "reflect-metadata"
import express, {json, Request, Response } from 'express';
import cors from "cors"
import jwt from "jsonwebtoken"
import path from 'path';
import { graphqlHTTP } from 'express-graphql';
import { buildSchema } from 'type-graphql';
import mongoose from "mongoose";
import cookieParser from 'cookie-parser';
import { UserResolvers } from './Users/resolvers/user.resolver';
import { ProjectsResolvers } from './Projects/resolvers/projects.resolver';
import { errorValidationHandler } from "./helper/validationError";
import { checkRoles } from "./helper";

interface Context {
  req: Request
  res: Response
}

async function bootstrap() {
  
    const schema = await buildSchema({
      resolvers: [UserResolvers, ProjectsResolvers],
      validate: true,
      emitSchemaFile: true,
      globalMiddlewares: [errorValidationHandler],
    });



  const app: express.Application = express();
  const port: number = 5001;
  
  const {connect} = mongoose
  
  app.use(cors())
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



  app.use('/graphql', graphqlHTTP((req, res) => {
    return {
      schema ,
      context:{req, res},
      graphiql: true, // Enable GraphiQL for in-browser testing
      // customExecuteFn: errorValidationHandler
      // customFormatErrorFn:errorValidationHandler
    }

  }));
  // app.use('/graphql', createHandler({
  //   schema,
    
  //   // rootValue: root
  // }));

  app.get('/', async (req: Request, res: Response) => {

    res.send('Hello, Binyan!');
  });

  app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
  });

}
bootstrap()