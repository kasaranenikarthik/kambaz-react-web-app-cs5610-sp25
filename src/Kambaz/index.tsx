import Account from "./Account";
import { useEffect } from "react";
import * as userClient from "./Account/client";
import * as courseClient from "./Courses/client";
import { Navigate, Route, Routes } from "react-router";
import Dashboard from "./Dashboard";
import KambazNavigation from "./Navigation";
import Courses from "./Courses";
import "./styles.css";
import { useState } from "react";
import ProtectedRoute from "./Account/ProtectedRoute";
import { useDispatch, useSelector } from "react-redux";
import Session from "./Account/Session";
import { setEnrollments } from "./enrollReducer";

export default function Kambaz() {

  const dispatch = useDispatch();

  const [course, setCourse] = useState<any>({
    _id: "1234", name: "New Course", number: "New Number",
    startDate: "2023-09-10", endDate: "2023-12-15", description: "New Description", img: "reactjs.jpg"
  });
  
  const addNewCourse = async () => {
    const newCourse = await userClient.createCourse(course);
    setCourses([ ...courses, newCourse ]);
  };


  const deleteCourse = async (courseId: string) => {
    const status = await courseClient.deleteCourse(courseId);
    setCourses(courses.filter((course) => course._id !== courseId));
  };


  const updateCourse = async () => {
    await courseClient.updateCourse(course);
    setCourses(courses.map((c) => {
        if (c._id === course._id) { return course; }
        else { return c; }
    }));
  }


  const [courses, setCourses] = useState<any[]>([]);

  const { currentUser } = useSelector((state: any) => state.accountReducer);
  
  const fetchCourses = async () => {
    try {
      const courses = await userClient.findMyCourses();
      setCourses(courses);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchEnrollments = async () => {
    try {
      const enrollments = await userClient.findAllEnrollments();
      dispatch(setEnrollments(enrollments));
    } catch (error) {
      console.error(error);
    }
  }


  useEffect(() => {
    fetchCourses();
    fetchEnrollments();
  }, [currentUser]);


    return (
      <Session>
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
                    fetchEnrolledCourses={fetchCourses}
                    setCourses={setCourses}
                    course={course}
                    setCourse={setCourse}
                    addNewCourse={addNewCourse}
                    deleteCourse={deleteCourse}
                    updateCourse={updateCourse}/>
                  </ProtectedRoute>
                } />
              <Route path="Courses/:cid/*" element={<ProtectedRoute><Courses courses={courses} /></ProtectedRoute>} />
              <Route path="/Calendar" element={<h1>Calendar</h1>} />
              <Route path="/Inbox" element={<h1>Inbox</h1>} />
            </Routes>
          </div>
      </div>
    </Session>
  );
}
  