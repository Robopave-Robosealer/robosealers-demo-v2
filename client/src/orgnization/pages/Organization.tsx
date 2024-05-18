import { Helmet } from "react-helmet";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import { Tabs } from "@mantine/core";
import OrgsList from "../components/OrgsList";
import AddOrg from "../components/AddOrg";

export default function Organization() {
  const userPermissions = useSelector(
    (state: RootState) => state.auth.permissions
  );
  const userRole = useSelector((state: RootState) => state.auth.role);
  const accessToAddOrg =
    userPermissions.includes("/admin/orgs/create") || userRole === "superAdmin";
  return (
    <>
      <Helmet>
        <title>Organization</title>
      </Helmet>

      <Tabs defaultValue="orgs">
        <Tabs.List grow mb="md">
          <Tabs.Tab value="orgs">Organization</Tabs.Tab>
          {accessToAddOrg && (
            <Tabs.Tab value="addOrg">Add Organization</Tabs.Tab>
          )}
        </Tabs.List>

        <Tabs.Panel value="orgs">
          <OrgsList />
        </Tabs.Panel>

        <Tabs.Panel value="addOrg">
          <AddOrg />
        </Tabs.Panel>
      </Tabs>
    </>
  );
}
