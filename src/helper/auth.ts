import { MiddlewareFn } from "type-graphql";
import { Context } from "../Users/types/user.types";
import { languageError, throwGraphqlError, verifyToken } from "./index";


// function authMiddelware(): MiddlewareFn<Context> {
//     return async ({context}, next) => {
//         console.log("authMiddelware")
//         const {req, res} = context
//         try {
//             if(true) {
//                 return throwGraphqlError('here',400, languageError('test auth', 'test auth'))
//             }
//             const token = verifyToken(req.cookies.token)
//             console.log("token", token)
//             next()
//         } catch (error) {
//             console.log("error authMiddelware")
//         }
//     }
// }
function wait(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
const authMiddelware: MiddlewareFn<Context> = async ({context}, next)=> {
    console.log("authMiddelware")
    const {req, res} = context
    try {
        // await wait(5000)
        console.log("req.cookies.token", req.cookies.token)
        const token = verifyToken(req.cookies.token)
        console.log("token", token)
        if(!token) {
            return throwGraphqlError("unauthenticated",401, languageError('unauthenticated', "غير مسجل"))
        }
        res.locals.token = token 
        await next()
        console.log("next")
    } catch (err) {
        console.log("error authMiddelware")
        console.log(err)
        console.log(Object.keys(err))
        console.log(Object.values(err))
        if(err.name == "TokenExpiredError") {
            res.clearCookie("token")
            return throwGraphqlError("unauthenticated",401, languageError('expired', "انتهت صلاحية الجلسة"))
        }
        if(err.name == "JsonWebTokenError") {
            res.clearCookie("token")

            console.log("here")
            
            return throwGraphqlError("unauthenticated",401, languageError('unauthenticated', "غير مسجل"))
        }
        if(err.code == 401) {
            res.clearCookie("token")

            return throwGraphqlError("unauthenticated",401, languageError('unauthenticated','غير مسجل'))
        }
        throw err
    }
}

export {authMiddelware}