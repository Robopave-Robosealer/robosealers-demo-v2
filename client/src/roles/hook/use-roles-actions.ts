import { useDispatch } from "react-redux";
import { deleteRoleById } from "../slice/rolesListSlice";
import { openModal } from "../../design-system/components/ConfirmModal/ConfirmModal";

export const useRoleActions = () => {
  const dispatch: any = useDispatch();

  const removeRole = (roleId: string) => {
    openModal({
      text: `Are you sure you remove this role? `,
      onConfirm: () => {
        dispatch(deleteRoleById(roleId));
      },
    });
  };
  return { removeRole };
};
