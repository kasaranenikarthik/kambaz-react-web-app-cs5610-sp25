import { createSlice } from "@reduxjs/toolkit";
import { users } from "./Database";

const initialState = {
  users: users,
};

const userSlice = createSlice({
  name: "user",
    initialState,
    reducers: {
      addUser: (state, {payload: user}) => {
        state.users = [...state.users, user] as any;
      },
      deleteUser: (state, {payload: userId}) => {
        state.users = state.users.filter((user) => user._id !== userId);
      }
    }
  }
);

export const { addUser, deleteUser } = userSlice.actions;
export default userSlice.reducer;