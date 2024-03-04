import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../store";

interface InitialState {
  selectedTodo: string;
}

const initialState: InitialState = {
  selectedTodo: "",
};

export const todoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    set: (state, action: PayloadAction<string>) => {
      state.selectedTodo = action.payload;
    },
    reset: (state) => {
      state.selectedTodo = "";
    },
  },
});

export const { set, reset } = todoSlice.actions;

export const getSelectedTodo = (state: RootState) => state.todo.selectedTodo;

export default todoSlice.reducer;
