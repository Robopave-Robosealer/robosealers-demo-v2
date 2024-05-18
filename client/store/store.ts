import { configureStore } from "@reduxjs/toolkit";
import menuReducer from "../src/design-system/components/Header/slice/menuSlice";
import settingModalReducer from "../src/design-system/components/SettingControl/slice/settingModalSlice";
import authReducer from "../src/auth/slice/authSlice";
import rolesList from "../src/roles/slice/rolesListSlice";
import showRoleModal from "../src/roles/slice/show-role-modal-slice";
import editRoleModal from "../src/roles/slice/edit-role-modal-slice";
import adminList from "../src/admin/slice/adminsListSlice";
import orgsList from "../src/orgnization/slice/org-slice";
import editAdminModal from "../src/admin/slice/edit-admin-modal-slice";
import userReducers from "../src/users/slice/user-slice";
import robotReducers from "../src/robots/slice/robot-slice";

export const store = configureStore({
  reducer: {
    menu: menuReducer,
    settingModal: settingModalReducer,
    showRoleModal,
    editRoleModal,
    auth: authReducer,
    rolesList,
    adminList,
    editAdminModal,
    orgsList,
    userReducers,
    robotReducers,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
