import mongoose from "mongoose"

const {Schema, model} = mongoose
const types = Schema.Types

const permissionSchema = new Schema({

  permissionName: {
    type: String,
    required: true,
    unique: true
  },
  description: {
    type: String,
    required: true,
    unique: true
  }
},{collection: "Permissions"});

const PermissionsModel = model('Permissions', permissionSchema);

export default PermissionsModel;