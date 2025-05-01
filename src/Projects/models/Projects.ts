import mongoose from 'mongoose'
const {Schema, SchemaType, model, Document} = mongoose
const types = Schema.Types
export const ProjectsSchema = new Schema({
    projectName: {type: types.String, unique:true, required: true},
    description: {type: types.String, unique:false, required: false},
    progress: {type: types.Number, unique:false, required: false},
    imageUrl: {type: types.String, unique:true, required: false, default: ""},
    createdBy_id: {type: types.ObjectId, unique:true,required: true, ref: "Users", index: true},
    projectManager_id: {type: types.ObjectId, unique:false,required: false, ref:"Users", index: true},
    engineers_id: [{type: types.ObjectId, unique:false,required: false, ref:"Users", index: true}],
    workers_id: [{type: types.ObjectId, unique:false,required: false, ref:"Users", index: true}],
    owner_id: {type: types.ObjectId, unique:false,required: false, ref:"Users", index: true},
}, {collection: "Projects"})
const ProjectsModel = model("Projects", ProjectsSchema)
export default ProjectsModel

// projectName String NN
// description String NN
// progress Number NN
// imgUrl String NN
// createdBy_id ObjectId NN
// projectManager_id ObjectId NN
// engineers_id [ ] ObjectId NN
// workers_id [ ] ObjectId NN
// owner_id