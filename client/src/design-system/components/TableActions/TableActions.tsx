import { ActionIcon, Flex } from "@mantine/core";
import { IconEdit, IconEye, IconTrash } from "@tabler/icons-react";
import React from "react";

export type TableActionsProps = {
  edit?: boolean;
  view?: boolean;
  delete?: boolean;
  onDelete?: any;
  onEdit?: any;
  onView?: any;
};

const TableActions: React.FC<TableActionsProps> = ({
  onDelete,
  onEdit,
  onView,
  delete: deleteAction,
  view,
  edit,
}) => {
  return (
    <>
      <Flex align="center" gap="md" justify="center">
        {view && (
          <ActionIcon
            color="green"
            variant="light"
            onClick={() => {
              onView();
            }}
          >
            <IconEye size="1rem" />
          </ActionIcon>
        )}
        {edit && (
          <ActionIcon
            variant="light"
            onClick={() => {
              onEdit();
            }}
          >
            <IconEdit size="1rem" />
          </ActionIcon>
        )}
        {deleteAction && (
          <ActionIcon color="red" variant="light" onClick={() => onDelete()}>
            <IconTrash size="1rem" />
          </ActionIcon>
        )}
      </Flex>
    </>
  );
};

export default TableActions;
