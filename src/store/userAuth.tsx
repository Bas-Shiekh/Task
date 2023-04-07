import { createSlice } from "@reduxjs/toolkit";
import JwtService from "../api/JwtService";

interface IinitialState {
  isLoggedIn: boolean;
}

const initialState = { isLoggedIn: JwtService.getToken() ? true : false };

const userAuthSlice = createSlice({
  name: "userAuth",
  initialState,
  reducers: {
    login: (state: IinitialState) => {
      state.isLoggedIn = true;
    },
    logout: (state: IinitialState) => {
      state.isLoggedIn = false;
    },
  },
});

export default userAuthSlice.reducer;
export const userAuthActions = userAuthSlice.actions;
