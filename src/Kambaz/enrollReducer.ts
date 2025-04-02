import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  enrollments: [],
};

const enrollSlice = createSlice({
  name: "enroll",
    initialState,
    reducers: {
      setEnrollments: (state, action) => {
        state.enrollments = action.payload;
      },
      addEnrollment: (state, {payload: enrollment}) => {
        state.enrollments = [...state.enrollments, enrollment] as any;
      },
      deleteEnrollments: (state, {payload: enrollment}) => {
        state.enrollments = state.enrollments.filter((e: any) => e._id !== enrollment.userId && e.course !== enrollment.courseId);
      },
    }
});

export const { addEnrollment, setEnrollments, deleteEnrollments } = enrollSlice.actions;
export default enrollSlice.reducer;