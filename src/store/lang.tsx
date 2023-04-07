import { createSlice } from "@reduxjs/toolkit";
import LangService from "../api/LangService";

interface IinitialState {
  language: string;
}

const initialState: IinitialState = {
  language: LangService.getToken() ? `${LangService.getToken()}` : "en",
};

const languageSlice = createSlice({
  name: "language",
  initialState,
  reducers: {
    setLanguage: (state, action) => {
      state.language = action.payload;
    },
  },
});

export const { setLanguage } = languageSlice.actions;
export default languageSlice.reducer;
