import { use, useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Score = ({score, quizData, quizId, setIsFinished}) => {
    const [correctAnswers, setCorrectAnswers] = useState({});
    const [userAnswers, setUserAnswers] = useState({});
    const [wrongAnswer, setWrongAnswer] = useState([]);

    // get the day streak of the current quiz
    const [currentStreak, setCurrentStreak] = useState(0);
    useEffect(() => {
        const currentStreak = Number(localStorage.getItem(`quiz_${quizId}_dayStreak`));
        setCurrentStreak(currentStreak);
    }, []);
    // initialize correctAnswers and userAnswers from the quizpage compopnent
    useEffect(() => {
        if (!quizData?.questions) return;
        
        const correct = {};
        quizData.questions.forEach((item, i) => {
            correct[i + 1] = item.answer;
        });
        setCorrectAnswers(correct);
        setUserAnswers(score.answers || {});
    }, [quizData, score]);

    useEffect(() => {
        if (!Object.keys(correctAnswers).length || !Object.keys(userAnswers).length) return;

        const wrong = [];
        for (const [key, value] of Object.entries(userAnswers)) {
            if (correctAnswers[key] !== value) {
                wrong.push({
                    questionNum: key,
                    correctAns: correctAnswers[key],
                    userAns: value
                });
            }
        }
        setWrongAnswer(wrong);
    }, [correctAnswers, userAnswers]);

    // Calculate scores
    const totalQuestions = Object.keys(correctAnswers).length;
    const correctCount = totalQuestions - wrongAnswer.length;
    const scorePercent = totalQuestions ? Math.round((correctCount / totalQuestions) * 100) : 0;

    const clearPersist = () => {
        try {
            localStorage.removeItem(`quiz_${quizId}_isFinished`);
            setIsFinished(false);
        } catch {}
    };

    return (
        <div className="*:rounded-3xl w-full md:w-4/5 flex flex-col md:grid md:grid-cols-4 md:grid-rows-7 h-max gap-4">
            <section className="shadow-lg w-full md:col-span-4 md:row-span-1 p-4 flex flex-col justify-center bg-white">
                <h1 className="text-2xl font-bold text-gray-700">Quiz Results</h1>
                <small className="text-gray-700"><b>{score.quizId}</b> • {score.title}</small>
            </section>
            <section className="shadow-lg w-full bg-white text-gray-700 md:col-span-4 md:row-span-3 p-4 flex flex-col items-center justify-center py-10 gap-5">
                <h1 className="text-3xl font-bold">{score.quizId}</h1>
                <span className="flex items-center justify-center size-40 rounded-full bg-[#d6ffec60]">
                   <i className="fa-solid fa-trophy text-7xl"></i> 
                </span>
                <p className="font-bold">Your Score</p>
                <h1 className="relative text-6xl font-bold">{scorePercent}
                    <sup className="absolute p-4 text-[15px] rounded-xl bg-amber-200 translate-x-2">{scorePercent}%</sup>
                </h1>
                <p className="font-bold">{correctCount} out of {totalQuestions} questions</p>
            </section>
            <section className="shadow-lg w-full md:col-span-2 md:col-start-1 md:row-span-1 flex flex-col gap-3 p-5 bg-white">
                <div className="flex items-center justify-between">
                    <span className="size-12 flex justify-center items-center bg-[#caf3d5] rounded-2xl"><i className="text-2xl text-[#038024] fa-solid fa-circle-check"></i></span>
                    <h1 className="text-2xl font-bold text-[#038024]">{correctCount}</h1>
                </div>
                <p className="text-gray-700">Correct Answers</p>
            </section>
            <section className="shadow-lg w-full md:col-span-2 md:col-start-3 md:row-span-1 flex flex-col gap-3 p-5 bg-white">
                <div className="flex items-center justify-between">
                    <span className="size-12 flex justify-center items-center bg-[#ffc0c0] rounded-2xl"><i className="text-2xl text-[#ff0000] fa-solid fa-times"></i></span>
                    <h1 className="text-2xl font-bold text-[#ff0000]">{wrongAnswer.length}</h1>
                </div>
                <p className="text-gray-700">Incorrect Answers</p>                
            </section>
            <section className="shadow-lg w-full md:col-span-2 md:col-start-1 md:row-span-1 flex flex-col gap-3 p-5 bg-white">
                <div className="flex items-center justify-between">
                    <span className="size-12 flex justify-center items-center bg-[#c2d0ff] rounded-2xl"><i className="text-2xl text-[#00249c] fa-regular fa-clock"></i></span>
                    <h1 className="text-2xl font-bold text-[#00249c]">{score.timeTaken}</h1>
                </div>
                <p className="text-gray-700">Time spent</p>                
            </section>
            <section className="shadow-lg w-full md:col-span-2 md:col-start-3 md:row-span-1 flex flex-col gap-3 p-5 bg-white">
                <div className="flex items-center justify-between">
                    <span className="size-12 flex justify-center items-center bg-[#dcb2ff] rounded-2xl"><i className="text-2xl text-[#8c00af] fa-solid fa-bolt"></i></span>
                    <h1 className="text-2xl font-bold text-[#8c00af]">{currentStreak}</h1>
                </div>
                <p className="text-gray-700">Day Streak</p>                
            </section>
            <section className="w-full mb-6 md:col-span-4 md:row-span-1 md:row-start-7 flex flex-col md:flex-row gap-3 justify-center ">
                <Link to="" className="rounded-2xl p-4 w-full h-max flex justify-center font-bold items-center text-white -bg-linear-45 from-[#9702db] to-[#7745ff]">Review Answers</Link>
                <Link to="/dashboard" onClick={clearPersist} className="border-1 border-gray-700 rounded-2xl p-4 w-full h-max flex items-center justify-center font-bold text-gray-700 hover:border-[#8c00af] hover:text-[#8c00af]">Take Another Quiz</Link>
                <Link to="" className="border-1 border-gray-700 rounded-2xl p-4 w-full h-max flex items-center justify-center font-bold text-gray-700 hover:border-[#8c00af] hover:text-[#8c00af]">Share Result</Link>
            </section>
        </div>
    );
}
 
export default Score;