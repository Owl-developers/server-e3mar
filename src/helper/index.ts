import jwt from "jsonwebtoken"
import { Context, User } from "../Users/types/user.types";
import { GraphQLError } from "graphql";
import { AuthChecker, MiddlewareFn } from "type-graphql";
import userModel from "../Users/models/Users";
import { Project } from "../Projects/types/project.types";
import ProjectsModel from "../Projects/models/Projects";
import rolesPermissionsModel from "../RolesPermissions/models/RolesPermissions";
import MemberModel from "../Member/model/Members.model";


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

type permission =

"view all projects" |
"create project" | 
"edit project" |
"delete project" |

"view all daily reports" |
"create daily report" |
"edit daily report" |
"delete daily report" |

"view all tasks" |
"create task" |
"edit task" |
"delete task" |

"assign user" |
"unassign user"




function checkPermission(permissionName: permission):MiddlewareFn<Context> {
    return async ({context,args}, next)=> {
        console.log("check permission")
        const {req, res} = context
        // if(permissionName == 'create project') {
        //     const user = await userModel.findById(res.locals.token._id)
        //     if(user.isSuperAdmin) {
        //         await next()
        //         return
        //     }
        //     return throwGraphqlError("forbiden", 403, languageError("you don't have permission", "لا تملك صلاحية"))
        // }
        let role: string
        const user = await userModel.findById(res.locals.token._id)
        if(user.isSuperAdmin) {
            role = "superAdmin"
        }
        else {
            const member = await MemberModel.findOne({_userId: res.locals.token._id}).select('role')
            if(!member) {
                return throwGraphqlError("forbiden", 403, languageError("you don't have permission", "لا تملك صلاحية"))
            }
            role = member.role
        }
        // const user = await userModel.findById(res.locals.token._id)
        const rolesPermissions = await rolesPermissionsModel.findOne({permissionName, roleName: role})
        if(!rolesPermissions) {
            return throwGraphqlError("forbiden", 403, languageError("you don't have permission", "لا تملك صلاحية"))
        }
        
        await next()
        console.log("check permission")
    }
}

function throwGraphqlError(message: string, code:number, _message: Record<string, any>): GraphQLError {
    return new GraphQLError(message, null, null, null, null,null, {code, message: _message})

}
function throwValidationError(message: string, code:number,property:string, _message: Record<string, any>): GraphQLError {
    return new GraphQLError(message, null, null, null, null,null, {code, property, message: _message})
}

function throwResolverError(code: number, message: string) {
    return {
        code,message
    }
}

export {
    generateToken, 
    verifyToken, 
    languageError, 
    throwResolverError, 
    throwGraphqlError,
    checkPermission,
    throwValidationError
}