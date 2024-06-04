import { Helmet } from "react-helmet";
import MainTitle from "../../design-system/components/MainTitle";
import { Flex, Paper, Text } from "@mantine/core";
import useIsMobile from "../../design-system/hooks/use-is-mobile";
import KeyValueCard from "../../design-system/components/KeyValueCard";
import { IconPointFilled } from "@tabler/icons-react";
import DynamicBatteryChart from "../components/DynamicBatteryChart";

export default function Battery() {
  const mobile = useIsMobile();
  const battery = [
    {
      label: "Battery Status",
      value: (
        <Flex c="green">
          <IconPointFilled />
          <Text>ON</Text>
        </Flex>
      ),
    },
    {
      label: "Battery Current",
      value: "30 A",
    },
    {
      label: "Battery Health",
      value: "Good",
    },
    {
      label: "Battery Technology",
      value: "Robot",
    },
    {
      label: "Battery Voltage",
      value: "22 V",
    },
    {
      label: "Battery Temperature",
      value: "77 Celsius",
    },
    {
      label: "Battery Charge",
      value: "Full",
    },
    {
      label: "Design Capacity",
      value: "60 Byte ",
    },
  ];

  return (
    <>
      <Helmet>
        <title>Battery</title>
      </Helmet>
      <MainTitle title="Battery" />
      <Paper shadow="md" radius="md" p="md" mb="xl">
        <Flex
          justify="space-between"
          direction={mobile ? "column" : "row"}
          gap="md"
          my="lg"
          wrap="wrap"
        >
          {battery.map((item: any) => {
            return (
              <Flex key={item.label} w={mobile ? "100%" : "48%"}>
                <KeyValueCard label={item.label} value={item.value} />
              </Flex>
            );
          })}
        </Flex>
        <Flex justify="center" align="center" mt="2rem">
          <DynamicBatteryChart />
        </Flex>
      </Paper>
    </>
  );
}
