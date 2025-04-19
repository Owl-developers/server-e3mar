import mongoose from "mongoose"

const {Schema, model} = mongoose
const types = Schema.Types

const permissionSchema = new Schema({

  permissionName: {
    type: String,
    required: true,
    unique: true
  }
});

const Permission = model('Permission', permissionSchema);

export default Permission;