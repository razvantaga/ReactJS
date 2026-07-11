import { useState, useCallback, useEffect } from "react";
import QUESTIONS from "../questions.js";
import QuestionTimer from "./QuestionTimer.jsx";
import quizImg from "../assets/quiz-complete.png";
import Answers from "./Answers.jsx";

export default function Quiz() {
    const [answerState, setAnswerState] = useState('');
    const [selectedAnswer, setSelectedAnswer] = useState(null);
    const [userAnswers, setUserAnswers] = useState([]);
    const [shuffledAnswers, setShuffledAnswers] = useState([]);
    const [score, setScore] = useState({ correct: 0, wrong: 0, skipped: 0 });
    const [completedQuizzes, setCompletedQuizzes] = useState([]);

    const activeQuestionIndex = answerState === '' ? userAnswers.length : userAnswers.length - 1;
    const quizIsComplete = activeQuestionIndex === QUESTIONS.length;

    useEffect(() => {
        if (activeQuestionIndex < QUESTIONS.length) {
            setShuffledAnswers([...QUESTIONS[activeQuestionIndex].answers].sort(() => Math.random() - 0.5));
        }
    }, [activeQuestionIndex]);

    const handleSelectAnswer = useCallback((selected) => {
        setSelectedAnswer(selected);
        setAnswerState('answer');
        setUserAnswers((prev) => [...prev, selected]);
    }, []);

    const handleCheckAnswer = useCallback(() => {
        const correctAnswer = QUESTIONS[activeQuestionIndex].answers[0];

        if (selectedAnswer === null) {
            setScore((prev) => ({ ...prev, skipped: prev.skipped + 1 }));
            setAnswerState('wrong');
        } else if (selectedAnswer === correctAnswer) {
            setScore((prev) => ({ ...prev, correct: prev.correct + 1 }));
            setAnswerState('correct');
        } else {
            setScore((prev) => ({ ...prev, wrong: prev.wrong + 1 }));
            setAnswerState('wrong');
        }

        setTimeout(() => {
            setAnswerState('');
            setSelectedAnswer(null);
        }, 2000);
    }, [activeQuestionIndex, selectedAnswer]);

    const handleSkipAnswer = useCallback(() => handleSelectAnswer(null), [handleSelectAnswer]);

    useEffect(() => {
        if (quizIsComplete) {
            setCompletedQuizzes((prev) => [...prev, score]);
        }
    }, [quizIsComplete, score]);

    if (quizIsComplete) {
        return (
            <div id="summary">
                <img src={quizImg} alt="logo" />
                <h2>Quiz complete!</h2>
                <div className="flex flex-row justify-evenly mt-8">
                    <p className="flex flex-col-reverse uppercase text-stone-700">Correct <span className="text-3xl font-bold">{score.correct} / {QUESTIONS.length}</span></p>
                    <p className="flex flex-col-reverse uppercase text-stone-700">Wrong <span className="text-3xl font-bold"> {score.wrong} / {QUESTIONS.length}</span></p>
                    <p className="flex flex-col-reverse uppercase text-stone-700">Skipped <span className="text-3xl font-bold"> {score.skipped} / {QUESTIONS.length}</span></p>
                </div>
            </div>
        );
    }

    const timerConfig = answerState === ''
        ? { timeout: 10000, onTimeout: handleSkipAnswer, mode: 'normal' }
        : answerState === 'answer'
            ? { timeout: 1000, onTimeout: handleCheckAnswer, mode: 'checking' }
            : { timeout: 0, onTimeout: () => { }, mode: 'idle' };

    return (
        <div id="quiz">
            <div id="question">
                <QuestionTimer
                    key={`timer-${activeQuestionIndex}-${answerState}`}
                    timeout={timerConfig.timeout}
                    onTimeout={timerConfig.onTimeout}
                    mode={timerConfig.mode}
                />
                <h2>{QUESTIONS[activeQuestionIndex].text}</h2>
                <Answers
                    key={`answers-${activeQuestionIndex}`}
                    answers={shuffledAnswers}
                    answerState={answerState}
                    onSelectAnswer={selectedAnswer}
                    onSelect={handleSelectAnswer}
                />
            </div>
        </div>
    );
}