import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../store/store";
import { ActionIcon, Flex, Loader, Modal, Paper, Title } from "@mantine/core";
import { closeViewOrgModal } from "../../slice/org-slice";
import KeyValueCard from "../../../design-system/components/KeyValueCard";
import { IconX } from "@tabler/icons-react";
import { usePrimaryColorHex } from "../../../design-system/hooks/use-primary-color";

export default function ViewOrg() {
  const dispatch: any = useDispatch();
  const { openViewModal, org, loading } = useSelector(
    (state: RootState) => state.orgsList
  );
  const color = usePrimaryColorHex();

  return (
    <>
      <Modal
        size="xl"
        withCloseButton={false}
        opened={openViewModal}
        onClose={() => dispatch(closeViewOrgModal())}
      >
        {loading ? (
          <Flex justify="center" align="center" my="md">
            <Loader type="dots" />
          </Flex>
        ) : (
          <>
            <Flex justify="end">
              <ActionIcon
                variant="light"
                color="red"
                size="sm"
                onClick={() => dispatch(closeViewOrgModal())}
              >
                <IconX />
              </ActionIcon>
            </Flex>
            <Flex direction="column" gap="md">
              <Flex direction="column" gap="md">
                <Title order={4} c={color}>
                  Organization
                </Title>
                <KeyValueCard label="Name" value={org?.name} />
                <KeyValueCard label="Email" value={org?.email} />
              </Flex>
              {org.users && org.users.length > 0 && (
                <Paper shadow="md" radius="md" p="md">
                  <Flex direction="column" gap="md">
                    <Title order={4} c={color}>
                      Users
                    </Title>
                    {org.users.map((user: any) => {
                      return (
                        <Paper key={user._id} withBorder radius="md" p="md">
                          <Flex direction="column" gap="md">
                            <KeyValueCard label="Name" value={user?.name} />
                            <KeyValueCard label="Email" value={user?.email} />
                          </Flex>
                        </Paper>
                      );
                    })}
                  </Flex>
                </Paper>
              )}
              {org.robots && org.robots.length > 0 && (
                <Paper shadow="md" radius="md" p="md">
                  <Flex direction="column" gap="md">
                    <Title order={4} c={color}>
                      Robots
                    </Title>
                    {org.robots.map((robot: any) => {
                      return (
                        <Paper key={robot._id} withBorder radius="md" p="md">
                          <Flex direction="column" gap="md">
                            <KeyValueCard label="Name" value={robot?.name} />
                          </Flex>
                        </Paper>
                      );
                    })}
                  </Flex>
                </Paper>
              )}
            </Flex>
          </>
        )}
      </Modal>
    </>
  );
}
