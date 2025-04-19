import { configureStore } from "@reduxjs/toolkit";
import modulesReducer from "./Courses/Modules/reducer";
import accountReducer from "./Account/reducer";
import assignmentReducer from "./Courses/Assignments/reducer";
import courseReducer from "./Courses/reducer";
import enrollReducer from "./enrollReducer";
import userReducer from "./userReducer";
import quizReducer from "./Courses/Quizzes/reducer";

const store = configureStore({
  reducer: {
    modulesReducer, accountReducer, assignmentReducer, courseReducer, enrollReducer, userReducer, quizReducer
  },
});
export default store;