import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { Button, Form, Nav, Tab, Row, Col } from "react-bootstrap";
import * as quizClient from "./client.ts";

export default function QuizDetailsEditor() {
  const { cid, qid } = useParams();
  const navigate = useNavigate();
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  
  const [quiz, setQuiz] = useState({
      _id: "test",
      course:"default" ,
      description:"",
      title: "test 1",
      published: true,
      due: "",
      type:"GRADEDQUIZ",
      availableFrom: "",
      until: "",
      points: 0,
      assignmentGroup: "QUIZZES",
      shuffleAns: true,
      timeLmt: 20,
      multipleAttempts: false,
      viewResponses: true,
      showCorrectAnswers: false,
      oneQaTime: true,
      lockdownBrowser: false,
      viewResults: false,
      webcam: false,
      lockQafterA: false,
      accessCode: "",
      maxAttempts: 1
    }
  );

  const [questions, setQuestions] = useState([{
    _id: "test",
    points: 0,
    text: "test",
    options: [],
    answer: [],
    type: "MULTIPLECHOICE"
  }]);

  const getQuiz = async () => {
    if (qid) {
      try {
        const fetchedQuiz = await quizClient.findQuizById(cid, qid);
        setQuiz(fetchedQuiz);
      } catch (error) {
        console.error("Error fetching quiz:", error);
      }
    }
  };

  const getQuizQuestions = async () => {
    if (qid) {
      try {
        const questions = await quizClient.getQuestionsForQuiz(cid, qid);
        setQuestions(questions);
      } catch (error) {
        console.error("Error fetching quiz questions:", error);
      }
    }
  }

  useEffect(() => {
    getQuiz();
    getQuizQuestions();
  }, [qid, cid]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    
    setQuiz({
      ...quiz,
      [name]: type === "checkbox" ? checked : value
    });
  };

  const handleSave = async (publish = false) => {
    try {
      const updatedQuiz = {...quiz};
      if (publish) {
        updatedQuiz.published = true;
      }
      
      // When sending to API, ensure it matches the expected type
      if (qid) {
        await quizClient.updateQuiz(cid, qid, updatedQuiz as any);
      } else {
        await quizClient.createQuiz(cid, updatedQuiz as any);
      }
      
      if (publish) {
        navigate(`/Kambaz/Courses/${cid}/Quizzes`);
      } else {
        navigate(`/Kambaz/Courses/${cid}/Quizzes/${qid || updatedQuiz._id}/details`);
      }
    } catch (error) {
      console.error("Error saving quiz:", error);
    }
  };

  const handleCancel = () => {
    navigate(-1);
  };

  const calculateTotalPoints = () => {
    return questions.reduce((total, question) => total + (question.points || 0), 0);
  };

  return (
    <div className="wd-quiz-editor ms-3 mt-3">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <div>
          <Form.Check
            type="switch"
            id="published-switch"
            label="Published"
            checked={quiz.published}
            onChange={(e) => setQuiz({...quiz, published: e.target.checked})}
            className="d-inline-block ms-2"
          />
        </div>
        <div>
          <span>Points {calculateTotalPoints()} </span>
        </div>
      </div>

      <Tab.Container id="quiz-editor-tabs" defaultActiveKey="details">
        <Nav variant="tabs" className="mb-3">
          <Nav.Item>
            <Nav.Link eventKey="details">Details</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link as={Link} to={`/Kambaz/Courses/${cid}/Quizzes/${qid}/questions`} eventKey="questions">
              Questions
            </Nav.Link>
          </Nav.Item>
        </Nav>

        <Tab.Content>
          <Tab.Pane eventKey="details">
            <Form>
              <Form.Group className="mb-3">
                <Form.Control
                  type="text"
                  placeholder="Unnamed Quiz"
                  name="title"
                  value={quiz.title}
                  onChange={handleChange}
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Quiz Instructions:</Form.Label>
                <div className="border rounded p-2">
                  <div className="d-flex mb-2 border-bottom pb-2">
                    <Button variant="light" size="sm" className="me-1">Edit</Button>
                    <Button variant="light" size="sm" className="me-1">View</Button>
                  </div>

                  <Form.Control
                    as="textarea"
                    rows={4}
                    name="description"
                    value={quiz.description}
                    onChange={handleChange}
                    className="border-0"
                  />
                </div>
              </Form.Group>

              <Row className="mb-3">
                <Form.Group as={Col} md={4}>
                  <Form.Label>Quiz Type</Form.Label>
                  <Form.Select 
                    name="type" 
                    value={quiz.type} 
                    onChange={handleChange}
                  >
                    <option value="GRADEDQUIZ">Graded Quiz</option>
                    <option value="PRACTICEQUIZ">Practice Quiz</option>
                    <option value="GRADEDSURVEY">Graded Survey</option>
                    <option value="UNGRADEDSURVEY">Ungraded Survey</option>
                  </Form.Select>
                </Form.Group>

                <Form.Group as={Col} md={8}>
                  <Form.Label>Assignment Group</Form.Label>
                  <Form.Select 
                    name="assignmentGroup" 
                    value={quiz.assignmentGroup} 
                    onChange={handleChange}
                  >
                    <option value="ASSIGNMENTS">ASSIGNMENTS</option>
                    <option value="QUIZZES">QUIZZES</option>
                    <option value="EXAMS">EXAMS</option>
                    <option value="PROJECTS">PROJECTS</option>
                  </Form.Select>
                </Form.Group>
              </Row>

              <div className="border rounded p-3 mb-3">
                <h5>Options</h5>
                <Form.Group className="mb-2">
                  <Form.Check
                    type="checkbox"
                    id="shuffle-answers"
                    label="Shuffle Answers"
                    name="shufflesAns"
                    checked={quiz.shuffleAns}
                    onChange={handleChange}
                  />
                </Form.Group>

                <Form.Group className="mb-2 d-flex align-items-center">
                  <Form.Check
                    type="checkbox"
                    id="time-limit"
                    label="Time Limit"
                    name="timeLimitEnabled"
                    checked={quiz.timeLmt > 0}
                    onChange={(e) => setQuiz({...quiz, timeLmt: e.target.checked ? 20 : 0})}
                    className="me-2"
                  />
                  {quiz.timeLmt > 0 && (
                    <>
                      <Form.Control
                        type="number"
                        size="sm"
                        style={{width: "80px"}}
                        value={quiz.timeLmt}
                        name="timeLmt"
                        onChange={handleChange}
                        min="1"
                      />
                      <span className="ms-2">Minutes</span>
                    </>
                  )}
                </Form.Group>

                <Form.Group className="mb-2 d-flex align-items-center">
                  <Form.Check
                    type="checkbox"
                    id="multiple-attempts"
                    label="Allow Multiple Attempts"
                    name="multipleAttempts"
                    checked={quiz.multipleAttempts}
                    onChange={handleChange}
                  />
                  {quiz.multipleAttempts && (
                    <>
                      <Form.Control
                        className="ms-2"
                        type="number"
                        size="sm"
                        style={{width: "80px"}}
                        defaultValue={quiz.maxAttempts}
                        name="maxAttempts"
                        onChange={(e) => setQuiz({...quiz, maxAttempts: parseInt(e.target.value)>1? parseInt(e.target.value) : 1})}
                      />
                      <span className="ms-2">times</span>
                    </>
                  )}
                </Form.Group>

                <Form.Group className="mb-2">
                  <Form.Check
                    type="checkbox"
                    id="one-question"
                    label="One Question at a Time"
                    name="oneQaTime"
                    checked={quiz.oneQaTime}
                    onChange={handleChange}
                  />
                </Form.Group>

                <Form.Group className="mb-2">
                  <Form.Check
                    type="checkbox"
                    id="webcam"
                    label="Webcam Required"
                    name="webcam"
                    checked={quiz.webcam}
                    onChange={handleChange}
                  />
                </Form.Group>

                <Form.Group className="mb-2">
                  <Form.Check
                    type="checkbox"
                    id="lock-questions"
                    label="Lock Questions After Answering"
                    name="lockQafterA"
                    checked={quiz.lockQafterA}
                    onChange={handleChange}
                  />
                </Form.Group>
              </div>

              <div className="border rounded p-3 mb-3">
                <h5>Assign</h5>

                <div className="mb-3">
                  <h6>Due</h6>
                  <Form.Control
                    type="date"
                    name="due"
                    value={quiz.due}
                    onChange={handleChange}
                  />
                </div>

                <Row className="mb-3">
                  <Col md={6}>
                    <h6>Available from</h6>
                    <div className="d-flex align-items-center">
                      <Form.Control
                        type="date"
                        name="availableFrom"
                        value={quiz.availableFrom}
                        onChange={handleChange}
                      />
                    </div>
                  </Col>
                  <Col md={6}>
                    <h6>Until</h6>
                    <div className="d-flex align-items-center">
                      <Form.Control
                        type="date"
                        name="until"
                        value={quiz.until}
                        onChange={handleChange}
                      />
                    </div>
                  </Col>
                </Row>
              </div>

              <div className="d-flex justify-content-end border-top pt-3">
                <Button 
                  variant="outline-secondary" 
                  className="me-2"
                  onClick={handleCancel}
                  type="button"
                >
                  Cancel
                </Button>
                <Button 
                  variant="danger" 
                  onClick={() => handleSave(false)}
                  type="button"
                >
                  Save
                </Button>
              </div>
            </Form>
          </Tab.Pane>
        </Tab.Content>
      </Tab.Container>
    </div>
  );
}