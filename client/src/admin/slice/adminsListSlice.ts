import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../../store/store";
import ApiRoutes from "../../api/services/api-routes";
import { AdminType } from "../types";
import { DeleteService, GetService } from "../../api/services/requests-service";

// Define the initial state
interface AdminsListState {
  admins: AdminType[];

  loading: boolean;
  error: string | null;
  count: number;
}

const initialState: AdminsListState = {
  admins: [],

  loading: false,
  error: null,
  count: 4,
};

// Define the async thunk for fetching the admins list
export interface FetchAdminsParams {
  activePage?: number;
  limit?: number;
}

export const fetchAdminsList = createAsyncThunk<
  any,
  FetchAdminsParams | undefined
>("adminsList/fetchAdminsList", async (params, { rejectWithValue }) => {
  try {
    let queryParams: any = {};

    if (params && params.activePage !== undefined) {
      queryParams.page = params.activePage;
    }

    if (params && params.limit !== undefined) {
      queryParams.limit = params.limit;
    }

    const response = await GetService({
      route: ApiRoutes.listAdmins,
      params: queryParams,
    });

    return response.data;
  } catch (error: any) {
    return rejectWithValue(error.message);
  }
});

// Define the async thunk for deleting an admin by ID
export const deleteAdminById = createAsyncThunk<any, string>(
  "adminsList/deleteAdminById",
  async (adminId, { rejectWithValue, getState }) => {
    try {
      await DeleteService({
        route: ApiRoutes.removeAdmin,
        params: {
          _id: adminId,
        },
      });

      const state = getState() as RootState;
      const admins = state.adminList.admins.filter(
        (admin) => admin._id !== adminId
      );

      return admins;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

// Create the adminsListSlice
const adminsListSlice = createSlice({
  name: "adminsList",
  initialState,
  reducers: {
    // Add reducer to add a new admin to the list
    addAdmin(state, action: PayloadAction<AdminType>) {
      state.admins.push(action.payload);
    },

    editAdmin(state, action: PayloadAction<AdminType>) {
      const updatedAdmin = action.payload;
      const index = state.admins.findIndex(
        (admin) => admin._id === updatedAdmin._id
      );

      if (index !== -1) {
        state.admins[index] = updatedAdmin;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAdminsList.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAdminsList.fulfilled, (state, action) => {
        state.loading = false;
        state.count = action.payload.count;
        state.admins = action.payload.result;
      })
      .addCase(fetchAdminsList.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(deleteAdminById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteAdminById.fulfilled, (state, action) => {
        state.loading = false;
        state.admins = action.payload;
      })
      .addCase(deleteAdminById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

// Export actions and reducer
export const { addAdmin, editAdmin } = adminsListSlice.actions;
export default adminsListSlice.reducer;

// Selector function to access the admins list from the state
export const selectAdminsList = (state: RootState) => state.adminList;
