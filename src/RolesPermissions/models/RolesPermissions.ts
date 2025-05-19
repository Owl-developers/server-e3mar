import mongoose from "mongoose"

const {Schema, model} = mongoose
const types = Schema.Types

const rolesPermissionsSchema = new Schema({
    roleName: {
      type: types.String,
      required: true
    },
    permissionName: {
      type: types.String,
      required: true
    },
    description: {
      type: types.String,
      required: true
    }
  }, {collection: "RolesPermissions"});
  
const RolesPermissions = model('RolesPermissions', rolesPermissionsSchema);
export default RolesPermissions;