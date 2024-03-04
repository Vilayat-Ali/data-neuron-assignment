import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../../app/store";

import { Todo } from "../../interfaces/todo";

interface InitialState {
  selectedTodo: Todo | undefined;
}

const initialState: InitialState = {
  selectedTodo: undefined,
};

export const todoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    set: (state, action: PayloadAction<Todo>) => {
      state.selectedTodo = action.payload;
    },
    reset: (state) => {
      state.selectedTodo = undefined;
    },
  },
});

export const { set, reset } = todoSlice.actions;

export const getSelectedTodo = (state: RootState) => state.todo.selectedTodo;

export default todoSlice.reducer;
