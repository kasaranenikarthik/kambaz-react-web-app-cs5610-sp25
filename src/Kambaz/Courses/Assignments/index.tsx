import { FaPlus } from "react-icons/fa6";
import { BsGripVertical } from "react-icons/bs";
import { PiNotePencilBold } from "react-icons/pi";
import { SlOptionsVertical } from "react-icons/sl";
import AssignmentControlButtons from "./AssignmentControlButtons";
import { Button, ListGroup, Modal} from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import { useState } from "react";
import { addAssignment, deleteAssignment } from "./reducer";
import AssignmentCreator from "./shortEditor";
import { useDispatch, useSelector } from "react-redux";



export default function Assignments() {
  const dispatch = useDispatch();

  const { currentUser } = useSelector((state: any) => state.accountReducer);
  
  const { cid } = useParams();
  const { assignments } = useSelector((state: any) => state.assignmentReducer);
  
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const addAssignments = (assignment: any) => {
    dispatch(addAssignment(assignment));
  }

  const deleteAssignments = (assignmentId: any) => {
    dispatch(deleteAssignment(assignmentId));
  }
  
    return (
      <div id="wd-assignments">
        <div id="input-group" className="d-flex justify-content-end">
          <input className="rounded-3 me-2 fs-5" placeholder="🔍 Search for Assignment" id="wd-search-assignment" />
          { currentUser.role === "FACULTY" && (
            <>
              <Button variant="danger" size="lg" className="me-2" id="wd-add-assignment" onClick={handleShow}>
                <FaPlus className="position-relative me-2" style={{ bottom: "1px" }} />
                Assignment
              </Button>
              <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                  <Modal.Title>Assignment creator</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <AssignmentCreator handleClose={handleClose} addAssignment={addAssignments}/>
                </Modal.Body>
              </Modal>
              <Button variant="secondary" size="lg" className="me-1"  id="wd-add-assignment-group">
                <FaPlus className="position-relative me-2" style={{ bottom: "1px" }} />
                Group
              </Button>
            </>
        )}
        </div>
        <br />
        <ListGroup className="rounded-0 mt-2" id="wd-modules">
          { assignments.filter((assignment) => assignment.course === cid).length >0 && 
            <ListGroup.Item className="wd-module p-0 mb-5 fs-5 border-gray">
              <div className="wd-title ps-2 bg-secondary"> 
                <BsGripVertical className="me-2 fs-3" /> ASSIGNMENTS 
                <div className="float-end d-flex justify-content-end mt-1" id="wd-assignments-options">
                  <span className="badge rounded-pill bg-white text-dark"> 40% of Total</span>
                  {currentUser.role === "FACULTY" && (<>
                    <FaPlus className="fs-5 ms-2 me-2" />
                    <SlOptionsVertical className="fs-5 ms-2 me-2" />
                    </>
                  )}
                </div>
              </div>
              <ListGroup className="wd-lessons rounded-0">
              { assignments.filter((a) => a.course === cid).map((a) => (
                <ListGroup.Item className="wd-lesson p-3 ps-1">
                  {currentUser.role === "FACULTY" &&
                  <>
                    <AssignmentControlButtons assignmentId={a._id} deleteAssignment={(assignmentId: string) => deleteAssignments(assignmentId)}/>
                    <BsGripVertical className="me-2 fs-3" />
                  </>    
                  }
                  <PiNotePencilBold className="me-2 fs-3" />
                  <Link to={currentUser.role === "FACULTY"?  `${a._id}` : ""} className="wd-assignment-link text-black">
                    {a.title}
                  </Link> <br />
                  <span className="wd-assigment-info d-block mt-1 ps-5">
                    Multiple Modules | <b>Not available until</b> {a.available} | <b>Due</b> {a.due} | {a.points} pts
                  </span>
                </ListGroup.Item>
              ))}
              </ListGroup>
            </ListGroup.Item>
          }
        </ListGroup>
      </div>
  );
}
  