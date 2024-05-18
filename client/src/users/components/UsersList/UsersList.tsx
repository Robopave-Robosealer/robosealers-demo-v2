import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../store/store";
import { useEffect } from "react";
import { fetchUsersList } from "../../slice/thunk";
import { Flex, Loader, Paper, Table, Title } from "@mantine/core";
import TableActions from "../../../design-system/components/TableActions";
import { useUsersActions } from "../../hook/use-users-actions";
import {
  closeViewUserModal,
  openEditUserModal,
  openViewUserModal,
} from "../../slice/user-slice";
import EditUser from "../EditUser";
import ShowRole from "../../../roles/components/RolesList/ShowRole";

export default function OrgsList() {
  const { users, user, loading, openEditModal, openViewModal } = useSelector(
    (state: RootState) => state.userReducers
  );
  const dispatch: any = useDispatch();
  const userPermissions = useSelector(
    (state: RootState) => state.auth.permissions
  );
  const userRole = useSelector((state: RootState) => state.auth.role);
  const { removeUser, getUserInfo } = useUsersActions();

  const rows = users?.map((user) => (
    <Table.Tr key={user._id} ta="center">
      <Table.Td>{user.name}</Table.Td>
      <Table.Td>{user.email}</Table.Td>
      <Table.Td>{user.org?.name}</Table.Td>
      {/* <Table.Td>
        {org.users && org.users.length > 0 ? org.users.length : 0} Users
      </Table.Td>
      <Table.Td>
        {org.robots && org.robots.length > 0 ? org.robots.length : 0} Robots
      </Table.Td> */}
      <Table.Td ta="center">
        <TableActions
          edit={
            userPermissions.includes("/admin/users/update") ||
            userRole === "superAdmin"
          }
          delete={
            userPermissions.includes("/admin/users/remove") ||
            userRole === "superAdmin"
          }
          view={
            userPermissions.includes("/admin/users/get") ||
            userRole === "superAdmin"
          }
          onDelete={() => removeUser(user._id)}
          onEdit={() => {
            getUserInfo(user._id);
            dispatch(openEditUserModal());
          }}
          onView={() => {
            getUserInfo(user._id);
            dispatch(openViewUserModal());
          }}
        />
      </Table.Td>
    </Table.Tr>
  ));

  useEffect(() => {
    dispatch(fetchUsersList());
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
            {users?.length === 0 ? (
              <Title c="gray.7" ta="center" order={4}>
                No Users Found
              </Title>
            ) : (
              <Table highlightOnHover>
                <Table.Thead>
                  <Table.Tr>
                    <Table.Th ta="center">User Name</Table.Th>
                    <Table.Th ta="center">Email</Table.Th>
                    <Table.Th ta="center">Organization</Table.Th>
                    {/* <Table.Th ta="center">Organization Users</Table.Th>
                    <Table.Th ta="center">Organization Robots</Table.Th> */}
                    <Table.Th ta="center">Action</Table.Th>
                  </Table.Tr>
                </Table.Thead>
                <Table.Tbody>{rows}</Table.Tbody>
              </Table>
            )}
          </Paper>
        </>
      )}
      {openEditModal && <EditUser />}
      {openViewModal && (
        <ShowRole
          opened={openViewModal}
          onClose={closeViewUserModal}
          role={user?.permission?.permissions}
        />
      )}
    </>
  );
}
