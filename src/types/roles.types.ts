// import rolesPermissionsSchema from '../RolesPermissions/models/RolesPermissions'

const roles = {
    superAdmin: 'super admin',
    Manager : 'manager',
    engineer : 'engineer',
    worker : 'worker',
    owner : 'owner'
}

const permissions= {
    // projects
    viewAllProjects: "view all projects",
    CreateProject: "create project",
    EditProject: "edit project",
    DeleteProject: "delete project",
    // daily report
    viewAllDailyReports: "view all daily reports",
    CreateDailyReport: "create daily report",
    EditDailyReport: "edit daily report",
    DeleteDailyReport: "delete daily report",
    // tasks
    viewAllTasks: "view all tasks",
    CreateTask: "create task",
    ViewTasks: "view tasks",
    ViewTask: "view task",
    EditTask: "edit task",
    DeleteTask: "delete task",
    // assign
    AssignUser: "assign user",
    UnassignUser: "unassign user",

}

const rolesPermissions = {
    superAdmin: [
        // project
        "view all projects",
        "create project",
        "edit project",
        "delete project",
        // daily report
        "view all daily reports",
        // tasks
        "view all tasks",
        // assign
        "assign user",
        "unassign user"
    ],
    manager: [
        // project
        "edit project",
        "delete project",
        "create daily report",
        // daily report
        "edit daily report",
        "delete daily report",
        // tasks
        "create task",
        "edit task",
        "delete task",
        // assign user
        "assign user",
        "UnassignUser"
    ],
    engineer: [

        "create daily report",
        "edit daily report",
        "delete daily report",

        "create task",
        "edit task",
        "delete task",
    ],
}


export {roles, permissions, rolesPermissions}