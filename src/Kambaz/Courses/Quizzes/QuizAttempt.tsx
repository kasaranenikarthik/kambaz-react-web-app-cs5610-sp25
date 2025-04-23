import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { Card, Button, Form, Alert, Container, ProgressBar, Badge, Spinner } from "react-bootstrap";
import * as quizClient from "./client";
import { FaArrowLeft } from "react-icons/fa";

interface QuizQuestion {
  _id: string;
  quiz: string;
  question: string;
  type: string;
  options?: Array<{text: string;} | string>; // Updated to support both formats
  correctAnswer?: string | boolean;
  points: number;
}

interface Quiz {
  _id: string;
  title: string;
  course: string;
  published: boolean;
  oneQaTime: boolean;
  multipleAttempts: boolean;
  maxAttempts: number;
  points: number;
  timeLmt: number;
}

interface UserAnswers {
  [key: string]: string | boolean;
}

export default function QuizAttempt() {
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const { cid, qid, attemptId } = useParams();
  const navigate = useNavigate();
  
  const [quiz, setQuiz] = useState<Quiz | null>(null);
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [attempt, setAttempt] = useState({
    _id: attemptId,
    attemptNo: 0,
    completed: false,
    score: 0,
    percentage: 0,
    letterGrade: "",
    answers: [],
    quiz: qid,
    course: cid,
    student: currentUser._id
  } as any);
  const [userAnswers, setUserAnswers] = useState<UserAnswers>({});
  const [submitted, setSubmitted] = useState(false);
  const [results, setResults] = useState<{[key: string]: string}>({});
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [timeLeft, setTimeLeft] = useState<number | null>(null);
  const [creatingAttempt, setCreatingAttempt] = useState(false);
  
  // Redirect if not a student
  useEffect(() => {
    if (currentUser?.role !== "STUDENT") {
      navigate(`/Kambaz/Courses/${cid}/Quizzes/${qid}/details`);
    }
  }, [currentUser, cid, qid, navigate]);
  
  // Setup timer if quiz has time limit
  useEffect(() => {
    if (quiz?.timeLmt && quiz.timeLmt > 0 && !submitted) {
      const timerMinutes = quiz.timeLmt;
      setTimeLeft(timerMinutes * 60); // Convert to seconds
      
      const timer = setInterval(() => {
        setTimeLeft((prevTime) => {
          if (prevTime === null || prevTime <= 0) {
            clearInterval(timer);
            // Auto-submit when time is up
            if (!submitted && attempt) {
              handleSubmitQuiz();
            }
            return 0;
          }
          return prevTime - 1;
        });
      }, 1000);
      
      return () => clearInterval(timer);
    }
  }, [quiz, attempt, submitted]);
  
  // Format time display
  const formatTime = (seconds: number | null) => {
    if (seconds === null) return "--:--";
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };
  
  // Fetch quiz details and questions
  useEffect(() => {
    const fetchQuizData = async () => {
      try {
        setLoading(true);
        setError(null);
        
        if (!cid || !qid) {
          setError("Missing course or quiz ID");
          setLoading(false);
          return;
        }
        
        // Fetch quiz details
        const quizDetails = await quizClient.findQuizById(cid, qid);
        setQuiz(quizDetails);
        
        // Check if the quiz is published
        if (!quizDetails.published) {
          setError("This quiz is not available for attempt.");
          setLoading(false);
          return;
        }
        
        // Fetch quiz questions
        const quizQuestions = await quizClient.getQuestionsForQuiz(cid, qid);
        console.log("Fetched questions:", quizQuestions);
        setQuestions(quizQuestions);
        
        // Create a new attempt
        try {
          setCreatingAttempt(true);
          const attempts = await quizClient.findQuizAttemptById(cid, qid, currentUser._id);
          //console.log("Fetched attempt:", newAttempt);
          const newAttempt = attempts[0];
          setAttempt({...newAttempt, attemptNo: newAttempt.attemptNo + 1});
          //console.log("Attempt after creation:", newAttempt);
          setCreatingAttempt(false);
          
          // Initialize empty answers
          const initialAnswers: UserAnswers = {};
          quizQuestions.forEach((q: QuizQuestion) => {
            initialAnswers[q._id] = "";
          });
          setUserAnswers(initialAnswers);
          
        } catch (err) {
          console.error("Error creating attempt:", err);
          setError("Failed to create quiz attempt. Please try again.");
          setCreatingAttempt(false);
        }
        
        setLoading(false);
      } catch (err: any) {
        console.error("Error fetching quiz data:", err);
        setError(err.message || "An error occurred while loading the quiz.");
        setLoading(false);
      }
    };
    
    fetchQuizData();
  }, [cid, qid, navigate]);
  
  // Handle answer changes
  const handleAnswerChange = async (questionId: string, answer: string) => {
    // Update local state
    setUserAnswers((prev) => ({
      ...prev,
      [questionId]: answer,
    }));
    
    // Save to the server if we have an attempt
    //if (attempt && !submitted) {
    //  try {
    //    await quizClient.saveAnswer(attempt._id, questionId, answer);
    //  } catch (err) {
    //    console.error("Error saving answer:", err);
    //  }
    //}
  };
  
  // Navigate between questions (for one-question-at-a-time mode)
  const goToNextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };
  
  const goToPrevQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };
  
  // Submit the quiz and calculate results
  const handleSubmitQuiz = async () => {
    if (!attempt || !cid || !qid) return;
    
    //console.log("Final Answers:", userAnswers);
    try {
    //  const submittedAttempt = await quizClient.submitAttempt(cid, qid, attempt._id);
    //  
    //  setAttempt(submittedAttempt);
      
      // Set results for display
      const questionResults: {[key: string]: string} = {};

      //console.log("Questions:", questions);

      questions.forEach((question) => {
        const cAns = question.correctAnswer;
        const userAnswer = userAnswers[question._id];
        if (cAns === userAnswer) {
          questionResults[question._id] = "correct";
        } else {
          questionResults[question._id] = "incorrect";
        }
      });
      
      setResults(questionResults);

      const questionsValidated = {
        answers: questions.map((question) => {
          return {
            questionId: question._id,
            answer: userAnswers[question._id],
            result: questionResults[question._id],
            points: questionResults[question._id] === "correct" ? question.points : 0,
          }
        })
      }

      //console.log("Questions validated:", questionsValidated);

      // Calculate score and percentage
      const totalPointsScored = questions.filter((q) => questionResults[q._id] === "correct").reduce((acc, q) => acc + q.points, 0);

      const q = {
        ...attempt,
        "answers": questionsValidated.answers,
        "completed": true,
        "score": totalPointsScored,
        "percentage": (totalPointsScored / questions.reduce((acc, q) => acc + q.points, 0)) * 100
      }
      
      setAttempt(q);

      //console.log("Attempt after submission:", q);

      await quizClient.updateAttempt(cid, qid, attemptId, q);

      //alert(JSON.stringify(attempt, null, 2));
      setSubmitted(true);

      //setSubmitted(true);
    } catch (err: any) {
      console.error("Error submitting quiz:", err);
      setError(err.message || "An error occurred while submitting the quiz.");
    }
  };
  
  // Helper function to format options for multiple choice questions
  const getFormattedOptions = (question: QuizQuestion) => {
    if (!question.options) return [];
    
    // Handle both formats: array of strings or array of objects
    return question.options.map((option) => {
      if (typeof option === 'string') {
        return { text: option };
      }
      return option;
    });
  };
  
  if (loading || creatingAttempt) {
    return (
      <Container className="text-center p-5">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading quiz...</span>
        </Spinner>
        <p className="mt-3">Please wait while we prepare your quiz...</p>
      </Container>
    );
  }
  
  if (error) {
    return (
      <Container className="mt-4">
        <Alert variant="danger">{error}</Alert>
        <Link to={`/Kambaz/Courses/${cid}/Quizzes`}>
          <Button variant="secondary">Back to Quizzes</Button>
        </Link>
      </Container>
    );
  }
  
  if (!quiz || !attempt) {
    return (
      <Container className="mt-4">
        <Alert variant="danger">Quiz not found or not available</Alert>
        <Link to={`/Kambaz/Courses/${cid}/Quizzes`}>
          <Button variant="secondary">Back to Quizzes</Button>
        </Link>
      </Container>
    );
  }
  
  // Display for results screen after submission
  if (submitted && attempt.completed) {
    return (
      <Container className="mt-4">
        <div className="mb-3">
          <Link to={`/Kambaz/Courses/${cid}/Quizzes`} className="text-decoration-none">
            <Button variant="outline-secondary" size="sm">
              <FaArrowLeft className="me-1" /> Back to Quizzes
            </Button>
          </Link>
        </div>
        
        <Card>
          <Card.Header className="bg-light">
            <h3>{quiz.title} - Results</h3>
            <div className="text-muted">Attempt #{attempt.attemptNo}</div>
          </Card.Header>
          
          <Card.Body>
            <Alert variant={attempt.percentage && attempt.percentage >= 70 ? "success" : "danger"}>
              <h4>
                Your Score: {attempt.score}/{questions.length} ({attempt.percentage}%)
                <Badge bg="secondary" className="ms-2">
                  {attempt.letterGrade}
                </Badge>
              </h4>
            </Alert>
            
            <div className="mb-4">
              <h5>Question Results:</h5>
              {questions.map((question, index) => {
                const userAnswer = userAnswers[question._id];
                const isCorrect = results[question._id] === "correct" ? true : false;
                
                return (
                  <Card key={question._id} className="mb-2">
                    <Card.Header className={isCorrect ? "bg-success text-white" : "bg-danger text-white"}>
                      Question {index + 1}: {isCorrect}
                    </Card.Header>
                    <Card.Body>
                      <p><strong>Question:</strong> {question.question}</p>
                      <hr />
                      <p>
                        <strong>Your answer:</strong> {String(userAnswer)}
                      </p>
                      <p>
                        <strong>Correct answer:</strong> {String(question.correctAnswer)}
                      </p>
                    </Card.Body>
                  </Card>
                );
              })}
            </div>
            
            <div className="d-flex justify-content-between">
              <Link to={`/Kambaz/Courses/${cid}/Quizzes`}>
                <Button variant="secondary">
                  Back to Quizzes
                </Button>
              </Link>
            </div>
          </Card.Body>
        </Card>
      </Container>
    );
  }
  
  // Single question view mode (if oneQaTime is enabled) 
  // default
  if (quiz.oneQaTime) {
    const currentQ = questions[currentQuestion] || null;
    
    if (!currentQ) {
      return (
        <Container className="mt-4">
          <Alert variant="danger">No questions found for this quiz</Alert>
          <Link to={`/Kambaz/Courses/${cid}/Quizzes`}>
            <Button variant="secondary">Back to Quizzes</Button>
          </Link>
        </Container>
      );
    }
    
    const formattedOptions = getFormattedOptions(currentQ);
    
    return (
      <Container className="mt-4">
        <div className="mb-3">
          <Link to={`/Kambaz/Courses/${cid}/Quizzes`} className="text-decoration-none">
            <Button variant="outline-secondary" size="sm">
              <FaArrowLeft className="me-1" /> Back to Quizzes
            </Button>
          </Link>
        </div>
        
        <Card>
          <Card.Header className="bg-light d-flex justify-content-between align-items-center">
            <div>
              <h3>{quiz.title}</h3>
              <div className="text-muted">Attempt #{attempt.attemptNo}</div>
            </div>
            {quiz.timeLmt > 0 && (
              <div className="timer-display">
                <h4>Time Left: {formatTime(timeLeft)}</h4>
              </div>
            )}
          </Card.Header>
          
          <Card.Body>
            <div className="mb-3">
              <ProgressBar 
                now={((currentQuestion + 1) / questions.length) * 100} 
                label={`${currentQuestion + 1}/${questions.length}`} 
                variant="primary"
              />
            </div>
            
            <Card className="mb-4">
              <Card.Header>
                Question {currentQuestion + 1} <span className="float-end">1 pt</span>
              </Card.Header>
              <Card.Body>
                <p>{currentQ.question}</p>
                
                {currentQ.type === "TRUE_FALSE" ? (
                  <Form>
                    <Form.Check 
                      type="radio"
                      id="true-answer"
                      label="True"
                      checked={userAnswers[currentQ._id] === "True"}
                      onChange={() => handleAnswerChange(currentQ._id, "True")}
                      className="mb-2"
                    />
                    <Form.Check 
                      type="radio"
                      id="false-answer"
                      label="False"
                      checked={userAnswers[currentQ._id] === "False"}
                      onChange={() => handleAnswerChange(currentQ._id, "False")}
                    />
                  </Form>
                ) : currentQ.type === "MULTIPLE_CHOICE" ? (
                  <Form>
                    {formattedOptions.map((option, optIndex) => (
                      <Form.Check 
                        key={optIndex}
                        type="radio"
                        id={`option-${optIndex}`}
                        label={option.text}
                        checked={userAnswers[currentQ._id] === option.text}
                        onChange={() => handleAnswerChange(currentQ._id, option.text)}
                        className="mb-2"
                      />
                    ))}
                  </Form>
                ) : (
                  <Form.Control
                    type="text"
                    placeholder="Type your answer here"
                    value={userAnswers[currentQ._id] as string || ""}
                    onChange={(e) => handleAnswerChange(currentQ._id, e.target.value)}
                  />
                )}
              </Card.Body>
            </Card>
            
            <div className="d-flex justify-content-between">
              <Button 
                variant="outline-secondary" 
                onClick={goToPrevQuestion}
                disabled={currentQuestion === 0}
              >
                Previous
              </Button>
              
              {currentQuestion < questions.length - 1 ? (
                <Button 
                  variant="outline-primary" 
                  onClick={goToNextQuestion}
                >
                  Next
                </Button>
              ) : (
                <Button 
                  variant="danger" 
                  onClick={handleSubmitQuiz}
                >
                  Submit Quiz
                </Button>
              )}
            </div>
          </Card.Body>
        </Card>
      </Container>
    );
  }
}