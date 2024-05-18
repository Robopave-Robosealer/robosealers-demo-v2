import { Flex, Title } from "@mantine/core";
import BatteryGauge from "react-battery-gauge";
import useIsMobile from "../../design-system/hooks/use-is-mobile";
export default function DynamicBatteryChart() {
  const mobile = useIsMobile();

  return (
    <>
      <Flex direction="column" align="center" w={mobile ? "100%" : "33%"}>
        <Title mb="xs" c="gray.7" order={4}>
          Battery Percentage
        </Title>
        <BatteryGauge
          value={30}
          size={150}
          orientation="horizontal"
          customization={{
            batteryBody: {
              strokeColor: "#333",
              strokeWidth: 1,
              cornerRadius: 2,
            },
            batteryCap: {
              strokeColor: "#333",
              cornerRadius: 1,
              strokeWidth: 1,
              capToBodyRatio: 0.3,
            },
          }}
        >
          <defs>
            <filter id="shadow">
              <feDropShadow dx="0.2" dy="0.4" stdDeviation="0.2" />
            </filter>
          </defs>
        </BatteryGauge>
      </Flex>
    </>
  );
}
