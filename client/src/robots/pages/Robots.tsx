import { Helmet } from "react-helmet";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import { Tabs } from "@mantine/core";
import RobotsList from "../components/RobotsList";
import AddRobot from "../components/AddRobot";

export default function Robots() {
  const userPermissions = useSelector(
    (state: RootState) => state.auth.permissions
  );
  const userRole = useSelector((state: RootState) => state.auth.role);
  const accessToAddRobot =
    userPermissions.includes("/admin/robots/create") ||
    userRole === "superAdmin";

  return (
    <>
      <Helmet>
        <title>Robots</title>
      </Helmet>

      <Tabs defaultValue="robots">
        <Tabs.List grow mb="md">
          <Tabs.Tab value="robots">Robots</Tabs.Tab>
          {accessToAddRobot && <Tabs.Tab value="addRobot">Add Robots</Tabs.Tab>}
        </Tabs.List>

        <Tabs.Panel value="robots">
          <RobotsList />
        </Tabs.Panel>

        <Tabs.Panel value="addRobot">
          <AddRobot />
        </Tabs.Panel>
      </Tabs>
    </>
  );
}
