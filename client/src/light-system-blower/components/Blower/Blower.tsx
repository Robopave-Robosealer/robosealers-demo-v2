import { Flex, Paper, Text, Title } from "@mantine/core";
import { IconPointFilled } from "@tabler/icons-react";
import useIsMobile from "../../../design-system/hooks/use-is-mobile";
import KeyValueCard from "../../../design-system/components/KeyValueCard";

export default function Blower() {
  const mobile = useIsMobile();
  return (
    <>
      <Paper shadow="md" radius="md" p="md" mb="xl">
        <Title order={4} c="gray.7">
          Blower
        </Title>
        <Flex
          justify="space-between"
          direction={mobile ? "column" : "row"}
          gap="md"
          my="lg"
        >
          <Flex w={mobile ? "100%" : "48%"}>
            <KeyValueCard
              label="Blower Status"
              value={
                <>
                  <Flex c="green">
                    <IconPointFilled />
                    <Text>ON</Text>
                  </Flex>
                </>
              }
            />
          </Flex>
          <Flex w={mobile ? "100%" : "48%"}>
            <KeyValueCard label="Blower Current" value="20 A" />
          </Flex>
        </Flex>
      </Paper>
    </>
  );
}
