import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { Card, Button, Form, Alert, Container, ProgressBar, Badge } from "react-bootstrap";
import * as quizClient from "./client";
import { FaArrowLeft } from "react-icons/fa";

interface QuizQuestion {
  _id: string;
  quiz: string;
  question: string;
  correctAnswer: string;
  type: string;
  points: number;
  options?: string[]; // For multiple choice questions
}

interface Quiz {
  _id: string;
  title: string;
  course: string;
  grade?: number;
  letterGrade?: string;
  published: boolean;
}

interface UserAnswers {
  [key: string]: string;
}

export default function QuizPreview() {
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const { cid, qid } = useParams();
  const navigate = useNavigate();
  
  const [quiz, setQuiz] = useState<Quiz | null>(null);
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [userAnswers, setUserAnswers] = useState<UserAnswers>({});
  const [submitted, setSubmitted] = useState(false);
  const [results, setResults] = useState<{[key: string]: boolean}>({});
  const [score, setScore] = useState({ correct: 0, total: 0, percentage: 0 });
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [loading, setLoading] = useState(true);
  
  // Redirect if not a faculty user
  useEffect(() => {
    if (currentUser.role !== "FACULTY") {
      navigate(`/Kambaz/Courses/${cid}`);
    }
  }, [currentUser, cid, navigate]);
  
  // Fetch quiz details and questions
  useEffect(() => {
    const fetchQuizData = async () => {
      try {
        setLoading(true);
        
        if (cid && qid) {
          const quizDetails = await quizClient.findQuizById(cid, qid);
          setQuiz(quizDetails);
          
          const quizQuestions = await quizClient.getQuestionsForQuiz(cid, qid);
          setQuestions(quizQuestions);
          
          // Initialize userAnswers object with empty values
          const initialAnswers: UserAnswers = {};
          quizQuestions.forEach((q: QuizQuestion) => {
            initialAnswers[q._id] = "";
          });
          setUserAnswers(initialAnswers);
        }
        setLoading(false);
      } catch (error) {
        console.error("Error fetching quiz data:", error);
        setLoading(false);
      }
    };
    
    fetchQuizData();
  }, [cid, qid]);
  
  // Handle answer changes
  const handleAnswerChange = (questionId: string, answer: string) => {
    setUserAnswers(prev => ({
      ...prev,
      [questionId]: answer
    }));
  };
  
  // Navigate between questions
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
  
  // Calculate score and set results
  const submitQuiz = () => {
    let correctCount = 0;
    let totalPoints = 0;
    const questionResults: {[key: string]: boolean} = {};
    
    questions.forEach(question => {
      const userAnswer = userAnswers[question._id];
      const isCorrect = String(userAnswer).toLowerCase() === question.correctAnswer.toLowerCase();
      
      if (isCorrect) {
        correctCount = correctCount + question.points;
      }
      totalPoints = totalPoints + question.points;
      
      questionResults[question._id] = isCorrect;
    });
    
    const percentage = Math.round((correctCount / totalPoints) * 100);
    
    setScore({
      correct: correctCount,
      total: questions.reduce((acc, q) => acc + q.points, 0),
      percentage
    });
    
    setResults(questionResults);
    setSubmitted(true);
  };
  
  // Reset quiz
  const resetQuiz = () => {
    const initialAnswers: UserAnswers = {};
    questions.forEach(q => {
      initialAnswers[q._id] = "";
    });
    
    setUserAnswers(initialAnswers);
    setSubmitted(false);
    setResults({});
    setScore({ correct: 0, total: 0, percentage: 0 });
    setCurrentQuestion(0);
  };
  
  // Go to edit quiz screen
  const goToEditQuiz = () => {
    navigate(`/Kambaz/Courses/${cid}/Quizzes/${qid}/edit`);
  };
  
  if (loading) {
    return <div className="text-center p-5">Loading quiz preview...</div>;
  }
  
  if (!quiz) {
    return <Alert variant="danger">Quiz not found</Alert>;
  }
  
  // Get letter grade based on percentage
  const getLetterGrade = (percentage: number) => {
    if (percentage >= 90) return 'A';
    if (percentage >= 80) return 'B';
    if (percentage >= 70) return 'C';
    if (percentage >= 60) return 'D';
    return 'F';
  };
  
  // Display for results screen after submission
  if (submitted) {
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
              <h3>{quiz.title} - Preview Results</h3>
              <div className="text-muted">Faculty Preview Mode</div>
            </div>
            <Button variant="primary" onClick={goToEditQuiz}>
              Edit Quiz
            </Button>
          </Card.Header>
          
          <Card.Body>
            <Alert variant={score.percentage >= 70 ? "success" : "danger"}>
              <h4>
                Your Score: {score.correct}/{score.total} ({score.percentage}%)
                <Badge bg="secondary" className="ms-2">
                  {getLetterGrade(score.percentage)}
                </Badge>
              </h4>
            </Alert>
            
            <div className="mb-4">
              <h5>Question Results:</h5>
              {questions.map((question, index) => (
                <Card key={question._id} className="mb-2">
                  <Card.Header className={results[question._id] ? "bg-success text-white" : "bg-danger text-white"}>
                    Question {index + 1}: {results[question._id] ? "Correct" : "Incorrect"}
                  </Card.Header>
                  <Card.Body>
                    <p><strong>Question:</strong> {question.question}</p>
                    <hr />
                    <p>
                      <strong>Your answer:</strong> {String(userAnswers[question._id])}
                    </p>
                    <p>
                      <strong>Correct answer:</strong> {question.correctAnswer}
                    </p>
                  </Card.Body>
                </Card>
              ))}
            </div>
            
            <div className="d-flex justify-content-between">
              <Button variant="secondary" onClick={resetQuiz}>
                Try Again
              </Button>
              <Button variant="primary" onClick={goToEditQuiz}>
                Edit Quiz
              </Button>
            </div>
          </Card.Body>
        </Card>
      </Container>
    );
  }
  

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


  // Current question for answering
  const currentQ = questions[currentQuestion] || null;

  const formattedOptions = getFormattedOptions(currentQ);
  
  // Quiz-taking view
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
            <h3>{quiz.title} - Preview</h3>
            <div className="text-muted">Faculty Preview Mode</div>
          </div>
          <Button variant="primary" onClick={goToEditQuiz}>
            Edit Quiz
          </Button>
        </Card.Header>
        
        <Card.Body>
          <Alert variant="info">
            This is a preview of the published version of the quiz
          </Alert>
          
          <div className="mb-3">
            <ProgressBar 
              now={((currentQuestion + 1) / questions.length) * 100} 
              label={`${currentQuestion + 1}/${questions.length}`} 
            />
          </div>
          
          {currentQ && (
            <Card className="mb-4">
              <Card.Header>
                Question {currentQuestion + 1} <span className="float-end">{currentQ.points} pt</span>
              </Card.Header>
              <Card.Body>
                <p>{currentQ.question}</p>
                
                {currentQ.type === "TRUE_FALSE" && (
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
                )} 
                { currentQ.type === "MULTIPLE_CHOICE" && (
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
                )} 
                { currentQ.type === "FILL_IN_BLANK" &&(
                  <Form.Control 
                    as="textarea" 
                    rows={3} 
                    value={userAnswers[currentQ._id]} 
                    onChange={(e) => handleAnswerChange(currentQ._id, e.target.value)} 
                    placeholder="Type your answer here..."
                  />
                )}
              </Card.Body>
            </Card>
          )}
          
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
                onClick={submitQuiz}
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