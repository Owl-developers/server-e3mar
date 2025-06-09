import {ArgsType, Field, ID, InputType, ObjectType, Resolver} from "type-graphql"
import mongoose from "mongoose";
import { Length, Max, Min, IsEnum } from "class-validator";


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
    @Field(()=> Date,{nullable: true})
    createdAt?: Date
    @Field(()=> Date,{nullable: true})
    updatedAt?: Date
}

@ObjectType()
class Sub {
    @Field(()=> String)
    message: string
    @Field(()=> Project)
    data: Project
}

@ObjectType()
class UserProjects {
    @Field(()=> ID)
    _id!: mongoose.Types.ObjectId
    @Field(()=> ID)
    _userId!: mongoose.Types.ObjectId
    @Field(()=> Project)
    _projectId: Project
    @Field(()=> String)
    role: string
    
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
    @Min(0, {message: '0'})
    @Max(100, {message: '100'})
    progress?: number
}

@InputType()
class AddManagerToProjectInput {
    @Field(() => String)
    username: string;
    
    @Field(() => String)
    @Length(5,15)
    projectName: string;

    @Field(() => String)
    @IsEnum(['manager'], { message: "Invalid specified" })
    role: string;
}

export {
    Project,
    UserProjects,
    CreateProjectArgs,
    AddManagerToProjectInput,
    Sub
}