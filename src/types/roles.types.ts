import rolesPermissionsSchema from '../RolesPermissions/models/RolesPermissions'

const roles = {
    superAdmin: 'super admin',
    Manager : 'manager',
    engineer : 'engineer',
    worker : 'worker',
    owner : 'owner'
}

const permissions= {
    CreateProject: "create project",
    ViewProjects: "view project/s",
    EditProject: "edit project",
    DeleteProject: "delete project",
    CreateDailyReport: "create daily report",
    ViewDailyReports: "view daily report/s",
    EditDailyReport: "edit daily report",
    DeleteDailyReport: "delete daily report",
    CreateTask: "create task",
    ViewTasks: "view task/s",
    EditTask: "edit task",
    DeleteTask: "delete task",
    AssignUser: "assign user",
    UnassignUser: "unassign user",

}
const rolesPermissoins = {
    superAdmin: [
        "create project",
        "view project",
        "edit project", 
        "delete project",
        "view daily report/s",
        "view task/s",
        "assign user",
        "unassign user"
    ],
    manager: [
        "view project",
        "edit project",
        "delete project",
        "create daily report",
        "view daily report/s",
        "edit daily report",
        "delete daily report",
        "create task",
        "view task/s",
        "edit task",
        "delete task",
        "assign user",
        "unassign user"
    ],
    engineer: [
        "view project",
        "create daily report",
        "view daily report/s",
        "edit daily report",
        "delete daily report",
        "create task",
        "view task/s",
        "edit task",
        "delete task"
    ],
    worker: [
        "view project",
        "view daily report/s",
        "view task/s"
    ],
    owner: [
        "view project",
        "view daily report/s",
        "view task/s"
    ]
}


export {roles, permissions, rolesPermissoins}