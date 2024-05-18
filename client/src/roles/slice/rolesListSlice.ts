import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../../store/store";
import ApiRoutes from "../../api/services/api-routes";
import { RoleType } from "../types";
import { DeleteService, GetService } from "../../api/services/requests-service";

// Define the interface for role

// Define the initial state
interface RolesListState {
  roles: RoleType[];
  loading: boolean;
  error: string | null;
}

const initialState: RolesListState = {
  roles: [],
  loading: false,
  error: null,
};

// Define the async thunk for fetching the roles list

export const fetchRolesList = createAsyncThunk<RoleType[], string | undefined>(
  "rolesList/fetchRolesList",
  async (type, { rejectWithValue }) => {
    try {
      let params = {};
      if (type) {
        params = { type: type };
      }
      if (type == "All") {
        params = {};
      }

      const response = await GetService({
        route: ApiRoutes.listRoles,
        params,
      });
      return response.data.result;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);
// Define the async thunk for deleting a role by ID
export const deleteRoleById = createAsyncThunk<any, string>(
  "rolesList/deleteRoleById",
  async (roleId, { rejectWithValue, getState }) => {
    try {
      await DeleteService({
        route: ApiRoutes.removeRoles,
        params: {
          _id: roleId,
        },
      });

      const state = getState() as RootState;
      const roles = state.rolesList.roles.filter((role) => role._id !== roleId);

      return roles;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

// Create the rolesListSlice
const rolesListSlice = createSlice({
  name: "rolesList",
  initialState,
  reducers: {
    // Add reducer to add a new role to the list
    addRole(state, action: PayloadAction<RoleType>) {
      state.roles.push(action.payload);
    },
    editRole(state, action: PayloadAction<RoleType>) {
      const updatedRole = action.payload;
      const index = state.roles.findIndex(
        (role) => role._id === updatedRole._id
      );
      if (index !== -1) {
        state.roles[index] = updatedRole;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchRolesList.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchRolesList.fulfilled, (state, action) => {
        state.loading = false;
        state.roles = action.payload;
      })
      .addCase(fetchRolesList.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(deleteRoleById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteRoleById.fulfilled, (state, action) => {
        state.loading = false;
        state.roles = action.payload;
      })
      .addCase(deleteRoleById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

// Export actions and reducer
export const { addRole, editRole } = rolesListSlice.actions;
export default rolesListSlice.reducer;

// Selector function to access the roles list from the state
export const selectRolesList = (state: RootState) => state.rolesList.roles;
