import { createSlice } from "@reduxjs/toolkit";

export interface EditAdminModal {
  editAdmin: boolean;
}

const initialState: EditAdminModal = {
  editAdmin: false,
};

export const editAdminModalSlice = createSlice({
  name: "editAdminModal",
  initialState,
  reducers: {
    closeEditAdminModal: (state) => {
      state.editAdmin = false;
    },
    openEditAdminModal: (state) => {
      state.editAdmin = true;
    },
  },
});

// Action creators are generated for each case reducer function
export const { openEditAdminModal, closeEditAdminModal } =
  editAdminModalSlice.actions;

export default editAdminModalSlice.reducer;
