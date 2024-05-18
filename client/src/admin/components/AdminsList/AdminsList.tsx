import { useEffect, useState } from "react";
import { Flex, Loader, Paper, Table, Title } from "@mantine/core";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../store/store";
import { fetchAdminsList, selectAdminsList } from "../../slice/adminsListSlice";
import { useAdminsActions } from "../../hook/use-admins-actions";
import EditAdminModal from "./EditAdminModal";
import { openEditAdminModal } from "../../slice/edit-admin-modal-slice";
import { GetService } from "../../../api/services/requests-service";
import ApiRoutes from "../../../api/services/api-routes";
import TableActions from "../../../design-system/components/TableActions";

export default function AdminsList() {
  const dispatch: any = useDispatch();
  const admins = useSelector(selectAdminsList);
  const userRole = useSelector((state: RootState) => state.auth.role);
  const [admin, setAdmin] = useState<any>();
  const userPermissions = useSelector(
    (state: RootState) => state.auth.permissions
  );
  const loading = useSelector((state: RootState) => state.adminList.loading);
  const { removeAdmin } = useAdminsActions();

  const openedEditAdminModal = useSelector(
    (state: RootState) => state.editAdminModal.editAdmin
  );

  const getAdmin = (adminId: string) => {
    setAdmin(undefined);
    GetService({
      route: ApiRoutes.getAdmin,
      params: {
        _id: adminId,
      },
    }).then((res) => {
      setAdmin(res.data.result);
    });
  };

  useEffect(() => {
    dispatch(fetchAdminsList());
  }, [dispatch]);

  const onDelete = (id: string) => {
    removeAdmin(id);
  };

  const onEdit = (id: string) => {
    getAdmin(id);
    dispatch(openEditAdminModal());
  };

  const rows = admins.admins?.map((admin) => (
    <Table.Tr key={admin._id} ta="center">
      <Table.Td>{admin.name}</Table.Td>
      <Table.Td>{admin.role}</Table.Td>
      <Table.Td>
        {" "}
        {admin.role === "superAdmin" ? "full access" : admin.permission?.name}
      </Table.Td>
      <Table.Td ta="center">
        <Flex align="center" gap="md" justify="center">
          {admin.role === "superAdmin" ? (
            ""
          ) : (
            <>
              <TableActions
                edit={
                  userPermissions.includes("/admin/update") ||
                  userRole === "superAdmin"
                }
                delete={
                  userPermissions.includes("/admin/remove") ||
                  userRole === "superAdmin"
                }
                onDelete={() => onDelete(admin._id)}
                onEdit={() => onEdit(admin._id)}
              />
            </>
          )}
        </Flex>
      </Table.Td>
    </Table.Tr>
  ));
  return (
    <>
      {loading ? (
        <Flex justify="center" my="md">
          <Loader type="dots" />
        </Flex>
      ) : (
        <>
          {" "}
          <Paper shadow="md" radius="md" p="md" mb="xl">
            {admins.admins.length === 0 ? (
              <Title c="gray.7" ta="center" order={4}>
                No Admins Found
              </Title>
            ) : (
              <Table highlightOnHover>
                <Table.Thead>
                  <Table.Tr>
                    <Table.Th ta="center">Admin Name</Table.Th>
                    <Table.Th ta="center">Admin Role</Table.Th>
                    <Table.Th ta="center">Admin Permission</Table.Th>
                    <Table.Th ta="center">Action</Table.Th>
                  </Table.Tr>
                </Table.Thead>
                <Table.Tbody>{rows}</Table.Tbody>
              </Table>
            )}
          </Paper>
          {/* <PaginationList count={admins.count} /> */}
        </>
      )}
      {openedEditAdminModal && <EditAdminModal admin={admin} />}
    </>
  );
}
