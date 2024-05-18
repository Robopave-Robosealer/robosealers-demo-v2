import { useEffect, useState } from "react";
import {
  Button,
  Flex,
  Loader,
  Paper,
  Select,
  Table,
  Title,
} from "@mantine/core";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../store/store";
import { fetchRolesList, selectRolesList } from "../../slice/rolesListSlice";
import { useRoleActions } from "../../hook/use-roles-actions";
import { GetService } from "../../../api/services/requests-service";
import ApiRoutes from "../../../api/services/api-routes";
import ShowRole from "./ShowRole";
import {
  closeShowRoleModal,
  openShowRoleModal,
} from "../../slice/show-role-modal-slice";
import { RoleType } from "../../types";
import EditRole from "./EditRole";
import { openEditRoleModal } from "../../slice/edit-role-modal-slice";
import TableActions from "../../../design-system/components/TableActions";

export default function RolesList() {
  const dispatch: any = useDispatch();
  const roles = useSelector(selectRolesList);
  const loading = useSelector((state: RootState) => state.rolesList.loading);
  const { removeRole } = useRoleActions();
  const userRole = useSelector((state: RootState) => state.auth.role);
  const [role, setRole] = useState<RoleType>();
  const [typeValue, setTypeValue] = useState<any>("");
  const userPermissions = useSelector(
    (state: RootState) => state.auth.permissions
  );
  const opened = useSelector(
    (state: RootState) => state.showRoleModal.showRole
  );
  const editRoleOpened = useSelector(
    (state: RootState) => state.editRoleModal.editRole
  );

  useEffect(() => {
    dispatch(fetchRolesList());
  }, [dispatch]);

  const getRole = (roleId: string) => {
    setRole(undefined);
    GetService({
      route: ApiRoutes.getRoles,
      params: {
        _id: roleId,
      },
    }).then((res) => {
      setRole(res.data.result);
    });
  };

  const onDelete = (id: string) => {
    removeRole(id);
  };
  const onView = (id: string) => {
    getRole(id);
    dispatch(openShowRoleModal());
  };
  const onEdit = (id: string) => {
    getRole(id);
    dispatch(openEditRoleModal());
  };

  const rows = roles?.map((role) => (
    <Table.Tr key={role._id} ta="center">
      <Table.Td>{role.name}</Table.Td>
      <Table.Td>{role.type}</Table.Td>
      <Table.Td ta="center">
        <TableActions
          edit={
            userPermissions.includes("/admin/roles/update") ||
            userRole === "superAdmin"
          }
          view={
            userPermissions.includes("/admin/roles/get") ||
            userRole === "superAdmin"
          }
          delete={
            userPermissions.includes("/admin/roles/remove") ||
            userRole === "superAdmin"
          }
          onDelete={() => onDelete(role._id)}
          onEdit={() => onEdit(role._id)}
          onView={() => onView(role._id)}
        />
      </Table.Td>
    </Table.Tr>
  ));
  const handleFilterType = () => {
    dispatch(fetchRolesList(typeValue));
  };
  return (
    <>
      {loading ? (
        <Flex justify="center" my="md">
          <Loader type="dots" />
        </Flex>
      ) : (
        <>
          <Flex align="center" gap="md" mb="xl">
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
          </Flex>
          <Paper shadow="md" radius="md" p="md" mb="xl">
            {roles?.length === 0 ? (
              <Title c="gray.7" ta="center" order={4}>
                No Roles Found
              </Title>
            ) : (
              <Table highlightOnHover>
                <Table.Thead>
                  <Table.Tr>
                    <Table.Th ta="center">Role Name</Table.Th>
                    <Table.Th ta="center">Role Type</Table.Th>
                    <Table.Th ta="center">Action</Table.Th>
                  </Table.Tr>
                </Table.Thead>
                <Table.Tbody>{rows}</Table.Tbody>
              </Table>
            )}
          </Paper>
        </>
      )}

      {opened && (
        <ShowRole
          opened={opened}
          onClose={closeShowRoleModal}
          role={role?.permissions}
        />
      )}
      {editRoleOpened && role && <EditRole role={role} />}
    </>
  );
}
