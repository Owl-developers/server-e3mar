import {
    Authorized, Ctx, Mutation, Resolver, 
    UseMiddleware, Arg, Subscription, Root,
    PubSub,
    PubSubEngine,
    Args,
} from "type-graphql"

import {Project, CreateProjectArgs} from "../types/project.types"
import ProjectsModel from "../models/Projects"
import { Context, User } from "../../Users/types/user.types"
import { authMiddelware } from "../../helper/auth"
import { 
    checkPermission, languageError,
    throwGraphqlError, throwResolverError,
    roleUserInProject
} from "../../helper"
import userModel from "../../Users/models/Users"
import { errorHandler } from "../middleware/project.error"
import PermissionsModel from "../../Permissions/models/Permissions"
import rolesModel from "../../Roles/models/Roles"
import RolesPermissionsModel from "../../RolesPermissions/models/RolesPermissions"
import { GraphQLError } from "graphql"

@Resolver(Project)
class ProjectsResolvers {
    @Mutation(() => Project)
    @UseMiddleware(authMiddelware, errorHandler)
    async createProject(
        @Ctx() { req, res }: Context,
        @Arg("input") input: CreateProjectArgs,
    ): Promise<Project | string> {
        console.log("projects.resolver")
        try {
            const {projectName, description, progress, projectManager} = input
            const token = res.locals.token
            if (!token) {
                throw throwGraphqlError("unauthenticated",401, languageError('unauthenticated', "غير مسجل"))
            }
            const manager = await userModel.findOne({username: projectManager})
            if(!manager) {
                throw throwResolverError(404, "user not found")
            }

            const project = await ProjectsModel.create({
                projectName,
                projectManager_id: manager._id,
                createdBy_id: token._id,
            })
            // const project = await ProjectsModel.findOne({projectName}).populate("createdBy_id").populate("projectManager_id").populate("engineers_id").populate("workers_id").populate("owner_id")
            console.log(project)
            console.log("owner",project.owner_id)
            
            const transformedProject: Project = {
                _id: project._id,
                projectName: project.projectName,
                description: project.description,
                progress: project.progress,
                imageUrl: project.imageUrl,
                createdBy_id: project.createdBy_id?._id ? {username: project.createdBy_id['username'], _id: project.createdBy_id._id}: null,
                projectManager_id: project.projectManager_id?._id ? {username: project.projectManager_id['username'], _id: project.projectManager_id._id}: null,
                engineers_id: project.engineers_id ? project.engineers_id.map((engineer:any) => ({ username: engineer.username, _id: engineer._id })) : [],
                workers_id: project.workers_id ? project.workers_id.map((worker: any) => ({username: worker.username, _id: worker._id})) : [],
                owner_id: project.owner_id?._id ? {username: project.owner_id['username'], _id: project.owner_id._id}: null,
                createdAt: new Date(project.createdAt),
                updatedAt: new Date(project.updatedAt)
            };


            return transformedProject

        } catch (error) {
            console.log("error projects.resolver")
            console.log(error)
            throw error
        }

        
    }
    // seed permissions in db
    @Mutation(()=>String)
    @UseMiddleware(errorHandler, authMiddelware)
    async _test(
        @Ctx() { req, res }: Context,
    ): Promise<string> {
        console.log("_test resolver")
        const myProjects = await ProjectsModel.find({ $or: [
            {engineers_id: {$in: [res.locals.token._id]}},
            {workers_id: {$in: [res.locals.token._id]}},
            {owner_id: res.locals.token._id},
            {projectManager_id: res.locals.token._id},
            {createdBy_id: res.locals.token._id}
        ]})

        // const role = await roleUserInProject(project, res.locals.token._id);
        const _role = await rolesModel.findOne({roleName: "worker"})
        const permissions = await PermissionsModel.find({tag: 'task'})
        console.log({permissions})
        const rolePermissions = await RolesPermissionsModel.find({role_id: _role._id, permission_id: {$in: permissions.map(permission => permission._id)}})
        .populate("permission_id")
        .populate("role_id")
        const projectsWithRoles = await Promise.all(myProjects.map(async (project) => {
            return {
                ...project.toObject(),
                // myRole: role,
                role: _role,
                rolePermissions: rolePermissions
            };
        }));
        // console.log("projectsWithRoles", projectsWithRoles.map(project => project.rolePermissions))
        console.log("projectsWithRoles", rolePermissions)


        console.log(await PermissionsModel.find())

        return ""
    }
}

export {ProjectsResolvers}