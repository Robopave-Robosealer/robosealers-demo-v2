import { Flex, Paper, Text, Title } from "@mantine/core";
import { IconPointFilled } from "@tabler/icons-react";
import useIsMobile from "../../../design-system/hooks/use-is-mobile";
import KeyValueCard from "../../../design-system/components/KeyValueCard";

export default function LightSystem() {
  const mobile = useIsMobile();

  return (
    <>
      <Paper shadow="md" radius="md" p="md" mb="xl">
        <Title order={4} c="gray.7">
          Light System
        </Title>
        <Flex
          justify="space-between"
          direction={mobile ? "column" : "row"}
          gap="md"
          my="lg"
        >
          <Flex w={mobile ? "100%" : "48%"}>
            <KeyValueCard
              label="Light System Status"
              value={
                <>
                  <Flex c="red">
                    <IconPointFilled />
                    <Text>OFF</Text>
                  </Flex>
                </>
              }
            />
          </Flex>
        </Flex>
      </Paper>
    </>
  );
}
