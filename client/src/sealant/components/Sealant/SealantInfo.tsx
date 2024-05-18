import { Flex, Paper, Title } from "@mantine/core";
import DynamicSealantTempChart from "./DynamicSealantTempChart";
import DynamicSealantChart from "./DynamicSealantVolChart";
import useIsMobile from "../../../design-system/hooks/use-is-mobile";

export default function SealantInfo() {
  const mobile = useIsMobile();

  return (
    <>
      <Paper shadow="md" radius="md" p="md" mb="xl">
        <Title order={4} c="gray.7">
          Sealant
        </Title>
        <Flex
          justify="space-between"
          direction={mobile ? "column" : "row"}
          gap="2.5rem"
          m="1rem 2rem 2rem 2rem"
        >
          <DynamicSealantTempChart />
          <DynamicSealantChart />
        </Flex>
      </Paper>
    </>
  );
}
