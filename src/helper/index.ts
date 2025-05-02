import jwt from "jsonwebtoken"
import { Context, User } from "../Users/types/user.types";
import { GraphQLError } from "graphql";
import { AuthChecker, MiddlewareFn } from "type-graphql";
import userModel from "../Users/models/Users";
import PermissionsModel from "../Permissions/models/Permissions";
import { Project } from "../Projects/types/project.types";
import RolesModel from "../Roles/models/Roles";
import ProjectsModel from "../Projects/models/Projects";

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
"create project" | 
"view project" |
"view projects" |
"edit project" |
"delete project" |
"create daily report" |
"create daily report" |
"edit daily report" |
"delete daily report" |
"create task" |
"view task/s" |
"edit task" |
"delete task" |
"assign user" |
"unassign user"

function roleUserInProject (project: Project, userId: any) {
    console.log("roleUserInProject")
    console.log(project.engineers_id)
    console.log(project.engineers_id.includes(userId))


    var roleUser = ""
    if(project.createdBy_id && project.createdBy_id._id.equals(userId)) {
        return "superAdmin"
    }
    if(project.projectManager_id && project.projectManager_id._id.equals(userId)) {
        return "manager"
    }
    if(project.owner_id && project.owner_id._id.equals(userId)) {
        return "owner"
    }
    if(project.engineers_id && project.engineers_id.includes(userId)) {
        return "engineer"
    }
    if(project.workers_id && project.workers_id.includes(userId)) {
        return "worker"
    }
}
function checkPermission(permissionName: permission):MiddlewareFn<Context> {
    return async ({context,args}, next)=> {
        console.log("check permission")
        const {req, res} = context
        if(permissionName == 'create project') {
            const user = await userModel.findById(res.locals.token._id)
            if(user.isSuperAdmin) {
                await next()
                return
            }
            return throwGraphqlError("forbiden", 403, languageError("you don't have permission", "لا تملك صلاحية"))
        }
        console.log("args", args.input.projectName)
        const project = await ProjectsModel.findOne({$or: [
            {engineers_id: {$in: [res.locals.token._id]}}
        ]})
        .populate("owner_id")
        .populate("createdBy_id")
        .populate("projectManager_id")
        if(!project) {
            throw throwKnownError(404, "project not found")
        }
        console.log(res.locals.token)
        console.log({project})
        const roleName = roleUserInProject(project, res.locals.token._id)
        console.log({roleName})
        const permission = await PermissionsModel.findOne({permissionName})
        const role = await RolesModel.findOne({})

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
    checkPermission
}