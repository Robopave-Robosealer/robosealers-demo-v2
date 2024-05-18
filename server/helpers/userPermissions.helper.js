let userEndPoints = [
    "/user/users/get", "/user/users/update", "/user/users/remove",
    "/user/users/password"
]

let orgEndPoints = [
    "/user/orgs/get"
]

let robotEndPoints = [
    "/user/robots/get", "/user/robots/list"
]

let recordEndPoints = [
    "/admin/records/list", "/admin/records/get"
]

let operationEndPoints = [
    "/user/operations/list", "/user/operations/get",
    "/user/operations/create", "/user/operations/listArea",
    "/user/operations/images"
]



userEndPoints = new Set(userEndPoints);
orgEndPoints = new Set(orgEndPoints);
recordEndPoints = new Set(recordEndPoints);
robotEndPoints = new Set(robotEndPoints);
operationEndPoints = new Set(operationEndPoints);



let userPermissions = new Map();



userPermissions.set("users", userEndPoints)
userPermissions.set("orgs", orgEndPoints)
userPermissions.set("records", recordEndPoints)
userPermissions.set("robots", robotEndPoints)
userPermissions.set("operations", operationEndPoints)

module.exports = { userPermissions }