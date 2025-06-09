import {
    Resolver, 
    UseMiddleware, Subscription, Root,
    ID,

} from "type-graphql"


import {Sub} from "../../types/project.types"

import { Context } from "../../../Users/types/user.types"

import { errorValidationHandler } from "../../../helper/validationError"

function wait(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
interface test {
    _id: typeof ID
}

@UseMiddleware(errorValidationHandler)
@Resolver()
class ProjectsUserResolvers {
    @Subscription(()=> Sub,{
        nullable: true,
        topics: ({args, context})=> {
            const {req, res} = context as Context
            const token = req.cookies.token
            console.log("context",res.locals.token._id)
            console.log("topics",token)

            return res.locals.token._id
        },
    })
    addManagerToProject(
        @Root()root,
    ): any {
        console.log('_addMemberToProject sub')
        console.log({root})
        return root
    }

}

export {ProjectsUserResolvers}

