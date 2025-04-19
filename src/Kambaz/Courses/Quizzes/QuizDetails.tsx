import { useEffect } from "react";
import { CiEdit } from "react-icons/ci";
import { useNavigate, useParams } from "react-router";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

export default function QuizDetails()
{
  const { cid, qid } = useParams();
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  return (
    <div className="wd-quiz-details">
        <h2 className="text-danger">
            Quiz Details
        </h2>
    </div>
    );
}