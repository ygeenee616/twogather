import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  roomid: "",
  date: "",
  startTime: 0,
  endTime: 0,
  personnel: 0,
};

const bookSlice = createSlice({
  name: "bookSlice",
  initialState,
  reducers: {
    createBook: (state, action) => {
      state.value = state.value + action.payload;
    },
  },
});

export default bookSlice;
