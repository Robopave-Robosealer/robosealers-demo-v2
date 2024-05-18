import { createSlice } from "@reduxjs/toolkit";

export interface MenuState {
  status: boolean;
}

const initialState: MenuState = {
  status: false,
};

export const menuSlice = createSlice({
  name: "menu",
  initialState,
  reducers: {
    close: (state) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.status = false;
    },
    open: (state) => {
      state.status = true;
    },
    // incrementByAmount: (state, action: PayloadAction<number>) => {
    //   state.value += action.payload
    // },
  },
});

// Action creators are generated for each case reducer function
export const { close, open } = menuSlice.actions;

export default menuSlice.reducer;
