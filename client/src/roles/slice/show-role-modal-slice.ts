import { createSlice } from "@reduxjs/toolkit";

export interface showRoleModal {
  showRole: boolean;
}

const initialState: showRoleModal = {
  showRole: false,
};

export const showRoleModalSlice = createSlice({
  name: "showRoleModal",
  initialState,
  reducers: {
    closeShowRoleModal: (state) => {
      state.showRole = false;
    },
    openShowRoleModal: (state) => {
      state.showRole = true;
    },
  },
});

// Action creators are generated for each case reducer function
export const { closeShowRoleModal, openShowRoleModal } =
  showRoleModalSlice.actions;

export default showRoleModalSlice.reducer;
