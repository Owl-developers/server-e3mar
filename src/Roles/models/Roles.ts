import mongoose from 'mongoose'

const {Schema, model} = mongoose
const types = Schema.Types
const rolesSchema = new Schema({
    roleName: {type: types.String, unique:true, required: true},
},{collection: "Roles"})

const RolesModel = model("Roles", rolesSchema)
export default RolesModel