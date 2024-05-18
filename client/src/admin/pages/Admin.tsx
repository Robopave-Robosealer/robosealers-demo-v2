import { Tabs } from "@mantine/core";
import { Helmet } from "react-helmet";
import AdminsList from "../components/AdminsList/AdminsList";
import AddAdminAccount from "../components/AddAdminAccount";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/store";

export default function Admin() {
  const userPermissions = useSelector(
    (state: RootState) => state.auth.permissions
  );
  const userRole = useSelector((state: RootState) => state.auth.role);

  const accessToAddAdmin =
    userPermissions.includes("/admin/create") || userRole === "superAdmin";
  return (
    <>
      <Helmet>
        <title>Admin</title>
      </Helmet>
      <Tabs defaultValue="admins">
        <Tabs.List grow mb="md">
          <Tabs.Tab value="admins">Admins</Tabs.Tab>
          {accessToAddAdmin && (
            <Tabs.Tab value="addAdmin">Add Admin Account</Tabs.Tab>
          )}
        </Tabs.List>

        <Tabs.Panel value="admins">
          <AdminsList />
        </Tabs.Panel>

        <Tabs.Panel value="addAdmin">
          <AddAdminAccount />
        </Tabs.Panel>
      </Tabs>
    </>
  );
}
