import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    data: {},
  },
  reducers: {
    signInSuccess: (state, action) => {
      state.data = action.payload;
    },
    signOut: (state) => {
      state.data = {};
    },
  },
});

// Action creators are generated for each case reducer function
export const { signInSuccess, signOut} = userSlice.actions;

export default userSlice.reducer;
