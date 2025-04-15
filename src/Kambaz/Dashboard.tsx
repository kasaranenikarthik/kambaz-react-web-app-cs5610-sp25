import { Link } from "react-router-dom";
import { Row, Col, Card, Button, FormControl } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { setEnrollments, addEnrollment, deleteEnrollments } from "./enrollReducer";
import { v4 as uuidv4 } from "uuid";
import { useEffect, useState } from "react";
import * as courseClient from "./Courses/client";
import * as accountClient from "./Account/client";


export default function Dashboard(
  { courses, setCourses, course, setCourse, addNewCourse, deleteCourse, updateCourse, enrolling, setEnrolling, updateEnrollment }: {
    courses: any[];
    setCourses: (courses: any[]) => void; 
    course: any; 
    setCourse: (course: any) => void;
    addNewCourse: () => void; 
    deleteCourse: (course: any) => void;
    updateCourse: () => void;
    enrolling: boolean;
    setEnrolling: (enrolling: boolean) => void; 
    updateEnrollment: (courseId: string, enrolled: boolean) => void;
  }){ 
  const { currentUser } = useSelector((state: any) => state.accountReducer);

  const dispatch = useDispatch();

  const [showAllCourses, setShowAllCourses] = useState(false);

  const fetchAllCourses = async () => {
    const courses = await courseClient.fetchAllCourses();
    setCourses(courses);
  };

  const fetchEnrolledCourses = async () => {
    const courses = await accountClient.findMyCourses();
    setCourses(courses);
  };

  useEffect(() => {
    fetchEnrolledCourses();
  }
  , [currentUser]);

  return (
    <div id="wd-dashboard">
      <div>
        {currentUser.firstName} {currentUser.lastName} <br />
      </div>
      <h1 id="wd-dashboard-title">
          Dashboard
          <button onClick={() => setEnrolling(!enrolling)} className="float-end btn btn-primary" > 
            {enrolling ? "My Courses" : "All Courses"} 
          </button> 
      </h1> <hr />
      { currentUser.role === "FACULTY" && <>
          <h5>New Course
          <Button className="btn btn-primary float-end mb-2" id="wd-add-new-course-click" onClick={() => {
            addNewCourse();
            dispatch(addEnrollment({ _id: uuidv4(), user: currentUser._id, course: course._id }));
          }} > Add </Button>
          <Button className="btn btn-warning float-end me-2" onClick={updateCourse} id="wd-update-course-click"> Update </Button>
          </h5>
          <FormControl value={course.name} className="mb-2"
                onChange={(e) => setCourse({ ...course, name: e.target.value }) } />
          <FormControl value={course.description}
                onChange={(e) => setCourse({ ...course, description: e.target.value }) } />
          <hr />
        </>
      }
      <h2 id="wd-dashboard-published">Published Courses ({courses.length})</h2> <hr />
      <div id="wd-dashboard-courses">
        <Row xs={1} md={5} className="g-4">
          {courses
            .map((course) => (
              <Col className="wd-dashboard-course" style={{ width: "300px" }}>
                <Card>
                  <Link to={`/Kambaz/Courses/${course._id}/Home`}
                        className="wd-dashboard-course-link text-decoration-none text-dark" >
                    <Card.Img src={`images/${course.img}`} variant="top" width="100%" height={160} />
                    <Card.Body className="card-body">
                      <Card.Title className="wd-dashboard-course-title text-nowrap overflow-hidden">
                        {course.name} </Card.Title>
                      <Card.Text className="wd-dashboard-course-description overflow-hidden" style={{ height: "100px" }}>
                        {course.description} </Card.Text>
                      <Button variant="primary"> Go </Button>
                      {currentUser.role === "FACULTY" &&
                        <Button onClick={(event) => {
                            event.preventDefault();
                            deleteCourse(course._id);
                          }} className="btn btn-danger float-end"
                          id="wd-delete-course-click">
                          Delete
                        </Button>
                      }
                      {currentUser.role === "FACULTY" &&
                        <Button id="wd-edit-course-click"
                          onClick={(event) => {
                            event.preventDefault();
                            setCourse(course);
                          }}
                          className="btn btn-warning me-2 float-end" >
                          Edit
                        </Button>
                      }
                      { enrolling 
                        &&(currentUser.role === "STUDENT" || currentUser.role === "FACULTY") 
                        && (<button onClick={(event) => { 
                                event.preventDefault(); 
                                updateEnrollment(course._id, !course.enrolled); 
                              }} 
                              className={`btn ${ course.enrolled ? "btn-danger" : "btn-success" } float-end`} > 
                            {course.enrolled ? "Unenroll" : "Enroll"} 
                          </button> )
                      }
                    </Card.Body>
                  </Link>
                </Card>
              </Col>
            ))
          }
        </Row>
      </div>
    </div>);}