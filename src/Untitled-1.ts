// simulate database digram

const user = {
    username: {type: "string"}
}

// members table
const members = {
    _userId: {type: "objectId", ref: "user"},
    _projectId: {type: "objectId", ref: "projects"},
    role: {type: "string"}
}

//projects table
const projects = {
    projectName : {type: "string"},
    description: {type: "string"},
    members: [{type: "objectId", ref: typeof members}]
}

const rolesPermissions = [
    {
        role: {type:'enum[manager | worker | owner]'},
        permission: {type: "enum[read | write | delete | update]"}
    }
]

const user_example = [
    {
        username: 'alex'
    }
]

const member_example = [
    {
        _userId: 'alex_Id',
        _project_Id: "building num 1_id",
        role: "manager"
    }
]

const project_example = [
    {
        projectName: "building num 1",
        description: "any desc"
    }
]

// return list of projects
const get_user_projects = [
    
]
