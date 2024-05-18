import { Box, Flex, Title } from "@mantine/core";

export default function NoPermission() {
  return (
    <>
      <Flex justify="center">
        <Box mt="xl">
          <Title order={4}>You don't access this page</Title>
        </Box>
      </Flex>
    </>
  );
}
