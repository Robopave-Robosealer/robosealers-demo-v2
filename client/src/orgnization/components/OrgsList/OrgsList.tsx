import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../store/store";
import { useEffect } from "react";
import { fetchOrgsList } from "../../slice/thunk";
import { Flex, Loader, Paper, Table, Title } from "@mantine/core";
import TableActions from "../../../design-system/components/TableActions";
import { useOrgsActions } from "../../hook/use-orgs-actions";
import EditOrg from "../EditOrg";
import { openEditOrgModal, openViewOrgModal } from "../../slice/org-slice";
import ViewOrg from "../ViewOrg";

export default function OrgsList() {
  const { orgs, loading, openEditModal, openViewModal } = useSelector(
    (state: RootState) => state.orgsList
  );
  const dispatch: any = useDispatch();
  const userPermissions = useSelector(
    (state: RootState) => state.auth.permissions
  );
  const userRole = useSelector((state: RootState) => state.auth.role);
  const { removeOrg, getOrganization } = useOrgsActions();

  const rows = orgs?.map((org) => (
    <Table.Tr key={org._id} ta="center">
      <Table.Td>{org.name}</Table.Td>
      <Table.Td>{org.email}</Table.Td>
      <Table.Td>
        {org.users && org.users.length > 0 ? org.users.length : 0} Users
      </Table.Td>
      <Table.Td>
        {org.robots && org.robots.length > 0 ? org.robots.length : 0} Robots
      </Table.Td>
      <Table.Td ta="center">
        <TableActions
          edit={
            userPermissions.includes("/admin/orgs/update") ||
            userRole === "superAdmin"
          }
          view={
            userPermissions.includes("/admin/orgs/get") ||
            userRole === "superAdmin"
          }
          delete={
            userPermissions.includes("/admin/orgs/remove") ||
            userRole === "superAdmin"
          }
          onDelete={() => removeOrg(org._id && org._id)}
          onEdit={() => {
            getOrganization(org._id);
            dispatch(openEditOrgModal());
          }}
          onView={() => {
            getOrganization(org._id);
            dispatch(openViewOrgModal());
          }}
        />
      </Table.Td>
    </Table.Tr>
  ));

  useEffect(() => {
    dispatch(fetchOrgsList());
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
            {orgs?.length === 0 ? (
              <Title c="gray.7" ta="center" order={4}>
                No Organizations Found
              </Title>
            ) : (
              <Table highlightOnHover>
                <Table.Thead>
                  <Table.Tr>
                    <Table.Th ta="center">Organization Name</Table.Th>
                    <Table.Th ta="center">Organization Email</Table.Th>
                    <Table.Th ta="center">Organization Users</Table.Th>
                    <Table.Th ta="center">Organization Robots</Table.Th>
                    <Table.Th ta="center">Action</Table.Th>
                  </Table.Tr>
                </Table.Thead>
                <Table.Tbody>{rows}</Table.Tbody>
              </Table>
            )}
          </Paper>
        </>
      )}
      {openEditModal && <EditOrg />}
      {openViewModal && <ViewOrg />}
    </>
  );
}
