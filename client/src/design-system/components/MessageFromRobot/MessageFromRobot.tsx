import { Alert, Button, Flex, Title } from "@mantine/core";
import { IconAlertCircle } from "@tabler/icons-react";
import { useState } from "react";

export default function MessageFromRobot() {
  const [showMessage, setShowMessage] = useState(true);
  return (
    <>
      {showMessage ? (
        ""
      ) : (
        <Alert
          title="Oops"
          mb="md"
          color="red"
          variant="light"
          icon={<IconAlertCircle />}
        >
          <Flex justify="space-between">
            <Title c="gray.7" order={4}>
              I crashed into the wall, save me.
            </Title>
            <Button
              variant="light"
              onClick={() => setShowMessage(true)}
              size="xs"
            >
              Ok
            </Button>
          </Flex>
        </Alert>
      )}
    </>
  );
}
