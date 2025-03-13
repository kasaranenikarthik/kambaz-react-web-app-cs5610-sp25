import { createSlice } from "@reduxjs/toolkit";
import { courses } from "../Database";

const initialState = {
  courses: courses,
};

const kambazSlice = createSlice({
  name: "kambaz",
    initialState,
    reducers: {
      addCourse: (state, {payload: course}) => {
        state.courses = [...state.courses, course] as any;
      },
      deleteCourse: (state, {payload: courseId}) => {
        state.courses = state.courses.filter((course) => course._id !== courseId);
      },
      updateCourse: (state, {payload: course}) => {
        state.courses = state.courses.map((c) => {
          if (c._id === course._id) {
            return course;
          } else {
            return c;
          }
        });
      },
    },
});

export const { addCourse, deleteCourse, updateCourse } = kambazSlice.actions;
export default kambazSlice.reducer;