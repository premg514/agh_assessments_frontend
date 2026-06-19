import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "../slices/authSlice";
import profileReducer from "../slices/profileSlice";
import themeReducer from "../slices/themeSlice";
import assessmentReducer from "../slices/aghAssessmentSlice";
const rootReducer = combineReducers({
  auth: authReducer,
  profile: profileReducer,
  theme: themeReducer,
  assessment: assessmentReducer,
});
export default rootReducer;
