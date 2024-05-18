import { useDispatch } from "react-redux";
import { openModal } from "../../design-system/components/ConfirmModal/ConfirmModal";
import {
  createUser,
  deleteUserById,
  getUser,
  updateUser,
} from "../slice/thunk";
import { closeEditUserModal } from "../slice/user-slice";
import Toast from "../../design-system/components/Toast/Toast";

export const useUsersActions = () => {
  const dispatch: any = useDispatch();

  const removeUser = (userId: string) => {
    openModal({
      text: `Are you sure you remove this user? `,
      onConfirm: () => {
        dispatch(deleteUserById(userId));
      },
    });
  };
  const addUser = (user: any, resetForm: any) => {
    dispatch(createUser(user)).then((resultAction: any) => {
      if (createUser.fulfilled.match(resultAction)) {
        Toast({
          status: "success",
          text: "User Account Added Successfully",
        });
        resetForm();
      } else if (createUser.rejected.match(resultAction)) {
        Toast({
          status: "error",
          text: resultAction.error.message,
        });
      }
    });
  };
  const editUser = (user: any, userId: any, resetForm: any) => {
    dispatch(updateUser({ user, userId })).then((resultAction: any) => {
      if (updateUser.fulfilled.match(resultAction)) {
        Toast({
          status: "success",
          text: "User Account Updated Successfully",
        });

        dispatch(closeEditUserModal());
        resetForm();
      } else if (updateUser.rejected.match(resultAction)) {
        Toast({
          status: "error",
          text: resultAction.error.message,
        });
      }
    });
  };
  const getUserInfo = (userId: string) => {
    dispatch(getUser(userId));
  };

  return { removeUser, addUser, editUser, getUserInfo };
};
