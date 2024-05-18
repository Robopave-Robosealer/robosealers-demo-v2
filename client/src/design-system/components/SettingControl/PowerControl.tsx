import { Button, Flex, Switch, Text } from "@mantine/core";
import { IconRefresh, IconReload } from "@tabler/icons-react";
import { useState } from "react";
import { usePrimaryColorHex } from "../../hooks/use-primary-color";
import {
  handlePowerSwitch,
  handleRebootClick,
  handleRecoveryClick,
  handleSoftwareSwitch,
} from "./utils";

export default function PowerControl() {
  const [checkedPower, setCheckedPower] = useState(false);
  const [checkedSoftware, setCheckedSoftware] = useState(false);
  const color = usePrimaryColorHex(6);

  return (
    <Flex direction="column" gap="lg">
      <Flex justify="space-between" align="center">
        <Switch
          checked={checkedPower}
          onChange={(e) =>
            handlePowerSwitch(checkedPower, setCheckedPower, e.target.checked)
          }
          labelPosition="left"
          label={
            <Text c={color} fw="bold">
              Power
            </Text>
          }
          size="md"
          onLabel="Start"
          offLabel="Stop"
        />
        <Switch
          checked={checkedSoftware}
          onChange={(e) =>
            handleSoftwareSwitch(
              checkedSoftware,
              setCheckedSoftware,
              e.target.checked
            )
          }
          labelPosition="left"
          label={
            <Text c={color} fw="bold">
              Software
            </Text>
          }
          size="md"
          onLabel="Start"
          offLabel="Stop"
        />
      </Flex>
      <Flex align="center" gap="md">
        <Button
          w="fit-content"
          size="xs"
          disabled={checkedPower ? false : true}
          rightSection={<IconRefresh size="1rem" />}
          onClick={() => handleRebootClick()}
        >
          Reboot
        </Button>
        <Button
          w="fit-content"
          size="xs"
          disabled={checkedPower ? false : true}
          rightSection={<IconReload size="1rem" />}
          onClick={() => handleRecoveryClick()}
        >
          Recovery
        </Button>
      </Flex>
    </Flex>
  );
}
