import {Authorized, Ctx, Mutation, Resolver, UseMiddleware, ID, Query, Arg} from "type-graphql"
import {Project, CreateProjectArgs} from "../types/project.types"
import ProjectsModel from "../models/Projects"
import { Context, User } from "../../Users/types/user.types"
import { authMiddelware } from "../middleware/auth"
import { checkPermission, languageError, throwGraphqlError, throwKnownError } from "../../helper"
import userModel from "../../Users/models/Users"
import { errorHandler } from "../middleware/project.error"
@Resolver(Project)
class ProjectsResolvers {
    @Mutation(()=>Project)
    @UseMiddleware(authMiddelware, checkPermission("create project"), errorHandler)
    async createProject(@Ctx() {req, res}: Context, @Arg("input") input: CreateProjectArgs):Promise<Project | string> {
        console.log("projects.resolver")
        try {
            const {projectName, description, progress, imageUrl, projectManager} = input
            const token = res.locals.token
            if (!token) {
                throw throwGraphqlError("unauthenticated",401, languageError('unauthenticated', "غير مسجل"))
            }
            const manager = await userModel.findOne({username: projectManager})
            if(!manager) {
                throw throwKnownError(404, "user not found")
            }

            const project = await ProjectsModel.create({
                projectName,
                projectManager_id: manager._id,
                createdBy_id: token._id,
            })

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
            };
            return transformedProject

        } catch (error) {
            console.log("error projects.resolver")
            console.log(error)
            throw error
        }

        
    }
}



export {ProjectsResolvers}