import mongoose from 'mongoose'
import { User } from '../types/user.types'

export interface IUser extends Document {
    username: string
    password: string
    phone: string
    email: string
    imageUrl: string
    isSuperAdmin: boolean
}

const {Schema, SchemaType, model, Document} = mongoose
const types = Schema.Types
const userSchema = new Schema<IUser>({
    username: {type: types.String, unique:true, required: true, index: true},
    password: {type: types.String, unique:false, required: true},
    phone: {type: types.String, unique:false, required: true},
    email: {type: types.String, unique:false, required: true, index: true},
    imageUrl: {type: types.String, unique:false, required: false, default: ""},
    isSuperAdmin: {type: types.Boolean, unique:false, required: false, default: false},

    // role_id: {type: types.ObjectId, unique:false,required: true, ref: "Roles"},
}, {collection: "Users"})
// userSchema.index({email:1, username:1})
const userModel = model("Users", userSchema)
export default userModel