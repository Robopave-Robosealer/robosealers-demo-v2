import { Paper, Table, Title } from "@mantine/core";
import { RobotData } from "../../design-system/types/operationList";

export default function DistanceTable({
  elements,
}: {
  elements?: RobotData[];
}) {
  const rows = elements?.map((element) => (
    <Table.Tr key={element._id} ta="center">
      <Table.Td>
        {new Date(element.startDate).toLocaleString().slice(0, 9)}
      </Table.Td>
      <Table.Td>
        {new Date(element.startDate).toLocaleString().slice(10)}
      </Table.Td>
      <Table.Td>
        {new Date(element.endDate).toLocaleString().slice(0, 9)}
      </Table.Td>
      <Table.Td>
        {new Date(element.endDate).toLocaleString().slice(10)}
      </Table.Td>
      <Table.Td>{element.area}</Table.Td>
      <Table.Td>{element.distance} Km</Table.Td>
    </Table.Tr>
  ));
  return (
    <>
      <Paper shadow="md" radius="md" p="md" mb="xl">
        {elements?.length === 0 ? (
          <Title c="gray.7" ta="center" order={4}>
            No Data Found
          </Title>
        ) : (
          <Table highlightOnHover verticalSpacing="md">
            <Table.Thead>
              <Table.Tr>
                <Table.Th ta="center">Start Date</Table.Th>
                <Table.Th ta="center">Start Time</Table.Th>
                <Table.Th ta="center">End Date</Table.Th>
                <Table.Th ta="center">End Time</Table.Th>
                <Table.Th ta="center">Area</Table.Th>
                <Table.Th ta="center">Distance</Table.Th>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>{rows}</Table.Tbody>
          </Table>
        )}
      </Paper>
    </>
  );
}
