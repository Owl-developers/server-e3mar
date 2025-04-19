import mongoose from 'mongoose'

const {Schema, SchemaType, model, Document} = mongoose
const types = Schema.Types
const userSchema = new Schema({
    username: {type: types.String, unique:true, required: true},
    password: {type: types.String, unique:true, required: true},
    phone: {type: types.String, unique:true, required: true},
    email: {type: types.String, unique:true, required: true},
    imageUrl: {type: types.String, unique:true, required: false, default: ""},
    role_id: {type: types.ObjectId, unique:true,required: true},
}, {collection: "Users"})
const userModel = model("Users", userSchema)
export default userModel