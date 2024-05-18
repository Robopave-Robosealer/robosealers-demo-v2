import { Flex } from "@mantine/core";
import BatteryChart from "../components/BatteryChart";
import AreaChart from "../components/AreaChart";
import AccuracyChart from "../components/AccuracyChart";
import { Helmet } from "react-helmet";

export default function Chart_Graphs() {
  return (
    <>
      <Helmet>
        <title>Chart & Graphs</title>
      </Helmet>
      <Flex direction="column" gap="lg">
        <BatteryChart />
        <AreaChart />
        <AccuracyChart />
      </Flex>
    </>
  );
}
