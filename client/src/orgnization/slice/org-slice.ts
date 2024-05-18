import { createSlice } from "@reduxjs/toolkit";
import {
  createOrg,
  deleteOrgById,
  fetchOrgsList,
  getOrg,
  updateOrg,
} from "./thunk";
import { OrganizationType } from "../types";

interface OrgState {
  orgs: OrganizationType[];
  loading: boolean;
  error: undefined | string;
  openViewModal: boolean;
  openEditModal: boolean;
  org: any;
}

const initialState: OrgState = {
  orgs: [],
  loading: true,
  error: undefined,
  openViewModal: false,
  openEditModal: false,
  org: {},
};

const orgsSlice = createSlice({
  name: "orgs",
  initialState,
  reducers: {
    closeEditOrgModal: (state) => {
      state.openEditModal = false;
    },
    openEditOrgModal: (state) => {
      state.openEditModal = true;
    },
    closeViewOrgModal: (state) => {
      state.openViewModal = false;
    },
    openViewOrgModal: (state) => {
      state.openViewModal = true;
    },
  },
  extraReducers: (builder) => {
    // fetch organization

    builder.addCase(fetchOrgsList.pending, (state) => {
      state.loading = true;
      state.error = undefined;
    });
    builder.addCase(fetchOrgsList.fulfilled, (state, action) => {
      state.orgs = action.payload;
      state.loading = false;
    });
    builder.addCase(fetchOrgsList.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });

    // update organization

    builder.addCase(updateOrg.pending, (state) => {
      // state.loading = true;
      state.error = undefined;
    });
    builder.addCase(updateOrg.fulfilled, (state, action) => {
      state.loading = false;
      const updatedOrg = action.payload;
      const index = state.orgs.findIndex((org) => org._id === updatedOrg._id);
      if (index !== -1) {
        state.orgs[index] = updatedOrg;
      }
    });
    builder.addCase(updateOrg.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });

    // get organization

    builder.addCase(getOrg.pending, (state) => {
      state.loading = true;
      state.error = undefined;
      state.org = undefined;
    });
    builder.addCase(getOrg.fulfilled, (state, action) => {
      state.org = action.payload;
      state.loading = false;
    });
    builder.addCase(getOrg.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });

    // create organization

    builder.addCase(createOrg.pending, (state) => {
      state.loading = true;

      state.error = undefined;
    });
    builder.addCase(createOrg.fulfilled, (state, action) => {
      state.orgs.push(action.payload);
      state.loading = false;
    });
    builder.addCase(createOrg.rejected, (state, action) => {
      state.loading = false;

      state.error = action.error.message;
    });

    // remove organization

    builder.addCase(deleteOrgById.pending, (state) => {
      state.loading = true;
      state.error = undefined;
    });
    builder.addCase(deleteOrgById.fulfilled, (state, action) => {
      state.orgs = action.payload;
      state.loading = false;
    });
    builder.addCase(deleteOrgById.rejected, (state, action) => {
      state.loading = false;

      state.error = action.error.message;
    });
  },
});

export const {
  openEditOrgModal,
  openViewOrgModal,
  closeEditOrgModal,
  closeViewOrgModal,
} = orgsSlice.actions;

export default orgsSlice.reducer;
