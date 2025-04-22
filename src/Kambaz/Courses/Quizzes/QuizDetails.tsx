import { useEffect, useState } from "react";
import { CiEdit } from "react-icons/ci";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { Button } from "react-bootstrap";
import * as quizClient from "./client.ts";

export default function QuizDetails()
{
  const { cid, qid } = useParams();
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const [quiz, setQuiz] = useState({
    _id: 0,
    title: "sdfsdds",
    type: "",
    description: "",
    course: "",
    questions: "",
    published: false,
    due: "",
    for:"",
    availableFrom: "",
    until: "",
    points:0,
    assignmentGroup:"QUIZZES",
    shufflesAns: true,
    timeLmt: 30,
    multipleAttempts: false,
    viewResponses: true,
    showCorrectAnswers: "",
    oneQaTime:true,
    lockdownBrowser: false,
    viewResults: false,
    webcam: false,
    lockQafterA:false,
    maxAttempts: 1,
  });
  
  const getQuiz = async () => {
    const quiz = await quizClient.findQuizById(cid, qid);
    setQuiz(quiz);
  }

  useEffect(() => {
    getQuiz();
  }, []);

  return (
    <div className="wd-quiz-details">
      <h2 className="text-danger">
        Quiz Details
      </h2>
      {currentUser.role === "STUDENT" && (
        <div className="wd-quiz-details-actions d-flex justify-content-center">
          <Link to={`/Kambaz/Courses/${cid}/Quizzes/${qid}/attempt`}>
            <Button variant="primary" className="wd-btn-primary">
              Attempt Quiz
            </Button>
          </Link>
        </div>
      )}
      {
        currentUser.role === "FACULTY" && (
          <div className="wd-quiz-details-actions d-flex justify-content-center flex-row"> 
            <div className="wd-quiz-details-preview me-2">
              <Link to={`/Kambaz/Courses/${cid}/Quizzes/${qid}/preview`}>
                <Button variant="secondary" className="wd-btn-primary">
                  Preview Quiz
                </Button>
              </Link>
            </div>
            <div className="wd-quiz-details-edit">
              <Link to={`/Kambaz/Courses/${cid}/Quizzes/${qid}/edit`}>
                <Button variant="secondary" className="wd-btn-primary">
                  Edit Quiz
                  <CiEdit className="ms-2" />
                </Button>
              </Link>
            </div>
          </div>
        )
      }
      <hr />
      <div>
        <h1 className="mb-5">{quiz.title}</h1>
        <div id="wd-details" className="ms-5 mt-3 mb-5 w-50">
          <div className="row mt-2">
            <div className="col-9">
              <b>Quiz Type</b>
            </div>
            <div className="col-3">
              { (quiz.type === "GRADEDQUIZ" && "Graded Quiz")
                || (quiz.type === "PRACTICEQUIZ" && "Practice Quiz") 
                || (quiz.type === "GRADEDSURVEY" && "Graded Survey") 
                || (quiz.type === "UNGRADEDSURVEY" && "Ungraded Survey")
              }
            </div>
          </div>

          <div className="row mt-2">
            <div className="col-9">
              <b>Points </b>
            </div>
            <div className="col-3">
              {quiz.points}
            </div>
          </div>

          <div className="row mt-2">
            <div className="col-9">
              <b>Assignment Group </b>
            </div>
            <div className="col-3">
              {quiz.assignmentGroup}
            </div>
          </div>

          <div className="row mt-2">
            <div className="col-9">
              <b>Shuffle answers </b>
            </div>
            <div className="col-3">
              {quiz.shufflesAns}
            </div>
          </div>

          <div className="row mt-2">
            <div className="col-9">
              <b>Time Limit </b>
            </div>
            <div className="col-3">
              {quiz.timeLmt}
            </div>
          </div>

          <div className="row mt-2">
            <div className="col-9">
              <b>Multiple Attempts </b>
            </div>
            <div className="col-3">
              {quiz.multipleAttempts}
            </div>
          </div>

          <div className="row mt-2">
            <div className="col-9">
              <b>Max Attempts </b>
            </div>
            <div className="col-3">
              {quiz.maxAttempts}
            </div>
          </div>

          <div className="row mt-2">
            <div className="col-9">
              <b>View Responses </b>
            </div>
            <div className="col-3">
              {quiz.viewResponses}
            </div>
          </div>

          <div className="row mt-2">
            <div className="col-9">
              <b>Show Correct Answers </b>
            </div>
            <div className="col-3">
              {quiz.showCorrectAnswers}
            </div>
          </div>

          <div className="row mt-2">
            <div className="col-9">
              <b>One Question at a Time </b>
            </div>
            <div className="col-3">
              {quiz.oneQaTime}
            </div>
          </div>

          <div className="row mt-2">
            <div className="col-9 text-wrap">
              <b>Require Respondus LockDown Browser  </b>
            </div>
            <div className="col-3">
              {quiz.lockdownBrowser}
            </div>
          </div>

          <div className="row mt-2">
            <div className="col-9">
              <b>Required to View Quiz Results </b>
            </div>
            <div className="col-3">
              {quiz.viewResults}
            </div>
          </div>

          <div className="row mt-2">
            <div className="col-9">
              <b>Webcam Required </b>
            </div>
            <div className="col-3">
              {quiz.webcam}
            </div>
          </div>

          <div className="row mt-2">
            <div className="col-9">
              <b>Lock Questions After Answering </b>
            </div>
            <div className="col-3">
              {quiz.lockQafterA}
            </div>
          </div>
        </div>
        <div className="wd-footer-details">
          <hr/>
          <div className="row">
            <div className="col-3">
              <b>Due</b>
            </div>
            <div className="col-3">
              <b>For</b>
            </div>
            <div className="col-3">
              <b>Available from</b>
            </div>
            <div className="col-3">
              <b>Until</b>
            </div>
          </div>

          <div className="row">
            <div className="col-3">
              {quiz.due}
            </div>
            <div className="col-3">
              {quiz.for}
            </div>
            <div className="col-3">
              {quiz.availableFrom}
            </div>
            <div className="col-3">
              {quiz.until}
            </div>
          </div>
          <hr/>

        </div>
      </div>
    </div>
  );
}