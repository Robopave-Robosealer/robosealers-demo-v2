import { ActionIcon, Paper } from "@mantine/core";
import "chart.js/auto";
import { Helmet } from "react-helmet";
import { Table } from "@mantine/core";
import { IconCheck, IconEye, IconX } from "@tabler/icons-react";
import { NavLink } from "react-router-dom";
import { usePrimaryColorHex } from "../../design-system/hooks/use-primary-color";
import MainTitle from "../../design-system/components/MainTitle";

export default function Overview() {
  const color = usePrimaryColorHex();
  const elements = [
    {
      id: 1,
      status: <IconX color="red" />,
      name: "Battery",
      route: "/monitoring/battery",
    },
    {
      id: 2,
      status: <IconCheck color={color} />,
      name: "Motor",
      route: "/monitoring/motor",
    },
  ];
  const rows = elements.map((element) => (
    <Table.Tr key={element.name} ta="center">
      <Table.Td>{element.id}</Table.Td>
      <Table.Td>{element.name}</Table.Td>
      <Table.Td>{element.status}</Table.Td>
      <Table.Td>
        <NavLink to={element.route}>
          <ActionIcon variant="light">
            <IconEye size="1.3rem" />
          </ActionIcon>
        </NavLink>
      </Table.Td>
    </Table.Tr>
  ));

  return (
    <>
      <Helmet>
        <title>Overview</title>
      </Helmet>
      <MainTitle title="Diagnostic Panel" />
      <Paper shadow="md" radius="md" p="md" mb="xl">
        <Table highlightOnHover>
          <Table.Thead>
            <Table.Tr>
              <Table.Th ta="center">Id</Table.Th>
              <Table.Th ta="center">Name</Table.Th>
              <Table.Th ta="center">Status</Table.Th>
              <Table.Th ta="center">View</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>{rows}</Table.Tbody>
        </Table>
      </Paper>
    </>
  );
}
