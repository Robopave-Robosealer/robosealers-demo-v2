import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../store/store";
import { useEffect } from "react";
import { fetchRobotsList } from "../../slice/thunk";
import { Flex, Loader, Paper, Table, Title } from "@mantine/core";
import TableActions from "../../../design-system/components/TableActions";
import { useRobotsActions } from "../../hook/use-robots-actions";
import { openEditRobotModal } from "../../slice/robot-slice";
import EditRobot from "../EditRobot";

export default function RobotsList() {
  const { robots, loading, openEditModal } = useSelector(
    (state: RootState) => state.robotReducers
  );
  const dispatch: any = useDispatch();
  const userPermissions = useSelector(
    (state: RootState) => state.auth.permissions
  );
  const userRole = useSelector((state: RootState) => state.auth.role);
  const { removeRobot, getRobotInfo } = useRobotsActions();

  const rows = robots?.map((robot) => (
    <Table.Tr key={robot._id} ta="center">
      <Table.Td>{robot.name}</Table.Td>
      <Table.Td>{robot.org?.name}</Table.Td>
      <Table.Td>
        {robot.users && robot.users.length > 0 ? robot.users.length : 0} Users
      </Table.Td>

      <Table.Td ta="center">
        <TableActions
          edit={
            userPermissions.includes("/admin/robots/update") ||
            userRole === "superAdmin"
          }
          delete={
            userPermissions.includes("/admin/robots/remove") ||
            userRole === "superAdmin"
          }
          // view={
          //   userPermissions.includes("/admin/robots/get") ||
          //   userRole === "superAdmin"
          // }
          onDelete={() => removeRobot(robot._id)}
          onEdit={() => {
            getRobotInfo(robot._id);
            dispatch(openEditRobotModal());
          }}
          // onView={() => {
          //   getRobotInfo(robot._id);
          //   dispatch(openViewRobotModal());
          // }}
        />
      </Table.Td>
    </Table.Tr>
  ));

  useEffect(() => {
    dispatch(fetchRobotsList());
  }, [dispatch]);

  return (
    <>
      {loading ? (
        <Flex justify="center" my="md">
          <Loader type="dots" />
        </Flex>
      ) : (
        <>
          {/* <Flex align="center" gap="md" mb="xl">
            <Select
              clearable
              label="Role Type"
              placeholder="Pick Type"
              data={["All", "admin", "user"]}
              value={typeValue}
              onChange={setTypeValue}
            />
            <Button mt="1.5rem" size="sm" onClick={handleFilterType}>
              Filter
            </Button>
          </Flex> */}
          <Paper shadow="md" radius="md" p="md" mb="xl">
            {robots?.length === 0 ? (
              <Title c="gray.7" ta="center" order={4}>
                No robots Found
              </Title>
            ) : (
              <Table highlightOnHover>
                <Table.Thead>
                  <Table.Tr>
                    <Table.Th ta="center">Robot Name</Table.Th>
                    <Table.Th ta="center">Organization</Table.Th>
                    <Table.Th ta="center">Users</Table.Th>

                    <Table.Th ta="center">Action</Table.Th>
                  </Table.Tr>
                </Table.Thead>
                <Table.Tbody>{rows}</Table.Tbody>
              </Table>
            )}
          </Paper>
        </>
      )}
      {openEditModal && <EditRobot />}
      {/* {openViewModal && (
        <ShowRole
          opened={openViewModal}
          onClose={closeViewRobotModal}
          role={user?.permission?.permissions}
        />
      )} */}
    </>
  );
}
