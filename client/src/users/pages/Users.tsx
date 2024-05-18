import { Helmet } from "react-helmet";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import { Tabs } from "@mantine/core";
import UsersList from "../components/UsersList";
import AddUser from "../components/AddUser";

export default function Users() {
  const userPermissions = useSelector(
    (state: RootState) => state.auth.permissions
  );
  const userRole = useSelector((state: RootState) => state.auth.role);
  const accessToAddUser =
    userPermissions.includes("/admin/users/create") ||
    userRole === "superAdmin";
  return (
    <>
      <Helmet>
        <title>Users</title>
      </Helmet>

      <Tabs defaultValue="users">
        <Tabs.List grow mb="md">
          <Tabs.Tab value="users">Users</Tabs.Tab>
          {accessToAddUser && <Tabs.Tab value="addUser">Add User</Tabs.Tab>}
        </Tabs.List>

        <Tabs.Panel value="users">
          <UsersList />
        </Tabs.Panel>

        <Tabs.Panel value="addUser">
          <AddUser />
        </Tabs.Panel>
      </Tabs>
    </>
  );
}
