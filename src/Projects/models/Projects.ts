import mongoose from 'mongoose'
import { Project } from '../types/project.types'
const {Schema, SchemaType, model, Document} = mongoose
const types = Schema.Types



export const ProjectsSchema = new Schema<Project>({
    projectName: {type: types.String, unique:true, required: true, index: true},
    description: {type: types.String, unique:false, required: false, default: ""},
    progress: {type: types.Number, unique:false, required: false, default: 0},
    imageUrl: {type: types.String, unique:false, required: false, default: ""},
}, {collection: "Projects", timestamps: true})
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
