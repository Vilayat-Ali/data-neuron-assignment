import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { Todo } from "../../interfaces/todo";

interface PaginatedOptions {
  page: number;
  limit: number;
}

export const todoApi = createApi({
  reducerPath: "todoApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_APP_BACKEND_URL}`,
  }),
  tagTypes: ["todo", "count"],
  endpoints: (builder) => ({
    createTodo: builder.mutation<Todo, Partial<Todo>>({
      query: (todo: Partial<Todo>) => ({
        url: "/todo",
        method: "POST",
        body: {
          ...todo,
        },
      }),
      invalidatesTags: ["todo", "count"],
    }),
    // 🔄 Define a query for getting all todos (paginated format) with pagination options
    getAllTodos: builder.query<
      {
        message: string;
        todos: [
          {
            todos: Todo[];
            totalCount: number;
          }
        ];
      },
      PaginatedOptions
    >({
      query: ({ page, limit }: PaginatedOptions) =>
        `/todo?page=${page}&limit=${limit}`, // 🔍 Query string for pagination
      providesTags: ["todo"], // proide data
    }),
    // updation method for updating a specific todo
    updateTodo: builder.mutation<
      Todo,
      { id: string; updatedFields: Partial<Todo> }
    >({
      query: ({ id, updatedFields }) => ({
        url: `/todo/${id}`,
        method: "PATCH",
        body: updatedFields,
      }),
      invalidatesTags: ["todo", "count"], // refetch after every updation of data
    }),
    // deletion method for updating a specific todo
    deleteTodo: builder.mutation<Todo, string>({
      query: (id) => ({
        url: `/todo/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["todo", "count"], // refetch after every deletion of data
    }),
    // fetching count
    getCount: builder.query<
      {
        data: {
          ADD: number;
          UPDATE: number;
          DELETE: number;
        };
      },
      void
    >({
      query: () => `/count`,
      providesTags: ["count"],
    }),
  }),
});

export const {
  useCreateTodoMutation,
  useGetAllTodosQuery,
  useUpdateTodoMutation,
  useDeleteTodoMutation,
  useGetCountQuery,
} = todoApi;
