import { createSlice } from "@reduxjs/toolkit";

export interface EditRoleModal {
  editRole: boolean;
}

const initialState: EditRoleModal = {
  editRole: false,
};

export const editRoleModalSlice = createSlice({
  name: "editRoleModal",
  initialState,
  reducers: {
    closeEditRoleModal: (state) => {
      state.editRole = false;
    },
    openEditRoleModal: (state) => {
      state.editRole = true;
    },
  },
});

// Action creators are generated for each case reducer function
export const { openEditRoleModal, closeEditRoleModal } =
  editRoleModalSlice.actions;

export default editRoleModalSlice.reducer;
