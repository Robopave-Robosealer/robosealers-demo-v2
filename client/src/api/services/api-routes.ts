enum ApiRoutes {
  // user api
  listUserOperations = "user/operations/list",
  listUserAreasOperations = "user/operations/listAreas",

  // admin api
  login = "admin/login",
  listRoles = "admin/roles/list",
  createRoles = "admin/roles/create",
  removeRoles = "admin/roles/remove",
  getRoles = "admin/roles/get",
  updateRoles = "admin/roles/update",
  listAdminPermissions = "admin/permissions/admin/list",
  listUserPermissions = "admin/permissions/user/list",
  listAdminOperations = "admin/operations/list",
  listAdminAreasOperations = "admin/operations/listAreas",
  listAdmins = "admin/list",
  createAdmin = "admin/create",
  removeAdmin = "admin/remove",
  getAdmin = "admin/get",
  updateAdmin = "admin/update",
  updateAdminRole = "/admin/role",
  listOrgs = "admin/orgs/list",
  createOrg = "admin/orgs/create",
  removeOrg = "admin/orgs/remove",
  getOrg = "admin/orgs/get",
  updateOrg = "admin/orgs/update",
  listUsers = "/admin/users/list",
  createUser = "admin/users/create",
  removeUser = "admin/users/remove",
  getUser = "admin/users/get",
  updateUser = "admin/users/update",
  listRobots = "/admin/robots/list",
  createRobot = "admin/robots/create",
  removeRobot = "admin/robots/remove",
  getRobot = "admin/robots/get",
  updateRobot = "admin/robots/update",
}
export default ApiRoutes;