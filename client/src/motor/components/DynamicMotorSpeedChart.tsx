import { Flex, RingProgress, Text, Title } from "@mantine/core";

export default function DynamicMotorSpeedChart() {
  const volume = 60;
  return (
    <>
      <Flex direction="column">
        <Title ta="center" order={4} c="gray.7">
          Motor Speed
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
              tooltip: `${volume} M/H`,
            },
          ]}
          label={
            <Text
              ta="center"
              c={
                volume < 100 && volume > 70
                  ? "green"
                  : volume < 70 && volume > 35
                  ? "yellow"
                  : "red"
              }
              fw={700}
              size="xl"
            >
              {volume} M/H
            </Text>
          }
        />
      </Flex>
    </>
  );
}
