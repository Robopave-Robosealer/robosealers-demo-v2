import { Flex, RingProgress, Text, Title } from "@mantine/core";
import useIsMobile from "../../../design-system/hooks/use-is-mobile";

export default function DynamicSealantVolChart() {
  const volume = 80;
  const mobile = useIsMobile();

  return (
    <>
      <Flex direction="column" align="center" w={mobile ? "100%" : "33%"}>
        <Title order={5} c="gray.7">
          Sealant Volume
        </Title>

        <RingProgress
          size={160}
          thickness={7}
          sections={[
            {
              value: volume,
              color:
                volume < 100 && volume > 70
                  ? "green"
                  : volume < 70 && volume > 35
                  ? "yellow"
                  : "red",
              tooltip: `${volume} L`,
            },
          ]}
          label={
            <Text
              c={
                volume < 100 && volume > 70
                  ? "green"
                  : volume < 70 && volume > 35
                  ? "yellow"
                  : "red"
              }
              fw={700}
              ta="center"
              size="xl"
            >
              {volume} L
            </Text>
          }
        />
      </Flex>
    </>
  );
}
