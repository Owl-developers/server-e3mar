import {Resolver, Query, ObjectType, Field, Arg, InputType, ArgsType, Args,ArgOptions, ID, Int, Mutation, Ctx, Authorized, UseMiddleware } from "type-graphql"
import mongoose from 'mongoose'
import express, {json, Request, Response } from 'express';
import {Length,IsEmail, IsPhoneNumber } from "class-validator"


@ObjectType()
export class User {
    @Field(()=> ID)
    _id!: mongoose.Types.ObjectId
    @Field(()=> String)
    username!: string
    @Field(()=> String,{nullable: true})
    phone?: string
    @Field(()=> String,{nullable: true})
    email?: string
    @Field(()=> String,{nullable: true})
    imageUrl?: string | null
    @Field(()=> Boolean)
    isSuperAdmin?: boolean
}

@ArgsType()
export class Testt {
    @Field()
    tt: string
}

@InputType()
export class LoginInput {
    @Field(()=>String)
    @Length(3,15)
    username!: string
    @Field(()=>String)
    @Length(8,20)
    password!: string
    @Field(()=>String)
    @IsEmail()
    email!: string
}
@InputType()
export class RegisterInput {
    @Field(()=>String)
    @Length(3,15)
    username!: string
    @Field(()=>String)
    @Length(8,20)
    password!: string
    @Field(()=>String)
    @IsPhoneNumber("SY")
    phone!: string
    @Field(()=>String)
    @IsEmail()
    email!: string
    @Field(()=> String,{nullable: true})
    imageUrl?: string | null

}

export interface Context {
    req: Request
    res: Response
}