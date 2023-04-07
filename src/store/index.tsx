import { configureStore } from "@reduxjs/toolkit";
import userAuth from "./userAuth";
import language from "./lang";

const store = configureStore({
  reducer: {
    userAuth,
    language,
  },
});

export default store;
