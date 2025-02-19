import { Link, useLocation, useParams } from "react-router-dom";

export default function CourseNavigation() {
  const { cid } = useParams();
  const { pathname } = useLocation();
  const links = ["Home", "Modules", "Piazza", "Zoom", "Assignments", "Quizzes", "Grades", "People"];
  return (
    <div id="wd-courses-navigation" className="wd list-group fs-5 rounded-0">
      {links.map((link) => (
        <Link to={`/Kambaz/Courses/${cid}/${link}`} id={`wd-course-${link.toLowerCase()}-link`}
          className={`list-group-item list-group-item-action ${pathname.includes(link)? "active":""} border border-0`}> {link} </Link>
      ))}
    </div>
  );
}
