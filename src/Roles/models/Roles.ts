import mongoose from 'mongoose'

const {Schema, model} = mongoose
const types = Schema.Types
const rolesSchema = new Schema({
    roleName: {type: types.String, unique:true, required: true},
})

const rolesModel = model("Roles", rolesSchema)
export default rolesModel