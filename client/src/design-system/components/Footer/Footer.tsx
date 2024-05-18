import { Box, Flex, Title } from "@mantine/core";
import { usePrimaryColorHex } from "../../hooks/use-primary-color";
import { IconRobot } from "@tabler/icons-react";

export default function Footer() {
  const color = usePrimaryColorHex(6);
  return (
    <>
      <Box mt="auto" bg={color} py="sm">
        <Flex align="center" c="white" justify="center">
          <IconRobot />
          <Title order={4}>Robosealers</Title>
        </Flex>
      </Box>
    </>
  );
}
