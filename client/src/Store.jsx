import { configureStore } from "@reduxjs/toolkit";
import bookSlice from "./slices/BookSlice";

// slice 안에 있는 reducer를 모아 store를 생성
const store = configureStore({
  reducer: {
    book: bookSlice.reducer,
  },
});

export default store;
