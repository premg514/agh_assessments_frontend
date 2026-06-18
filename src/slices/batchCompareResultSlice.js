import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  results: {},
};

const batchComparisonResultSlice = createSlice({
  name: "batchCompare",
  initialState: initialState,
  reducers: {
    setBatchCompareResults(state, value) {
      state.results = value.payload;
    },
    resetBatchCompareResults(state, value) {
      state.results = {};
    },
  },
});

export const { setBatchCompareResults, resetBatchCompareResults } =
  batchComparisonResultSlice.actions;

export default batchComparisonResultSlice.reducer;
