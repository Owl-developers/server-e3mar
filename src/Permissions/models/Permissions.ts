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
  },
  tag: {
    type: String,
    required: true,
    index: true
  }


},{collection: "Permissions", strict: false});

const PermissionsModel = model('Permissions', permissionSchema);

export default PermissionsModel;