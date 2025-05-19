import {ArgsType, Field, ID, InputType, ObjectType, Resolver} from "type-graphql"
import mongoose from "mongoose";
import { Length, Max, Min } from "class-validator";


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
}

export {
    Project,
    CreateProjectArgs, 
}