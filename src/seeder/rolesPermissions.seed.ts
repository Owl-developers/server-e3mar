import RolesPermissionsSchema from '../RolesPermissions/models/RolesPermissions'

import {permissions,roles, rolesPermissoins} from '../types/roles.types'

export const seedRolesPermissions = async () => {
    await RolesPermissionsSchema.deleteMany({});
    for (const [roleName, permissions] of Object.entries(rolesPermissoins)) {
        for (const permissionName of permissions) {
            const description = `${roleName} => ${permissionName}`;
            await RolesPermissionsSchema.create({
                roleName,
                permissionName,
                description
            });
        }
    }
};