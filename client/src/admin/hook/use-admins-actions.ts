import { useDispatch } from "react-redux";
import { deleteAdminById } from "../slice/adminsListSlice";
import { openModal } from "../../design-system/components/ConfirmModal/ConfirmModal";

export const useAdminsActions = () => {
  const dispatch: any = useDispatch();

  const removeAdmin = (roleId: string) => {
    openModal({
      text: "Are you sure to remove this admin?",
      onConfirm: () => {
        dispatch(deleteAdminById(roleId));
      },
    });
  };
  return { removeAdmin };
};
