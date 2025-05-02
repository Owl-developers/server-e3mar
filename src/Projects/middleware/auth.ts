import { MiddlewareFn } from "type-graphql";
import { Context } from "../../Users/types/user.types";
import { languageError, throwGraphqlError, verifyToken } from "../../helper";


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

const authMiddelware: MiddlewareFn<Context> = async ({context}, next)=> {
    const {req, res} = context
    try {
        const token = verifyToken(req.cookies.token)
        if(!token) {
            return throwGraphqlError("unauthenticated",401, languageError('unauthenticated', "غير مسجل"))
        }
        console.log("token", token)
        res.locals.token = token 
        await next()
    } catch (err) {
        console.log("error authMiddelware")
        console.log(err)
        console.log(Object.keys(err))
        console.log(Object.values(err))
        if(err.name == "TokenExpiredError") {
            return throwGraphqlError("unauthenticated",401, languageError('expired', "انتهت صلاحية الجلسة"))
        }
        if(err.name == "JsonWebTokenError") {
            return throwGraphqlError("unauthenticated",401, languageError('unauthenticated', "غير مسجل"))
        }
        throw err
    }
}

export {authMiddelware}