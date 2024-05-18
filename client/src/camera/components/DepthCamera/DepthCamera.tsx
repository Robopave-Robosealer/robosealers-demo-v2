import { Box, Flex, Paper, Title } from "@mantine/core";
import lastDepthCrackImg from "../../../../shared/images/lastDepthCrackImg.webp";
import { usePrimaryColorHex } from "../../../design-system/hooks/use-primary-color";
import useIsMobile from "../../../design-system/hooks/use-is-mobile";
import KeyValueCard from "../../../design-system/components/KeyValueCard";

export default function DepthCamera() {
  const color = usePrimaryColorHex();
  const mobile = useIsMobile();
  return (
    <>
      <Paper shadow="md" radius="md" p="md" my="xl">
        <Flex
          justify="space-between"
          direction={mobile ? "column" : "row"}
          gap="md"
        >
          <Flex direction="column" gap=".1rem" w={mobile ? "100%" : "69%"}>
            <Title order={4} mb="md" c="gray.6">
              Depth Camera
            </Title>
            <Box h="350px" bg={color}></Box>
          </Flex>
          <Flex w={mobile ? "100%" : "30%"} direction="column" gap=".1rem">
            <Title order={4} mb="md" c="gray.6">
              Last Image
            </Title>
            <Paper h="350px" withBorder ta="center">
              <img
                height="100%"
                width="100%"
                src={lastDepthCrackImg}
                alt="lastDepthCrackImg"
              />
            </Paper>
          </Flex>
        </Flex>
        <Flex
          justify="space-between"
          direction={mobile ? "column" : "row"}
          gap="md"
          my="lg"
        >
          <Flex w={mobile ? "100%" : "48%"}>
            <KeyValueCard label="Crack Volume" value="30 L" />
          </Flex>
          <Flex w={mobile ? "100%" : "48%"}>
            <KeyValueCard label="Shape" value="Curved" />
          </Flex>
        </Flex>
      </Paper>
    </>
  );
}
