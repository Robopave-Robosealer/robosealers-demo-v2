import { createSlice } from "@reduxjs/toolkit";
import {
  createUser,
  deleteUserById,
  fetchUsersList,
  getUser,
  updateUser,
} from "./thunk";
import { UsersType } from "../types";

interface userState {
  users: UsersType[];
  loading: boolean;
  error: undefined | string;
  openEditModal: boolean;
  openViewModal: boolean;
  user: UsersType | undefined;
}

const initialState: userState = {
  users: [],
  loading: true,
  error: undefined,
  openEditModal: false,
  openViewModal: false,
  user: undefined,
};

const userSlice = createSlice({
  name: "userSlice",
  initialState,
  reducers: {
    closeEditUserModal: (state) => {
      state.openEditModal = false;
    },
    openEditUserModal: (state) => {
      state.openEditModal = true;
    },
    closeViewUserModal: (state) => {
      state.openViewModal = false;
    },
    openViewUserModal: (state) => {
      state.openViewModal = true;
    },
  },
  extraReducers: (builder) => {
    // fetch organization

    builder.addCase(fetchUsersList.pending, (state) => {
      state.loading = true;
      state.error = undefined;
    });
    builder.addCase(fetchUsersList.fulfilled, (state, action) => {
      state.users = action.payload;
      state.loading = false;
    });
    builder.addCase(fetchUsersList.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });

    // update organization

    builder.addCase(updateUser.pending, (state) => {
      // state.loading = true;
      state.error = undefined;
    });
    builder.addCase(updateUser.fulfilled, (state, action) => {
      state.loading = false;
      const updatedUser = action.payload;
      const index = state.users.findIndex(
        (user) => user._id === updatedUser._id
      );
      if (index !== -1) {
        state.users[index] = updatedUser;
      }
    });
    builder.addCase(updateUser.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });

    // get organization

    builder.addCase(getUser.pending, (state) => {
      state.loading = true;
      state.error = undefined;
      state.user = undefined;
    });
    builder.addCase(getUser.fulfilled, (state, action) => {
      state.user = action.payload;
      state.loading = false;
    });
    builder.addCase(getUser.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });

    // create organization

    builder.addCase(createUser.pending, (state) => {
      state.loading = true;

      state.error = undefined;
    });
    builder.addCase(createUser.fulfilled, (state, action) => {
      state.users.push(action.payload);
      state.loading = false;
    });
    builder.addCase(createUser.rejected, (state, action) => {
      state.loading = false;

      state.error = action.error.message;
    });

    // remove organization

    builder.addCase(deleteUserById.pending, (state) => {
      state.loading = true;
      state.error = undefined;
    });
    builder.addCase(deleteUserById.fulfilled, (state, action) => {
      state.users = action.payload;
      state.loading = false;
    });
    builder.addCase(deleteUserById.rejected, (state, action) => {
      state.loading = false;

      state.error = action.error.message;
    });
  },
});

export const {
  openEditUserModal,
  closeEditUserModal,
  closeViewUserModal,
  openViewUserModal,
} = userSlice.actions;

export default userSlice.reducer;
