import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  token: localStorage.getItem("token")
    ? (() => {
        try {
          return localStorage.getItem("token");
        } catch (error) {
          console.log("Error while getting token from local storage", error);
          return null;
        }
      })()
    : null,
};
const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    setToken(state, value) {
      state.token = value.payload;
    },
  },
});
export const { setToken } = authSlice.actions;
export default authSlice.reducer;
