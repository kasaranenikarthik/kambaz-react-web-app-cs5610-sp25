import { createSlice } from "@reduxjs/toolkit";
import { enrollments } from "./Database";

const initialState = {
  enrollments: enrollments,
};

const enrollSlice = createSlice({
  name: "enroll",
    initialState,
    reducers: {
      addEnrollment: (state, {payload: enrollment}) => {
        state.enrollments = [...state.enrollments, enrollment];
      },
      deleteEnrollment: (state, {payload: e}) => {
        state.enrollments = state.enrollments.filter((enrollment) => (enrollment._id !== e._id));
      }
    }
});

export const { addEnrollment, deleteEnrollment } = enrollSlice.actions;
export default enrollSlice.reducer;