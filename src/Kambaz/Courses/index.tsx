import { FaAlignJustify } from "react-icons/fa";
import Assignments from "./Assignments";
import AssignmentEditor from "./Assignments/Editor";
import Home from "./Home";
import Modules from "./Modules";
import CourseNavigation from "./Navigation";
import { Navigate, Route, Routes, useLocation, useParams } from "react-router";
import PeopleTable from "./People/Table";
import ProtectedAssignmentRoute from "./Assignments/ProtectedAssignmentRoute";
import ProtectedCourseRoute from "./ProtectedCourseRoute";

export default function Courses({courses}: {courses: any[]; }) {
  const { cid } = useParams();
  const pathname = useLocation();
  const course = courses.find((course) => course._id === cid);
  return (
    <div id="wd-courses">
      <h2 className="text-danger">
        <FaAlignJustify className="me-4 fs-4 mb-1" />
        {course && course.name} &gt; {pathname.pathname.split("/")[4]}
      </h2>
      <hr />
      <div className="d-flex">
        <div className="d-none w-20 d-md-block">
          <CourseNavigation />
        </div>
        <div className="flex-fill">
          <Routes>
            <Route path="/" element={<ProtectedCourseRoute cid={cid}> <Navigate to="Home" /> </ProtectedCourseRoute>} />
            <Route path="Home" element={<ProtectedCourseRoute cid={cid}> <Home /> </ProtectedCourseRoute>} />
            <Route path="Modules" element={ <ProtectedCourseRoute cid={cid}> <Modules /> </ProtectedCourseRoute>} />
            <Route path="Assignments" element={<ProtectedCourseRoute cid={cid}> <Assignments /> </ProtectedCourseRoute>} />
            <Route path="Assignments/:aid" element={<ProtectedCourseRoute cid={cid}> <ProtectedAssignmentRoute><AssignmentEditor /> </ProtectedAssignmentRoute> </ProtectedCourseRoute>} />
            <Route path="People" element={<ProtectedCourseRoute cid={cid}> <PeopleTable /> </ProtectedCourseRoute>} />
          </Routes>
        </div>
      </div> 
    </div>
  );
}
