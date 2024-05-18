import { Tabs } from "@mantine/core";
import PowerControl from "./PowerControl";
import MotorsControl from "./MotorsControl";
import Light_Blower_Control from "./Light_Blower_Control";

export default function Control() {
  return (
    <>
      <Tabs defaultValue="Power">
        <Tabs.List grow mb="lg">
          <Tabs.Tab value="Power">Power</Tabs.Tab>
          <Tabs.Tab value="Motors">Motors</Tabs.Tab>
          <Tabs.Tab value="Light&Blower">Light & Blower</Tabs.Tab>
        </Tabs.List>

        <Tabs.Panel value="Power">
          <PowerControl />
        </Tabs.Panel>

        <Tabs.Panel value="Motors">
          <MotorsControl />
        </Tabs.Panel>

        <Tabs.Panel value="Light&Blower">
          <Light_Blower_Control />
        </Tabs.Panel>
      </Tabs>
    </>
  );
}
