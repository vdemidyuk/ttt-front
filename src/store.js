import { configureStore } from "@reduxjs/toolkit";
import thunkMiddleware from "redux-thunk";
import boardReducer from "./containers/board/boardSlice";

export default configureStore({
  reducer: {
    board: boardReducer,
  },
  middleware: [thunkMiddleware],
});
