import jwt from "jsonwebtoken"
import { Context, User } from "../Users/types/user.types";
import { GraphQLError } from "graphql";
import { AuthChecker, MiddlewareFn } from "type-graphql";
import userModel from "../Users/models/Users";

function generateToken(user: User): string {
    var token = jwt.sign({ _id: user._id}, "awd", { expiresIn: '1h' });
    return token
}

function verifyToken(token:string) {
    return jwt.verify(token, "awd");
}

function languageError(en:string, ar:string): Record<string, any> {
    return {
        en, ar
    }    
}

function checkPermission(permissionName: string):MiddlewareFn<Context> {
    return async ({context}, next)=> {
        await next()
        console.log("check permission")
        try {
            const {req, res} = context    
            console.log({permissionName})
            const token = verifyToken(req.cookies.token)

            
        } catch (error) {
            
        }
    }
}

const checkRoles: AuthChecker<Context> = async ({context}, roles) => {
    console.log("checkRoles")
    const {req, res} = context
    const containSuperAdmin = roles.includes("superAdmin")
    const token: any = verifyToken(req.cookies.token)
    console.log(token)
    const user = await userModel.findById(token?._id)
    console.log(user)
    if(containSuperAdmin) {
        if(user.isSuperAdmin) {
            return true
        }
        throw throwGraphqlError("forbiden", 403, languageError("you don't have permission", "لا تملك صلاحية"))
    }
    throw throwGraphqlError("forbiden", 403, languageError("you don't have permission", "لا تملك صلاحية"))
    // return false
}

function throwGraphqlError(message: string, code:number, _message: Record<string, any>): GraphQLError {
    return new GraphQLError(message, null, null, null, null,null, {code, message: _message})

}

function throwKnownError(code: number, message: string) {
    return {
        code,message
    }
}

export {
    generateToken, 
    verifyToken, 
    languageError, 
    throwKnownError, 
    throwGraphqlError,
    checkRoles,
    checkPermission
}