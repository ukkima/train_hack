import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  accessToken: "",
  loading: false,
  error: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuth: (state, action) => {
      state.user = action.payload.user;
      state.accessToken = action.payload.accessToken;
    },
  },
});

export const authActions = authSlice.actions;
export const authReducer = authSlice.reducer;
