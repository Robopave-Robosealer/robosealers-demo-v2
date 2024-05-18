import { openModal } from "../../ConfirmModal/ConfirmModal";

// handlePowerSwitch
export const handlePowerSwitch = (status: any, setStatus: any, e: any) => {
  openModal({
    text: status ? "Are you sure to stop Power" : "Are you sure to start Power",
    onConfirm: () => {
      setStatus(e);
    },
  });
};

//  handleSoftwareSwitch
export const handleSoftwareSwitch = (status: any, setStatus: any, e: any) => {
  openModal({
    text: status
      ? "Are you sure to stop Software"
      : "Are you sure to start Software",
    onConfirm: () => {
      setStatus(e);
    },
  });
};

// handleRebootClick
export const handleRebootClick = () => {
  openModal({
    text: "Are you sure to Reboot",
    onConfirm: () => {},
  });
};

// handleRecoveryClick
export const handleRecoveryClick = () => {
  openModal({
    text: "Are you sure to Recovery",
    onConfirm: () => {},
  });
};

//  handleLightSystemSwitch
export const handleLightSystemSwitch = (
  status: any,
  setStatus: any,
  e: any
) => {
  openModal({
    text: status
      ? "Are you sure to off Light System"
      : "Are you sure to on Light System",
    onConfirm: () => {
      setStatus(e);
    },
  });
};

//  handleBlowerSwitch
export const handleBlowerSwitch = (status: any, setStatus: any, e: any) => {
  openModal({
    text: status
      ? "Are you sure to stop Blower System"
      : "Are you sure to start Blower System",
    onConfirm: () => {
      setStatus(e);
    },
  });
};
