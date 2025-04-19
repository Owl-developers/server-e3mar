import mongoose from "mongoose"

const {Schema, model} = mongoose
const types = Schema.Types

const rolesPermissionsSchema = new Schema({
    role_id: {
      type: types.ObjectId,
      ref: 'Roles', // Reference to Role model
      required: true
    },
    permissions_id: {
      type: types.ObjectId,
      ref: 'Permissions', // Reference to Permission model
      required: true
    }
  });
  
  const RolesPermissions = model('RolesPermissions', rolesPermissionsSchema);
  
  export default RolesPermissions;