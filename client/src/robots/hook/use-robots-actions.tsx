import { useDispatch } from "react-redux";
import { openModal } from "../../design-system/components/ConfirmModal/ConfirmModal";
import {
  createRobot,
  deleteRobotById,
  getRobot,
  updateRobot,
} from "../slice/thunk";
import { closeEditRobotModal } from "../slice/robot-slice";
import Toast from "../../design-system/components/Toast/Toast";

export const useRobotsActions = () => {
  const dispatch: any = useDispatch();

  const removeRobot = (robotId: string) => {
    openModal({
      text: `Are you sure you remove this robot? `,
      onConfirm: () => {
        dispatch(deleteRobotById(robotId));
      },
    });
  };
  const addRobot = (robot: any, resetForm: any) => {
    dispatch(createRobot(robot)).then((resultAction: any) => {
      if (createRobot.fulfilled.match(resultAction)) {
        Toast({
          status: "success",
          text: "Robot Added Successfully",
        });

        resetForm();
      } else if (createRobot.rejected.match(resultAction)) {
        Toast({
          status: "error",
          text: resultAction.error.message,
        });
      }
    });
  };
  const editRobot = (robot: any, robotId: any, resetForm: any) => {
    dispatch(updateRobot({ robot, robotId })).then((resultAction: any) => {
      if (updateRobot.fulfilled.match(resultAction)) {
        Toast({
          status: "success",
          text: "Robot Updated Successfully",
        });
        dispatch(closeEditRobotModal());
        resetForm();
      } else if (updateRobot.rejected.match(resultAction)) {
        Toast({
          status: "error",
          text: resultAction.error.message,
        });
      }
    });
  };
  const getRobotInfo = (robotId: string) => {
    dispatch(getRobot(robotId));
  };

  return { removeRobot, addRobot, editRobot, getRobotInfo };
};
