import { Flex, Switch, Text } from "@mantine/core";
import { usePrimaryColorHex } from "../../hooks/use-primary-color";
import { useState } from "react";
import { handleBlowerSwitch, handleLightSystemSwitch } from "./utils";

export default function Light_Blower_Control() {
  const color = usePrimaryColorHex(6);
  const [checkedLightSystem, setCheckedLightSystem] = useState(false);
  const [checkedBlowerSystem, setCheckedBlowerSystem] = useState(false);
  return (
    <>
      <Flex direction="column" gap="md">
        <Switch
          checked={checkedLightSystem}
          onChange={(e) =>
            handleLightSystemSwitch(
              checkedLightSystem,
              setCheckedLightSystem,
              e.target.checked
            )
          }
          labelPosition="left"
          label={
            <Text c={color} fw="bold">
              Light System
            </Text>
          }
          size="md"
          onLabel="ON"
          offLabel="OFF"
        />
        <Switch
          checked={checkedBlowerSystem}
          onChange={(e) =>
            handleBlowerSwitch(
              checkedBlowerSystem,
              setCheckedBlowerSystem,
              e.target.checked
            )
          }
          labelPosition="left"
          label={
            <Text c={color} fw="bold">
              Blower System
            </Text>
          }
          size="md"
          onLabel="Start"
          offLabel="Stop"
        />
      </Flex>
    </>
  );
}
