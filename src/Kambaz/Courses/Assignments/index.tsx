import { FaPlus } from "react-icons/fa6";
import { BsGripVertical } from "react-icons/bs";
import { PiNotePencilBold } from "react-icons/pi";
import { SlOptionsVertical } from "react-icons/sl";
import AssignmentControlButtons from "./AssignmentControlButtons";
import { Button, ListGroup } from "react-bootstrap";


export default function Assignments() {
    return (
      <div id="wd-assignments">
        <div id="input-group" className="d-flex justify-content-end">
          <input className="rounded-3 me-2 fs-5" placeholder="🔍 Search for Assignment" id="wd-search-assignment" />
          <Button variant="danger" size="lg" className="me-2" id="wd-add-assignment">
            <FaPlus className="position-relative me-2" style={{ bottom: "1px" }} />
            Assignment
          </Button>
          <Button variant="secondary" size="lg" className="me-1"  id="wd-add-assignment-group">
          <FaPlus className="position-relative me-2" style={{ bottom: "1px" }} />
            Group</Button>
        </div>
        <br />
        <ListGroup className="rounded-0 mt-2" id="wd-modules">
          <ListGroup.Item className="wd-module p-0 mb-5 fs-5 border-gray">
            <div className="wd-title ps-2 bg-secondary"> 
              <BsGripVertical className="me-2 fs-3" /> ASSIGNMENTS 
              <div className="float-end d-flex justify-content-end mt-1" id="wd-assignments-options">
                <span className="badge rounded-pill bg-white text-dark"> 40% of Total</span>
                <FaPlus className="fs-5 ms-2 me-2" />
                <SlOptionsVertical className="fs-5 ms-2 me-2" />
              </div>
            </div>
            <ListGroup className="wd-lessons rounded-0">
              <ListGroup.Item className="wd-lesson p-3 ps-1">
                <AssignmentControlButtons />
                  <BsGripVertical className="me-2 fs-3" />
                  <PiNotePencilBold className="me-2 fs-3" />
                  <a href="#/Kambaz/Courses/1234/Assignments/123" className="wd-assignment-link text-black text-ud" > A1 - ENV + HTML</a> <br />
                  <span className="wd-assigment-info d-block mt-1 ps-5">
                    Multiple Modules | <b>Not available until</b> May 6 at 12:00am | <b>Due</b> May 13 at 11:59pm | 100 pts
                  </span>
              </ListGroup.Item>
              <ListGroup.Item className="wd-lesson p-3 ps-1">
                <AssignmentControlButtons />
                <BsGripVertical className="me-2 fs-3" />
                <PiNotePencilBold className="me-2 fs-3" />
                <a href="#/Kambaz/Courses/1234/Assignments/124" className="wd-assignment-link text-black" > A2 - CSS + BOOTSTRAP </a> <br />
                <div className="wd-assigment-info d-block mt-1 ps-5">
                  Multiple Modules | <b>Not available until</b> May 13 at 12:00am | <b>Due</b> May 20 at 11:59pm | 100 pts
                </div>
              </ListGroup.Item>
              <ListGroup.Item className="wd-lesson p-3 ps-1">
                <AssignmentControlButtons />
                <BsGripVertical className="me-2 fs-3" />
                <PiNotePencilBold className="me-2 fs-3" />
                <a href="#/Kambaz/Courses/1234/Assignments/125" className="wd-assignment-link text-black" > A3 - JAVASCRIPT + REACT </a> <br />
                <div className="wd-assigment-info d-block mt-1 ps-5">
                  Multiple Modules | <b>Not available until</b> May 20 at 12:00am | <b>Due</b> May 27 at 11:59pm | 100 pts
                </div>
              </ListGroup.Item>
            </ListGroup>
          </ListGroup.Item>
        </ListGroup>
      </div>
  );
}
  