import {
  ActionIcon,
  Checkbox,
  Flex,
  Group,
  Loader,
  Modal,
  Paper,
  Title,
} from "@mantine/core";
import { useDispatch } from "react-redux";
import { usePrimaryColorHex } from "../../../design-system/hooks/use-primary-color";
import { IconX } from "@tabler/icons-react";

export default function ShowRole({
  role,
  opened,
  onClose,
}: {
  role?: any;
  opened: boolean;
  onClose: any;
}) {
  const dispatch = useDispatch();
  const color = usePrimaryColorHex();

  return (
    <>
      <Modal
        size="xl"
        opened={opened}
        withCloseButton={false}
        onClose={() => dispatch(onClose())}
      >
        {role ? (
          <>
            <Flex justify="end">
              <ActionIcon
                variant="light"
                color="red"
                size="sm"
                onClick={() => dispatch(onClose())}
              >
                <IconX />
              </ActionIcon>
            </Flex>
            {Object.entries(role).map(
              ([key, value]) =>
                (value as []).length > 0 && (
                  <Paper shadow="sm" radius="md" p="md" mb="xl" key={key}>
                    <Flex direction="column">
                      <Title c={color} order={4}>
                        {key
                          .replace(/([A-Z])/g, " $1")
                          .replace(/^./, function (str) {
                            return str.toUpperCase();
                          })}
                      </Title>
                      <Group mt="lg">
                        {(value as []).map((item: string, index) => (
                          <Checkbox
                            mx="lg"
                            key={index}
                            checked
                            onChange={() => {}}
                            value={item}
                            label={item
                              .split("/")
                              .pop()
                              ?.replace(/([A-Z])/g, " $1")
                              .replace(/^./, function (str) {
                                return str.toUpperCase();
                              })}
                          />
                        ))}
                      </Group>
                    </Flex>
                  </Paper>
                )
            )}
          </>
        ) : (
          <Flex justify="center" align="center" my="md">
            <Loader type="dots" />
          </Flex>
        )}
      </Modal>
    </>
  );
}
