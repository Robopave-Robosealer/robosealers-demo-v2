import { Tabs } from "@mantine/core";
import { Helmet } from "react-helmet";
import RolesList from "../components/RolesList";
import AddAdminRoles from "../components/AddAdminRoles";
import AddUserRoles from "../components/AddUserRoles";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/store";

export default function Roles() {
  const userPermissions = useSelector(
    (state: RootState) => state.auth.permissions
  );
  const userRole = useSelector((state: RootState) => state.auth.role);
  const accessToAddRolesAdmin =
    userPermissions.includes("/admin/roles/create") ||
    userRole === "superAdmin";

  const accessToAddUser =
    userPermissions.includes("/user/users/create") || userRole === "superAdmin";

  return (
    <>
      <Helmet>
        <title>Roles</title>
      </Helmet>
      <Tabs defaultValue="roles">
        <Tabs.List grow mb="md">
          <Tabs.Tab value="roles">Roles</Tabs.Tab>
          {accessToAddRolesAdmin && (
            <Tabs.Tab value="adminRoles">Add Admin Roles</Tabs.Tab>
          )}
          {accessToAddUser && (
            <Tabs.Tab value="userRoles">Add User Roles</Tabs.Tab>
          )}
        </Tabs.List>

        <Tabs.Panel value="roles">
          <RolesList />
        </Tabs.Panel>

        <Tabs.Panel value="adminRoles">
          <AddAdminRoles />
        </Tabs.Panel>

        <Tabs.Panel value="userRoles">
          <AddUserRoles />
        </Tabs.Panel>
      </Tabs>
    </>
  );
}
