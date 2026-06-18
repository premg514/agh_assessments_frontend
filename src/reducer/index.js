import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "../slices/authSlice";
import profileReducer from "../slices/profileSlice";
import themeReducer from "../slices/themeSlice";
import batchCompareResultsReducer from "../slices/batchCompareResultSlice";
import assessmentReducer from "../slices/aghAssessmentSlice";
const rootReducer = combineReducers({
  auth: authReducer,
  profile: profileReducer,
  theme: themeReducer,
  batchCompare: batchCompareResultsReducer,
  assessment: assessmentReducer,
});
export default rootReducer;
