import { MiddlewareFn } from "type-graphql";
import { Context } from "../../Users/types/user.types";
import { languageError, throwGraphqlError } from "../../helper";

const errorHandler: MiddlewareFn<Context> = async ({info, root,args}, next)=> {
    try {
        await next()
    } catch (err) {
        console.log("project errorHandler")
        console.log("error",err)
        console.log("error",err)
        if(err.code == "11000") {
            return throwGraphqlError("project already exists",400, languageError("project already exists", "المشروع موجود بالفعل"))
        }
        if(err.code == "404" && err.message == "user not found") {
            return throwGraphqlError("user not found",404, languageError("user not found", "المستخدم غير موجود"))
        }
        // if(err.code == "404") {
        //     return throwGraphqlError("project not found",404, languageError("project not found", "المشروع غير موجود"))
        // }
        throw err
    }
}


export {
    errorHandler
}