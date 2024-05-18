// authSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthData {
  token: string | null;
  authInfo: {};
  permissions: any[];
  role: string;
}

const initialState: AuthData = {
  token: localStorage.getItem("token") || null,
  authInfo: JSON.parse(localStorage.getItem("authInfo") || "{}"),
  role: JSON.parse(localStorage.getItem("authInfo") || "{}").role,
  permissions: JSON.parse(localStorage.getItem("authInfo") || "[]").permission
    ? Object.values(
        JSON.parse(localStorage.getItem("authInfo") || "[]").permission
          ?.permissions
      ).flat()
    : [],
};

export const authDataSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuth: (state, action: PayloadAction<AuthData>) => {
      const { token, authInfo, permissions, role } = action.payload;
      state.token = token;
      state.authInfo = authInfo;
      state.role = role;
      state.permissions = permissions ? Object.values(permissions).flat() : [];
      localStorage.setItem("token", token || ""); // Save token to local storage
      localStorage.setItem("authInfo", JSON.stringify(authInfo)); // Save authInfo to local storage
    },
    logout: (state) => {
      state.token = null;
      state.authInfo = {};
      state.role = "";
      state.permissions = [];
      localStorage.removeItem("token"); // Remove token from local storage
      localStorage.removeItem("authInfo"); // Remove authInfo from local storage
    },
  },
});

export const { setAuth, logout } = authDataSlice.actions;

export default authDataSlice.reducer;
