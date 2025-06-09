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
import { ProjectsUserResolvers } from './Projects/resolvers/user/projectsUser.resolver';
import { languageError, throwGraphqlError, verifyToken } from "./helper";

interface Context {
  req: Request;
  res: Response;
}

export const pubSub = createPubSub();

async function bootstrap() {
  const schema = await buildSchema({
    resolvers: [
      UserResolvers, 
      ProjectsResolvers,
      ProjectsUserResolvers
    ],
    emitSchemaFile: true,
    validate: true,
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
    plugins: [{

      onSubscribe: async (ctx, msg)=> {
        const cookie = ctx.context.req.cookies
        console.log('===== on sub ======')
        console.log('===== ctx', ctx.context.req.cookies.token )
        console.log('===== msg', msg)
        try {
          const token = verifyToken(cookie.token)
          if(!token) {
            //in production
            // throw throwGraphqlError("unauthenticated",401, languageError('unauthenticated', "غير مسجل"))
            //in development
            throw throwGraphqlError("unauthenticated",401, languageError('unauthenticated onSub', " غير مسجل عند الاشتراك"))
  
          }
          ctx.context.res.locals.token = token
        } catch (err) {
          console.log("on sub error" ,err)
          ctx.context.res.clearCookie('token')
          if(err.name == "TokenExpiredError") {
            ctx.context.res.clearCookie('token')
            throw throwGraphqlError("unauthenticated",401, languageError('expired', "انتهت صلاحية الجلسة"))
          }
          if(err.name == "JsonWebTokenError") {
            ctx.context.res.clearCookie('token')
            console.log("here")            
            throw throwGraphqlError("unauthenticated",401, languageError('unauthenticated', "غير مسجل"))
          }
          if(err.code == 401) {
            ctx.context.res.clearCookie('token')
            throw throwGraphqlError("unauthenticated",401, languageError('unauthenticated','غير مسجل'))
          }
        }
      }
    }],
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