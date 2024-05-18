import { Text } from "@mantine/core";
import { modals } from "@mantine/modals";

type OpenModalProps = {
  text?: React.ReactNode;
  // onCancel: () => void;
  onConfirm: () => void;
};

export const openModal = ({ text, onConfirm }: OpenModalProps) =>
  modals.openConfirmModal({
    centered: true,
    title: (
      <Text fz="1.3rem" fw="bolder" c="gray.7">
        Please confirm your action
      </Text>
    ),
    children: text,
    labels: { confirm: "Confirm", cancel: "Cancel" },
    // onCancel: () => onCancel(),
    onConfirm: () => onConfirm(),
  });
