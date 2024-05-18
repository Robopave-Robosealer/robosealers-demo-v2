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

// Define the async thunk for fetch users List

export const fetchUsersList = createAsyncThunk<any>(
  "usersList/fetchUsersList",
  async (_, { rejectWithValue }) => {
    try {
      const response = await GetService({
        route: ApiRoutes.listUsers,
      });
      return response.data.result;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);
// Define the async thunk for deleting a user by ID
export const deleteUserById = createAsyncThunk<any, string>(
  "usersList/deleteUserById",
  async (userId, { rejectWithValue, getState }) => {
    try {
      await DeleteService({
        route: ApiRoutes.removeUser,
        params: {
          _id: userId,
        },
      });
      const state = getState() as RootState;
      const users = state.userReducers.users.filter(
        (user) => user._id !== userId
      );

      return users;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

// Define the async thunk for get a user

export const getUser = createAsyncThunk<any, any>(
  "usersList/getUser",
  async (userId, { rejectWithValue }) => {
    try {
      const response = await GetService({
        route: ApiRoutes.getUser,
        params: {
          _id: userId,
        },
      });
      return response.data.result;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);
// Define the async thunk for create a user

export const createUser = createAsyncThunk<any, any>(
  "usersList/createUser",
  async (user, { rejectWithValue }) => {
    try {
      const response = await PostService({
        route: ApiRoutes.createUser,
        body: user,
      });
      return response.data.result;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

// Define the async thunk for update a user

export const updateUser = createAsyncThunk<any, any>(
  "usersList/updateUser",
  async ({ user, userId }, { rejectWithValue }) => {
    try {
      const response = await PutService({
        route: ApiRoutes.updateUser,
        body: user,
        params: {
          _id: userId,
        },
      });
      return response.data.result;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);
