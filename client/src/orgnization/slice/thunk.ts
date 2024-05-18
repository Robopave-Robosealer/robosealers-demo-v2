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

// Define the async thunk for fetch Orgs List

export const fetchOrgsList = createAsyncThunk<any>(
  "orgsList/fetchOrgsList",
  async (_, { rejectWithValue }) => {
    try {
      const response = await GetService({
        route: ApiRoutes.listOrgs,
      });
      return response.data.result;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);
// Define the async thunk for deleting a Org by ID
export const deleteOrgById = createAsyncThunk<any, string>(
  "orgsList/deleteOrgById",
  async (orgId, { rejectWithValue, getState }) => {
    try {
      await DeleteService({
        route: ApiRoutes.removeOrg,
        params: {
          _id: orgId,
        },
      });
      const state = getState() as RootState;
      const orgs = state.orgsList.orgs.filter((org) => org._id !== orgId);

      return orgs;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

// Define the async thunk for get a Org

export const getOrg = createAsyncThunk<any, any>(
  "orgsList/getOrg",
  async (orgId, { rejectWithValue }) => {
    try {
      const response = await GetService({
        route: ApiRoutes.getOrg,
        params: {
          _id: orgId,
        },
      });
      return response.data.result;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);
// Define the async thunk for create a Org

export const createOrg = createAsyncThunk<any, any>(
  "orgsList/createOrg",
  async (org, { rejectWithValue }) => {
    try {
      const response = await PostService({
        route: ApiRoutes.createOrg,
        body: org,
      });
      return response.data.result;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

// Define the async thunk for update a Org

export const updateOrg = createAsyncThunk<any, any>(
  "orgsList/updateOrg",
  async ({ org, orgId }, { rejectWithValue }) => {
    try {
      const response = await PutService({
        route: ApiRoutes.updateOrg,
        body: org,
        params: {
          _id: orgId,
        },
      });
      return response.data.result;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);
