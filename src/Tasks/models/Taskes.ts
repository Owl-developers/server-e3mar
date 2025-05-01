import mongoose from 'mongoose'

const {Schema, SchemaType, model, Document} = mongoose
const types = Schema.Types
const taskesSchema = new Schema({
    status: {type: types.Boolean, unique:false, required: true},
    assignee_id: {type: types.ObjectId, unique:true, required: true},
    assigner_id: {type: types.ObjectId, unique:true, required: true},
    notes: {type: types.String, unique:false, required: true},
    dueDate: {type: types.Date, unique:false, required: true},
}, {collection: "Taskes"})
const taskesModel = model("Taskes", taskesSchema)
export default taskesModel