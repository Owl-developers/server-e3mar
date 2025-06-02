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
        if(err.code == "404" && err.message == "project not found") {
            return throwGraphqlError("project not found",404, languageError("project not found", "المشروع غير موجود"))
        }
        if(err.code == "404" && err.message == "no projects found") {
            return throwGraphqlError("no projects found",404, languageError("no projects found", "لا يوجد مشاريع"))
        }
        if(err.code == "400" && err.message == "user already in the project") {
            return throwGraphqlError("user already in the project",400, languageError("user already in the project", "المستخدم موجود بالفعل في هذا المشروع"))
        }
        if(err.code == "500" && err.message) {
            return throwGraphqlError(err.message,500, languageError('error from our server', "خطأ في الخادم"))   
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