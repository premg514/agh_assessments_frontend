import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  user: localStorage.getItem("user")
    ? (() => {
        try {
          return JSON.parse(localStorage.getItem("user"));
        } catch (error) {
          console.log("Error parsing token from localStorage:", error);
          return null;
        }
      })()
    : null,
  testAccess: null,
  elearningAccess: null,
  companyAccess: [],
};
const profileSlice = createSlice({
  name: "profile",
  initialState: initialState,
  reducers: {
    setUser(state, value) {
      state.user = value.payload;
    },
    setLoading(state, value) {
      state.loading = value.payload;
    },
    setTestAccess(state, value) {
      state.testAccess = value.payload;
    },
    setElearningAccess(state, value) {
      state.elearningAccess = value.payload;
    },
    //this is for putting the company access
    //while logging in itself we can show its access dude
    setCompanyAccess(state, action) {
      state.companyAccess = action.payload;
    },
  },
});
export const {
  setUser,
  setLoading,
  setTestAccess,
  setElearningAccess,
  setCompanyAccess,
} = profileSlice.actions;
export default profileSlice.reducer;
