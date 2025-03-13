import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

export default function ProtectedCourseRoute({ children, cid }: { children: any, cid: any }) {
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const { enrollments }  = useSelector((state: any) => state.enrollReducer);

  if (enrollments.filter((enrollment: any) => enrollment.user === currentUser._id && enrollment.course === cid).length > 0) {
    return children;
  } else {
    return <Navigate to="/Kambaz/Dashboard" />;
}}