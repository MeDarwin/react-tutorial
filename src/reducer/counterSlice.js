import { createSlice } from "@reduxjs/toolkit";

export const counter = createSlice({
  name: "counter",
  initialState: 0,
  reducers: {
    increment: (state) => state + 1,
    decrement: (state) => state - 1,
    incByAmount: (state, action) => state + action.payload,
    reset: (state = state) => (state = 0),
  },
});

export const { decrement, increment, incByAmount, reset } = counter.actions;
