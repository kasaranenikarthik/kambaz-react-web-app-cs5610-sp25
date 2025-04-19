import { useEffect } from "react";
import { CiEdit } from "react-icons/ci";
import { useNavigate, useParams } from "react-router";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { Button } from "react-bootstrap";

export default function QuizDetails()
{
  const { cid, qid } = useParams();
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  return (
        <div className="wd-quiz-details">
            <h2 className="text-danger">
                Quiz Details
            </h2>
            {currentUser.role === "STUDENT" && (
                <div className="wd-quiz-details-actions d-flex justify-content-center">
                    <Link to={`/courses/${cid}/quizzes/${qid}/attempt`}>
                        <Button variant="primary" className="wd-btn-primary">
                            Attempt Quiz
                        </Button>
                    </Link>
                </div>
            )}
            {
                currentUser.role === "FACULTY" && (
                    <div className="wd-quiz-details-actions d-flex justify-content-center">
                        <Link to={`/courses/${cid}/quizzes/${qid}/edit`}>
                            <Button variant="primary" className="wd-btn-primary">
                                Edit Quiz
                                <CiEdit className="ms-2" />
                            </Button>
                        </Link>
                    </div>
                )
            }
        </div>
    );
}