
import { useEffect, useState } from "react";
import * as quizClient from "./client.ts";
import { useSelector } from "react-redux";

export default function QuizControlButtons({quiz}: {quiz: any; })
{
    const currentUser = useSelector((state: any) => state.accountReducer.currentUser);
    const [q, setQ] = useState([{}]);
    const  totalQuestions = async(quiz: any) => {
        setQ( await quizClient.getQuestionsForQuiz(quiz.course, quiz._id));
    }
    const [attempt, setAttempt] = useState({score:"-"});

    useEffect(() => {
        totalQuestions(quiz);
        lastAttempt(quiz);
    }
    , [quiz]);

    const Availability = () => {
        const currentDate = new Date();
        const availableFrom = new Date(quiz.availableFrom);
        const availableUntil = new Date(quiz.availableUntil);
        const dueDate = new Date(quiz.due);

        if (currentDate < availableFrom) {
            return <span>Not available until {quiz.availableFrom}</span>;
        } else if (currentDate > availableUntil || currentDate > dueDate) {
            return <span>Closed</span>;
        } else {
            return <span>Available</span>;
        }
    }

    const lastAttempt = async (quiz: any) => {
        const attempt = await quizClient.findQuizAttemptById(quiz.course, quiz._id, currentUser._id);
        if (attempt.length !== 0) {
            setAttempt(attempt[0]);
        } 
    }

    const lastScore = () => {
        return <span>{attempt.score}</span>;
    }

    return (
        <div>
            <span className="wd-assigment-info d-block mt-1 ps-5">
            {Availability()} | Due {quiz.due} | {quiz.points} pts | {q && q.length} Questions | Score { lastScore()} / {quiz.points} pts
            </span>
        </div> 
    );
}