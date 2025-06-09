import {
    Authorized, Ctx, Mutation, Resolver, 
    UseMiddleware, Arg, Subscription, Root,
    PubSub,
    Query,
    Args,
    ID,

} from "type-graphql"


import {Project, CreateProjectArgs, Sub, AddManagerToProjectInput} from "../../types/project.types"
import ProjectsModel from "../../models/Projects"
import { Context, User } from "../../../Users/types/user.types"
import { authMiddelware } from "../../../helper/auth"
import { 
    checkPermission, languageError,
    throwGraphqlError, throwResolverError,
} from "../../../helper"
import { errorHandler } from "../../middleware/project.error"
import RolesPermissionsModel from "../../../RolesPermissions/models/RolesPermissions"
import { seedRolesPermissions } from "../../../seeder/rolesPermissions.seed"
import { errorValidationHandler } from "../../../helper/validationError"
import MemberModel from "../../../Member/model/Members.model"
import UserModel from "../../../Users/models/Users"
import userModel from "../../../Users/models/Users"
import { pubSub } from "../../../server"






function wait(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
interface test {
    _id: typeof ID
}
@UseMiddleware(errorValidationHandler)
@Resolver()
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
    
    @Query(()=> [Project])
    @UseMiddleware(authMiddelware, checkPermission('view all projects'), errorHandler)
    async getAllProjects(
        @Ctx() { req, res }: Context,
    ): Promise<Project[]> {
        console.log("getProjects projects resolver")

        const token = res.locals.token
        if (!token) {
            throw throwGraphqlError("unauthenticated",401, languageError('unauthenticated', "غير مسجل"))
        }
        
        let allProjects = await ProjectsModel.find()
        if(allProjects.length == 0) {
            console.log('no all project')
            throw throwResolverError(404, 'no projects found')
        }
        console.log("userProjects", allProjects)
        return allProjects
    }

    @Query(() => Project, {nullable: true})
    @UseMiddleware(authMiddelware, errorHandler)
    async getProjectById(
        @Ctx() { req, res }: Context,
        @Arg("_id") _id: string
    ): Promise<Project> {
        console.log('getProjectById resolver')
        const token = res.locals.token
        if (!token) {
            throw throwGraphqlError("unauthenticated",401, languageError('unauthenticated', "غير مسجل"))
        }
        const project = await ProjectsModel.findById(_id)
        if(!project) {
            throw throwResolverError(404, "project not found")
        }

        return project
    }

    @Mutation(() => Project, {nullable: true})
    @UseMiddleware(authMiddelware, checkPermission("assign manager") ,errorHandler)
    async addManagerToProject(
        @Ctx() { res }: Context,
        @Arg("input") input: AddManagerToProjectInput,
    ): Promise<Project> {
        console.log("addManagerToProject resolver");
        const { username, projectName, role } = input
        const project = await ProjectsModel.findOne({projectName})
        if (!project) {
            throw throwResolverError(404, "project not found")
        }
        
        const user = await UserModel.findOne({username});
        if (!user) {
            throw throwResolverError(404, "user not found")
        }
        const existingMember = await MemberModel.findOne({
            _userId: user._id,
            _projectId: project._id,
        })

        if (existingMember) {
            throw throwResolverError(
                400,
                `User is already a member`,
            )
        }
        
        const newMember = new MemberModel({
            _userId: user._id,
            _projectId: project._id,
            role: role,
        });
        await newMember.save();
            
        return {
            _id: project._id,
            projectName: project.projectName,
            description: project.description,
            progress: project.progress,
            imageUrl: project.imageUrl,
            createdAt: new Date(project.createdAt),
            updatedAt: new Date(project.updatedAt),
        };

    }

    // seed permissions in db
    @Mutation(()=>String)
    async _test(
        @Ctx() { req, res }: Context,
    ): Promise<string> {
        console.log("_test resolver")
        await seedRolesPermissions()
        return ''
    }
}

export {ProjectsResolvers}

