import { Flex, Text, Title } from "@mantine/core";

import LoginForm from "./LoginForm";
import useIsMobile from "../../design-system/hooks/use-is-mobile";
import { usePrimaryColorHex } from "../../design-system/hooks/use-primary-color";

export default function LoginHeader() {
  const color = usePrimaryColorHex();
  const mobile = useIsMobile();

  return (
    <>
      <Flex direction="column" w={mobile ? "100%" : "48%"}>
        <Title order={1} fz={mobile ? "3rem" : "4rem"} c="dark.7">
          Control your
        </Title>
        <Title fz={mobile ? "3rem" : "4rem"} order={1} c={color}>
          Robosealers
        </Title>
        <Text c="dark.7" fz={mobile ? "1.3rem" : "1.7rem"}>
          Monitoring the data and behaviors of your Robosealers.
        </Text>
        <LoginForm />
      </Flex>
    </>
  );
}
