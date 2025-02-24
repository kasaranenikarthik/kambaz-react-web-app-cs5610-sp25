import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { useParams } from "react-router";
import * as db from "../../Database";


export default function AssignmentEditor() {
  const { cid } = useParams();
  const {aid} = useParams();
  const assignment = db.assignments.filter((assignment) => assignment._id === aid && assignment.course === cid);

    return (
      <Container id="wd-assignments-editor">
        { assignment.length === 1 &&
          assignment.map((assignment) => (
            <Form className="p-3 border fs-5 wd-assignments-editor"> 
              <Form.Group className="mb-3" controlId="wd-name">
                <Form.Label>Assignment Name</Form.Label>
                <Form.Control type="text" placeholder={`${assignment.title}`} />
              </Form.Group>
              <Form.Group className="mb-3" controlId="wd-description">
                <Form.Label>Description</Form.Label>
                <Form.Control as="textarea" rows={5} placeholder={`${assignment.description} ${assignment.title}`} />
              </Form.Group>
              <Form.Group className="mb-3 d-flex" controlId="wd-points">
                <Form.Label className="me-3 w-50 text-end">Points</Form.Label>
                <Form.Control type="number" placeholder={`${assignment.points}`}/>
              </Form.Group>
              <Form.Group className="mb-3 d-flex" controlId="wd-group">
                <Form.Label className="me-3 w-50 text-end">Assignment Group</Form.Label>
                <Form.Select aria-label="Select Assignment Group">
                    <option value="1">ASSIGNMENTS</option>
                    <option value="2">Quiz</option>
                    <option value="3">Project</option>
                </Form.Select>
              </Form.Group>
              <Form.Group className="mb-3 d-flex" controlId="wd-display-grade-as">
                  <Form.Label className="me-3 w-50 text-end">Display Grade as</Form.Label>
                  <Form.Select aria-label="Select Display Grade as">
                      <option value="1">Percentage</option>
                      <option value="2">Points</option>
                  </Form.Select>
              </Form.Group>
              <Form.Group className="mb-3 d-flex" controlId="wd-submission-type">
                <Form.Label className="me-3 w-50 text-end">Submission Type</Form.Label>
                <Form.Group className="p-3 mb-3 w-100 border" controlId="wd-online-entry-options">
                  <Form.Select aria-label="Select Submission Type">
                        <option value="1">Online</option>
                        <option value="2">In Person</option>
                        <option value="3">External Tool</option>
                  </Form.Select>
                  <Form.Label>Online Entry Options</Form.Label>
                  <Form.Check type="checkbox" label="Text Entry" id="wd-text-entry" />
                  <Form.Check type="checkbox" label="Website URL" id="wd-website-url" />
                  <Form.Check type="checkbox" label="File Upload" id="wd-file-upload" />
                  <Form.Check type="checkbox" label="Media Recordings" id="wd-media-recordings" />
                  <Form.Check type="checkbox" label="Student Annotation" id="wd-student-annotation" />
                </Form.Group>
              </Form.Group>
              <Form.Group className="mb-3 d-flex" controlId="wd-assign-to">
                <Form.Label className="me-3 w-50 text-end">Assign</Form.Label>
                <Form.Group className="p-3 mb-3 w-100 border" controlId="wd-assign-to">
                  <Form.Label className="me-3">Assign to</Form.Label>
                  <Form.Control type="text" placeholder="Everyone" />
                  <Form.Group className="mt-2" controlId="wd-due-date">
                    <Form.Label>Due</Form.Label>
                    <Form.Control type="datetime-local" defaultValue={`${assignment.due}`} />
                  </Form.Group>
                  <Form.Group className="mt-2 d-flex justify-content-end">
                    <Form.Group className="w-50" controlId="wd-available-from">
                      <Form.Label>Available From</Form.Label>
                      <Form.Control type="datetime-local" defaultValue={`${assignment.available}`} />
                    </Form.Group>
                    <Form.Group className="ms-2 w-50" controlId="wd-available-until">
                      <Form.Label className="me-2">Until</Form.Label>
                      <Form.Control type="datetime-local" defaultValue={`${assignment.due}`}/>
                    </Form.Group>
                  </Form.Group>
                  
                </Form.Group>
                
              </Form.Group>
              <hr />
              <Form.Group className="d-flex justify-content-end">
                <Row>
                  <Col>
                    <Button variant="secondary" size="lg"  id="wd-cancel">Cancel</Button>
                  </Col>
                  <Col>
                    <Button variant="secondary" className="bg-danger text-white" size="lg" id="wd-save">Save</Button>
                  </Col>
                </Row>
              </Form.Group>
            </Form>
          ))
        }
        
      </Container>
  );
}