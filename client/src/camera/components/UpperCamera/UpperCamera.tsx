import { Box, Flex, Paper, Title } from "@mantine/core";
import lastUpperCrackImg from "../../../../shared/images/lastUpperCrackImg.jpg";
import useIsMobile from "../../../design-system/hooks/use-is-mobile";
import { usePrimaryColorHex } from "../../../design-system/hooks/use-primary-color";

export default function UpperCamera() {
  const color = usePrimaryColorHex();
  const mobile = useIsMobile();
  return (
    <>
      <Paper shadow="md" radius="md" p="md" mb="xl">
        <Flex
          justify="space-between"
          direction={mobile ? "column" : "row"}
          gap="md"
        >
          <Flex direction="column" gap=".1rem" w={mobile ? "100%" : "69%"}>
            <Title order={4} mb="md" c="gray.6">
              Upper Camera
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
                src={lastUpperCrackImg}
                alt="lastUpperCrackImg"
              />
            </Paper>
          </Flex>
        </Flex>
      </Paper>
    </>
  );
}
