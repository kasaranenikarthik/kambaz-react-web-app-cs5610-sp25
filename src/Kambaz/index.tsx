import Account from "./Account";
import { Navigate, Route, Routes } from "react-router";
import Dashboard from "./Dashboard";
import KambazNavigation from "./Navigation";
import Courses from "./Courses";
import "./styles.css";
import { useState } from "react";
import ProtectedRoute from "./Account/ProtectedRoute";
import { useDispatch, useSelector } from "react-redux";
import { addCourse, deleteCourse, updateCourse } from "./Courses/reducer";

export default function Kambaz() {
  const {courses} = useSelector((state: any) => state.courseReducer);
  const dispatch = useDispatch();

  const [course, setCourse] = useState<any>({
    _id: "1234", name: "New Course", number: "New Number",
    startDate: "2023-09-10", endDate: "2023-12-15", description: "New Description", img: "reactjs.jpg"
  });
  
  const addNewCourse = () => {
     dispatch(addCourse(({ ...course })));
  };

  const deleteCourses = (courseId: string) => {
    dispatch(deleteCourse(courseId));
  };

  const updateCourses = () => {
    dispatch(updateCourse(course));
  }

    return (
      <div id="wd-kambaz">
        <KambazNavigation />
        <div className="wd-main-content-offset p-3">
          <Routes>
            <Route path="/" element={<Navigate to="/Kambaz/Dashboard" />} />
            <Route path="/Account/*" element={<Account />} />
            <Route path="Dashboard" element={
              <ProtectedRoute>
                <Dashboard
                  courses={courses}
                  course={course}
                  setCourse={setCourse}
                  addNewCourse={addNewCourse}
                  deleteCourse={deleteCourses}
                  updateCourse={updateCourses}/>
                </ProtectedRoute>
              } />
            <Route path="Courses/:cid/*" element={<ProtectedRoute><Courses courses={courses} /></ProtectedRoute>} />
            <Route path="/Calendar" element={<h1>Calendar</h1>} />
            <Route path="/Inbox" element={<h1>Inbox</h1>} />
          </Routes>
        </div>
    </div>
  );
}
  