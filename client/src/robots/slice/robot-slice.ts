import { createSlice } from "@reduxjs/toolkit";
import {
  createRobot,
  deleteRobotById,
  fetchRobotsList,
  getRobot,
  updateRobot,
} from "./thunk";
import { RobotType } from "../types";

interface RobotState {
  robots: RobotType[];
  loading: boolean;
  error: undefined | string;
  openEditModal: boolean;
  openViewModal: boolean;
  robot: RobotType | undefined;
}

const initialState: RobotState = {
  robots: [],
  loading: true,
  error: undefined,
  openEditModal: false,
  openViewModal: false,
  robot: undefined,
};

const robotSlice = createSlice({
  name: "robotSlice",
  initialState,
  reducers: {
    closeEditRobotModal: (state) => {
      state.openEditModal = false;
    },
    openEditRobotModal: (state) => {
      state.openEditModal = true;
    },
    closeViewRobotModal: (state) => {
      state.openViewModal = false;
    },
    openViewRobotModal: (state) => {
      state.openViewModal = true;
    },
  },
  extraReducers: (builder) => {
    // fetch organization

    builder.addCase(fetchRobotsList.pending, (state) => {
      state.loading = true;
      state.error = undefined;
    });
    builder.addCase(fetchRobotsList.fulfilled, (state, action) => {
      state.robots = action.payload;
      state.loading = false;
    });
    builder.addCase(fetchRobotsList.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });

    // update organization

    builder.addCase(updateRobot.pending, (state) => {
      // state.loading = true;
      state.error = undefined;
    });
    builder.addCase(updateRobot.fulfilled, (state, action) => {
      state.loading = false;
      const updatedUser = action.payload;
      const index = state.robots.findIndex(
        (user) => user._id === updatedUser._id
      );
      if (index !== -1) {
        state.robots[index] = updatedUser;
      }
    });
    builder.addCase(updateRobot.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });

    // get organization

    builder.addCase(getRobot.pending, (state) => {
      state.loading = true;
      state.error = undefined;
      state.robot = undefined;
    });
    builder.addCase(getRobot.fulfilled, (state, action) => {
      state.robot = action.payload;
      state.loading = false;
    });
    builder.addCase(getRobot.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });

    // create organization

    builder.addCase(createRobot.pending, (state) => {
      state.loading = true;

      state.error = undefined;
    });
    builder.addCase(createRobot.fulfilled, (state, action) => {
      state.robots.push(action.payload);
      state.loading = false;
    });
    builder.addCase(createRobot.rejected, (state, action) => {
      state.loading = false;

      state.error = action.error.message;
    });

    // remove organization

    builder.addCase(deleteRobotById.pending, (state) => {
      state.loading = true;
      state.error = undefined;
    });
    builder.addCase(deleteRobotById.fulfilled, (state, action) => {
      state.robots = action.payload;
      state.loading = false;
    });
    builder.addCase(deleteRobotById.rejected, (state, action) => {
      state.loading = false;

      state.error = action.error.message;
    });
  },
});

export const {
  openEditRobotModal,
  closeEditRobotModal,
  closeViewRobotModal,
  openViewRobotModal,
} = robotSlice.actions;

export default robotSlice.reducer;
