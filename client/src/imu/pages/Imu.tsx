import { Flex, Paper } from "@mantine/core";
import DynamicAccelerationChart from "../components/DynamicAccelerationChart";
import DynamicOrientationChart from "../components/DynamicOrientationChart";
import { Helmet } from "react-helmet";
import useIsMobile from "../../design-system/hooks/use-is-mobile";
import MainTitle from "../../design-system/components/MainTitle";

export default function Imu() {
  const mobile = useIsMobile();

  return (
    <>
      <Helmet>
        <title>IMU</title>
      </Helmet>
      <MainTitle title="IMU" />
      <Paper shadow="md" radius="md" p="md" mb="xl">
        <Flex
          justify="space-between"
          direction={mobile ? "column" : "row"}
          gap="2.5rem"
          mb="2.5rem"
        >
          <DynamicAccelerationChart />
          <DynamicOrientationChart />
        </Flex>
      </Paper>
    </>
  );
}
