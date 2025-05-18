// import { GraphQLError } from "graphql";
import { GraphQLError } from "graphql/error";
import { Error } from "mongoose";
import { MiddlewareFn } from "type-graphql";
import { Context } from "../types/user.types";
import { languageError, throwGraphqlError } from "../../helper";
import { ValidationError } from "class-validator";


export const errorHandler: MiddlewareFn<Context> = async ({info, root,args}, next)=> {
    try {
        console.log(args)
        console.log( new Date().getUTCMilliseconds() )
        await next()
        console.log( new Date().getUTCMilliseconds() )

        console.log("after")
    } catch (err) {
        console.log("err:",err)
        // console.log(Object.keys(err))
        // if(Object.keys(err).includes('validationErrors')) {
        //     console.log('validationErrors')
        //     console.log(Object.keys(err))
        //     throw err
        // }
        console.log("details:",err.validationErrors)
        if(err.code == 11000) {
            return throwGraphqlError('try another name',11000, languageError('try another name',"جرب اسم مستخدم ااخر"))
        }
        if(err.code == 404) {
            return throwGraphqlError("can't find user",404, languageError('user name or password incorrect','اسم المستخدم او كلمة السر غير صحيحة'))
        }
        if(err.code == 401) {
            return throwGraphqlError("unauthenticated",401, languageError('unauthenticated','غير مسجل'))
        }
        throw err        
    }
}


var ve: ValidationError[]

class Validation  {
    static getValidationError(err: ValidationError[]) {
        var property = err[0].property
        var constraint = Object.keys(err[0].constraints)[0]
        console.log("property", property)
        console.log("constraint", constraint)
    }
}