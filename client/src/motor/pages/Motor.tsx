import { Flex, Paper } from "@mantine/core";
import DynamicRobotSpeedChart from "../components/DynamicMotorSpeedChart";
import { Helmet } from "react-helmet";
import useIsMobile from "../../design-system/hooks/use-is-mobile";
import MainTitle from "../../design-system/components/MainTitle";
import KeyValueCard from "../../design-system/components/KeyValueCard";

export default function Motor() {
  const mobile = useIsMobile();

  return (
    <>
      <Helmet>
        <title>Motor</title>
      </Helmet>
      <MainTitle title="Motor" />
      <Paper shadow="md" radius="md" p="md" mb="xl">
        <Flex
          justify="space-between"
          direction={mobile ? "column" : "row"}
          gap="md"
          my="lg"
        >
          <Flex w={mobile ? "100%" : "48%"}>
            <KeyValueCard label="Voltage" value="16 V" />
          </Flex>
          <Flex w={mobile ? "100%" : "48%"}>
            <KeyValueCard label="Current" value="50 A" />
          </Flex>
        </Flex>
        <Flex justify="center" align="center" mt="3rem">
          <DynamicRobotSpeedChart />
        </Flex>
      </Paper>
    </>
  );
}
