import { createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

const initialState = {
  paste: localStorage.getItem("paste")
    ? JSON.parse(localStorage.getItem("paste"))
    : [],
};

export const pasteSlice = createSlice({
  name: "paste",
  initialState,
  reducers: {
    addToPaste: (state, action) => {
      state.paste = [action.payload, ...state.paste]; // Add to beginning
      localStorage.setItem("paste", JSON.stringify(state.paste));
      toast.success("Paste created successfully!");
    },
    updateTopPaste: (state, action) => {
      state.paste = state.paste.map((item) =>
        item._id === action.payload._id ? action.payload : item
      );
      localStorage.setItem("paste", JSON.stringify(state.paste));
      toast.success("Paste updated successfully!");
    },  
    resetAllPaste: (state) => {
      state.paste = [];
      localStorage.removeItem("paste");
    },
    removeFromPaste: (state, action) => {
      state.paste = state.paste.filter((item) => item._id !== action.payload);
      localStorage.setItem("paste", JSON.stringify(state.paste));
    },
  },
});

export const { addToPaste, updateTopPaste, resetAllPaste, removeFromPaste } =
  pasteSlice.actions;

export default pasteSlice.reducer;
