import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { Card, Button, Alert, Container, Spinner } from "react-bootstrap";
import * as quizClient from "./client";
import { FaArrowLeft } from "react-icons/fa";

// Define interfaces
interface Question {
  _id: string;
  quiz: string;
  question: string;
  answer?: string;
  type: string;
  correctAnswer?: string | boolean;
  points: number;
  options?: any[];
  isEditing?: boolean;
}

interface Answer {
  [key: string]: string | number | boolean | undefined;
}

interface Attempt {
  _id: string;
  userId: string;
  quizId: string;
  courseId: string;
  attemptNo: number;
  startTime: Date | string;
  endTime?: Date | string;
  completed: boolean;
  score?: number;
  percentage?: number;
  letterGrade?: string;
  answers: Answer[];
  __v?: number;
}

interface Quiz {
  _id: string | number;
  title: string;
  [key: string]: any;
}

export default function QuizResults() {
  const { cid, qid } = useParams();
  const [quiz, setQuiz] = useState<Quiz | null>(null);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [attempt, setAttempt] = useState<Attempt | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  
  // Fetch quiz details, questions, and attempt
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        
        if (!cid || !qid) return;
        
        // Fetch quiz details
        const quizDetails = await quizClient.findQuizById(cid, qid);
        setQuiz(quizDetails);
        
        // Fetch quiz questions
        const quizQuestions = await quizClient.getQuestionsForQuiz(cid, qid);
        //console.log("Questions:", quizQuestions);
        setQuestions(quizQuestions);
        
        // Get the attempt data
        const attempts = await quizClient.findQuizAttemptById(cid, qid, currentUser._id);
        if (attempts && attempts.length > 0) {
          // Clone the attempt data
          const attemptData = JSON.parse(JSON.stringify(attempts[0])) as Attempt;
          //console.log("Attempt data:", attemptData);
          
          // Calculate correct answers on the frontend
          if (quizQuestions.length > 0 && attemptData.answers) {
            
            // Recalculate the score
            const correctCount = attemptData.score || 0;
            const total = quizQuestions.length;
            const percentage = Math.round((correctCount / total) * 100);
            attemptData.percentage = percentage;
            attemptData.letterGrade = getLetterGrade(percentage);
          }
          setAttempt(attemptData);
        }
        setLoading(false);
      } catch (error: unknown) {
        console.error("Error:", error);
        setLoading(false);
      }
    };
    
    fetchData();
  }, [cid, qid]);
  
  // Get the correct answer for a question
  function getCorrectAnswer(question: Question): string | boolean {
    return question.correctAnswer || "";
  }
  
  // Get letter grade based on percentage
  function getLetterGrade(percentage: number): string {
    if (percentage >= 90) return 'A';
    if (percentage >= 80) return 'B';
    if (percentage >= 70) return 'C';
    if (percentage >= 60) return 'D';
    return 'F';
  }
  
  if (loading) {
    return (
      <Container className="text-center p-5">
        <Spinner animation="border" />
        <p>Loading quiz results...</p>
      </Container>
    );
  }
  
  if (error) {
    return (
      <Container>
        <Alert variant="danger">{error}</Alert>
        <Link to={`/Kambaz/Courses/${cid}/Quizzes`}>
          <Button variant="secondary">Back to Quizzes</Button>
        </Link>
      </Container>
    );
  }
  
  if (!quiz || !attempt || !questions.length) {
    return (
      <Container>
        <Alert variant="warning">No quiz results available</Alert>
        <Link to={`/Kambaz/Courses/${cid}/Quizzes`}>
          <Button variant="secondary">Back to Quizzes</Button>
        </Link>
      </Container>
    );
  }
  
  return (
    <Container className="mt-4">
      <div className="mb-3">
        <Link to={`/Kambaz/Courses/${cid}/Quizzes`}>
          <Button variant="outline-secondary" size="sm">
            <FaArrowLeft className="me-1" /> Back to Quizzes
          </Button>
        </Link>
      </div>
      
      <Card>
        <Card.Header className="bg-light">
          <h3>{quiz.title} - Results</h3>
          <div className="text-muted">Attempt #{attempt.attemptNo || 0}</div>
        </Card.Header>
        
        <Card.Body>
          <Alert variant={(attempt.percentage || 0) >= 70 ? "success" : "danger"}>
            <h4>
              Your Score: {attempt.score}/{questions.length} ({attempt.percentage}%)
              <span className="ms-2 badge bg-secondary">
                {attempt.letterGrade}
              </span>
            </h4>
          </Alert>
          
          
          { quiz.showCorrectAnswers ? 
            <h5 className="mt-4">Question Results:</h5> : <h5>Showing Correct Answers is disabled</h5>
          }
          {quiz.showCorrectAnswers && questions.map((question, index) => {
            const answerObj = attempt.answers.find(a => a.questionId === question._id);
            const userAnswer = answerObj ? answerObj.answer : "Not answered";
            const isCorrect = answerObj?.result === "correct" ? true : false;
            const correctAnswer = getCorrectAnswer(question);
            
            return (
              <Card key={question._id} className="mb-3">
                <Card.Header className={isCorrect ? "bg-success text-white" : "bg-danger text-white"}>
                  Question {index + 1}: {isCorrect ? "Correct" : "Incorrect"}
                </Card.Header>
                <Card.Body>
                  <p><strong>Question:</strong> {question.question}</p>
                  <hr />
                  <p><strong>Your answer:</strong> {String(userAnswer)}</p>
                  <p><strong>Correct answer:</strong> {String(correctAnswer)}</p>
                </Card.Body>
              </Card>
            );
          })}
          
          <Link to={`/Kambaz/Courses/${cid}/Quizzes`}>
            <Button variant="secondary" className="mt-3">
              Back to Quizzes
            </Button>
          </Link>
        </Card.Body>
      </Card>
    </Container>
  );
}