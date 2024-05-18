import { Box, Flex, Paper } from "@mantine/core";

export type KeyValueCardProps = {
  label: string;
  value: React.ReactNode;
};
export default function KeyValueCard({ label, value }: KeyValueCardProps) {
  return (
    <>
      <Flex w="100%">
        <Paper bg="gray.2" withBorder radius={0} w="50%" p="xs">
          {label}
        </Paper>
        <Paper w="50%" withBorder radius={0} p="xs">
          <Box>{value}</Box>
        </Paper>
      </Flex>
    </>
  );
}
