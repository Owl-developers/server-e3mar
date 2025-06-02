import {
    Authorized, Ctx, Mutation, Resolver, 
    UseMiddleware, Arg, Subscription, Root,
    PubSub,
    Args,
} from "type-graphql"

import {Project, CreateProjectArgs} from "../types/project.types"
import ProjectsModel from "../models/Projects"
import { Context, User } from "../../Users/types/user.types"
import { authMiddelware } from "../../helper/auth"
import { 
    checkPermission, languageError,
    throwGraphqlError, throwResolverError,
} from "../../helper"
import { errorHandler } from "../middleware/project.error"

import RolesPermissionsModel from "../../RolesPermissions/models/RolesPermissions"
import { seedRolesPermissions } from "../../seeder/rolesPermissions.seed"

function wait(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

@Resolver(Project)
class ProjectsResolvers {
    @Mutation(() => Project)
    @UseMiddleware(authMiddelware, checkPermission("create project"), errorHandler)
    async createProject(
        @Ctx() { req, res }: Context,
        @Arg("input") input: CreateProjectArgs,
    ): Promise<Project | string> {
        console.log("createProject projects.resolver")
        try {
            const {projectName, description, progress} = input
            const token = res.locals.token
            if (!token) {
                throw throwGraphqlError("unauthenticated",401, languageError('unauthenticated', "غير مسجل"))
            }
            
            const project = await ProjectsModel.create({
                projectName,
                description,
                progress,
            })

            const transformedProject: Project = {
                _id: project._id,
                projectName: project.projectName,
                description: project.description,
                progress: project.progress,
                imageUrl: project.imageUrl,
                createdAt: new Date(project.createdAt),
                updatedAt: new Date(project.updatedAt)
            };

            return transformedProject

        } catch (error) {
            console.log("error projects.resolver")
            // console.log(error)
            console.log(Object.keys(error))
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
        await seedRolesPermissions()

        return ""
    }
}

export {ProjectsResolvers}