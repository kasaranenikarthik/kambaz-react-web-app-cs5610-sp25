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
        state.enrollments = [...state.enrollments, enrollment] as any;
      },
      deleteEnrollment: (state, {payload: enrollmentId}) => {
        state.enrollments = state.enrollments.filter((enrollment) => enrollment._id !== enrollmentId);
      },
      updateEnrollment: (state, {payload: enrollment}) => {
        state.enrollments = state.enrollments.map((e) => {
          if (e._id === enrollment._id) {
            return enrollment;
          } else {
            return e;
          }
        });
      },
    },
});

export const { addEnrollment, deleteEnrollment, updateEnrollment } = enrollSlice.actions;
export default enrollSlice.reducer;