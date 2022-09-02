import { createSlice } from "@reduxjs/toolkit";

const initialState = {};
const TodoReducer = createSlice({
  name: "Todo",
  initialState,
  reducers: {
    defaultAction: (state, { payload }) => {
      console.log("TodoReducer state and payload", state, payload);
    }
  }
});

const { reducer, actions } = TodoReducer;
export const { defaultAction } = actions;
export default reducer;
