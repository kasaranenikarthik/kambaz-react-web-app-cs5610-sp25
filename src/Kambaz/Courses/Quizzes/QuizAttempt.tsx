import { useSelector } from "react-redux";
import { useParams } from "react-router";


export default function QuizAttempt() {
    const { cid, qid, attemptId } = useParams();
    const { currentUser } = useSelector((state: any) => state.accountReducer);
    return(
        <div className="wd-quiz-attempt">
            <h2 className="text-danger">Quiz Attempt</h2>
            <p>Attempting quiz... <br/>{`${cid} - ${qid} - ${attemptId}`}</p>
            <p>{currentUser.firstName} - {currentUser.role} - {currentUser.lastName}</p>
        </div>
    );
}