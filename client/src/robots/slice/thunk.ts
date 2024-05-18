// Define the async thunk for fetching the roles list

import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  DeleteService,
  GetService,
  PostService,
  PutService,
} from "../../api/services/requests-service";
import ApiRoutes from "../../api/services/api-routes";
import { RootState } from "../../../store/store";

// Define the async thunk for fetch robots List

export const fetchRobotsList = createAsyncThunk<any, string | undefined>(
  "robotsList/fetchRobotsList",
  async (orgId, { rejectWithValue }) => {
    try {
      const response = await GetService({
        route: ApiRoutes.listRobots,
        params: {
          org: orgId,
        },
      });
      return response.data.result;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

// Define the async thunk for deleting a robot by ID
export const deleteRobotById = createAsyncThunk<any, string>(
  "robotsList/deleteRobotById",

  async (robotId, { rejectWithValue, getState }) => {
    try {
      await DeleteService({
        route: ApiRoutes.removeRobot,
        params: {
          _id: robotId,
        },
      });
      const state = getState() as RootState;
      const robots = state.robotReducers.robots.filter(
        (robot) => robot._id !== robotId
      );

      return robots;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

// Define the async thunk for get a robot

export const getRobot = createAsyncThunk<any, any>(
  "robotsList/getRobot",

  async (robotId, { rejectWithValue }) => {
    try {
      const response = await GetService({
        route: ApiRoutes.getRobot,
        params: {
          _id: robotId,
        },
      });
      return response.data.result;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);
// Define the async thunk for create a robot

export const createRobot = createAsyncThunk<any, any>(
  "robotsList/createRobot",

  async (robot, { rejectWithValue }) => {
    try {
      const response = await PostService({
        route: ApiRoutes.createRobot,
        body: robot,
      });
      return response.data.result;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

// Define the async thunk for update a robot

export const updateRobot = createAsyncThunk<any, any>(
  "robotsList/updateRobot",

  async ({ robot, robotId }, { rejectWithValue }) => {
    try {
      const response = await PutService({
        route: ApiRoutes.updateRobot,
        body: robot,
        params: {
          _id: robotId,
        },
      });
      return response.data.result;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);
