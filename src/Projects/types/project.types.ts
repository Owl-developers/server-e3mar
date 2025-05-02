import {ArgsType, Field, ID, InputType, ObjectType, Resolver} from "type-graphql"
import ProjectsModel, {ProjectsSchema} from "../models/Projects";
import mongoose from "mongoose";
import { Length, Max, Min } from "class-validator";

@ObjectType()
class userId {
    @Field(()=> String, {nullable: true})
    username: string
    @Field(()=> ID, {nullable: true})
    _id!: mongoose.Types.ObjectId
}

@ObjectType()
class Project {
    @Field(()=> ID)
    _id!: mongoose.Types.ObjectId
    @Field(()=> String)
    projectName: string
    @Field(()=> String, {nullable: true})
    description?: string
    @Field(()=> Number, {nullable: true})
    progress?: number
    @Field(()=> String, {nullable: true})
    imageUrl?: string
    @Field(()=> userId)
    createdBy_id?: userId
    @Field(()=> userId, {nullable: true})
    projectManager_id?: userId
    @Field(()=> [userId],{nullable: true})
    engineers_id?: Array<userId>
    @Field(()=> [userId],{nullable: true})
    workers_id?: Array<userId>
    @Field(()=> userId,{nullable: true})
    owner_id?: userId
}

@InputType()
class CreateProjectArgs {
    @Field(()=> String)
    @Length(5,15)
    projectName: string
    @Field(()=> String, {nullable: true})
    @Length(5,50)
    description?: string
    @Field(()=> Number, {nullable: true})
    @Min(0)
    @Max(100)
    progress?: number
    @Field(()=> String, {nullable: true})
    imageUrl?: string
    @Field(()=> String)
    @Length(3,15)
    projectManager?: string

}

export {
    Project,
    CreateProjectArgs
}