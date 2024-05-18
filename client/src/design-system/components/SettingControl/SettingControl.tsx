import React from "react";
// @ts-ignore
import ReactDynamicModal from "react-draggable-resizable-modal";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../store/store";
import { closeSettingModal } from "./slice/settingModalSlice";
import "./style.scss";
import { Box, Button } from "@mantine/core";
import { usePrimaryColorHex } from "../../hooks/use-primary-color";
import Control from "./Control";

const SettingControl: React.FC = () => {
  const dispatch = useDispatch();
  const opened = useSelector((state: RootState) => state.settingModal.status);
  const color = usePrimaryColorHex();

  return (
    <div className={opened ? "modal__wrapper" : ""}>
      <ReactDynamicModal
        initWidth={450}
        overlay={false}
        initHeight={400}
        onRequestClose={() => dispatch(closeSettingModal())}
        isOpen={opened}
        isCloseButton={false}
        disableResize={false}
        onSizeChange={true}
        minWidth={200}
        minHeight={200}
        data={<Control />}
        headerValue={<Box tt="capitalize">Setting</Box>}
        actions={
          <Button
            color="red"
            variant="outline"
            size="xs"
            onClick={() => dispatch(closeSettingModal())}
          >
            Close
          </Button>
        }
        style={{
          header: { color: "#fff", backgroundColor: color },
          actions: { textAlign: "right" },
        }}
      />
    </div>
  );
};

export default SettingControl;
