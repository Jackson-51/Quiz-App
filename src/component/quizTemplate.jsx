import { useEffect, useState } from "react";
import {motion} from "framer-motion";
import Circle from "./circle";

const Quiztemplate = ({ courseData, quizId, setIsFinished, setScore }) => {
  const [num, setNum] = useState(0);
  const Alps = ["A", "B", "C", "D", "E"];
  const [questionInfo, setQuestionInfo] = useState({
    duration: 0,
    questions: [],
  });
  const [timeLeft, setTimeLeft] = useState(null);
  const [optNum, setOptNum] = useState(null);
  const [answer, setAnswer] = useState({});

  useEffect(() => {
    if (courseData) {
      const duration = courseData.duration || 0;
      const questions = courseData.questions || [];
      setQuestionInfo({ duration, questions });
      setTimeLeft(duration > 0 ? duration * 60 : 0);
    }
  }, [courseData]);

  useEffect(() => {
    if (timeLeft === null) return;

    if (timeLeft === 0) {
      if (questionInfo.questions.length > 0) handleIsFinished();
      return;
    }

    const interval = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [timeLeft, questionInfo.questions.length]);

  const formatTime = (seconds) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hrs.toString().padStart(2, "0")}:${mins
      .toString()
      .padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };
  const timeSpent = () => {
    const spent = questionInfo.duration * 60 - timeLeft;
    const hours = Math.floor(spent / 3600);
    const minutes = Math.floor((spent % 3600) / 60);
    const seconds = spent % 60;

    let timeString = "";
    
    if (hours > 0) {
      timeString += `${hours}h `;
    }
    if (minutes > 0) {
      timeString += `${minutes}m `;
    }
    if (seconds > 0 || timeString === "") {
      timeString += `${seconds}s`;
    }
    
    return timeString.trim();
  };

  const handleQuestionChange = (type) => {
    let newNum = num;
    if (type === "+" && num < questionInfo.questions.length - 1) {
      newNum = num + 1;
    } else if (type === "-" && num > 0) {
      newNum = num - 1;
    }
    setNum(newNum);
    setOptNum(answer[newNum + 1] ?? null);
  };

  const handleOptionSelect = (optionIndex) => {
    setOptNum(optionIndex);
    setAnswer((prevAnswers) => ({
      ...prevAnswers,
      [num + 1]: optionIndex,
    }));
  };
  const handleIsFinished = () => {
    let scoreInfo = {};
    scoreInfo.quizId = quizId;
    scoreInfo.title = courseData.title;
    scoreInfo.answers = answer;
    scoreInfo.timeTaken = timeSpent();
    setScore(scoreInfo);
    console.log(answer)
    setIsFinished(true)
    const previousStreak = Number(localStorage.getItem(`quiz_${quizId}_dayStreak`));
    localStorage.setItem(`quiz_${quizId}_dayStreak`, previousStreak + 1);
    localStorage.setItem(`quiz_${quizId}_completed`, JSON.stringify(true));
  }
  return (
    <div className="flex flex-col gap-3 md:gap-3 items-start w-full h-full md:p-3">
      <h1 className="text-2xl font-semibold text-[#28402E] flex justify-center w-full">
        {quizId}
      </h1>

      <header className="w-full flex items-center justify-between text-[#3f3f3f]">
        <div className="flex items-center gap-3">
          <i className="fa-regular fa-clock text-2xl md:text-3xl"></i>
          <div className="flex flex-col">
            <small className="text-sm">Time remaining</small>
            <b className="text-base md:text-lg">{formatTime(timeLeft)}</b>
          </div>
        </div>
        <button 
        onClick={handleIsFinished}
        disabled={(num + 1) !== questionInfo.questions.length}
        className="disabled:opacity-50 px-5 py-2.5 rounded-xl text-white bg-[#28402E] font-bold hover:bg-[#355a3f] transition-all duration-200 w-max">
          Submit
        </button>
      </header>

      <div className="flex w-full justify-center">
        <Circle
          w={window.innerWidth < 640 ? "100" : "150"}
          h={window.innerWidth < 640 ? "100" : "150"}
          percent={questionInfo.questions.length ? (num + 1) / questionInfo.questions.length : 0}
          total={questionInfo.questions.length}
        />
      </div>

      <small className="text-[#535353]">
        Question {num + 1} of {questionInfo.questions?.length}
      </small>
      <b>{questionInfo.questions[num]?.question}</b>

      <div className="flex flex-col w-full gap-4">
        {questionInfo.questions[num]?.options.map((item, i) => (
          <div
            key={i}
            onClick={() => handleOptionSelect(Alps[i])}
            className={`relative w-full flex gap-4 sm:gap-8 md:gap-20 p-2 pr-8 border border-gray-400 rounded-2xl ${
              optNum === Alps[i] ? "bg-[#28402E] text-white" : "bg-white text-black"} 
              transition-all duration-200`}
          >
            <b>{Alps[i]}.</b> {item}
            {optNum === Alps[i] && (
              <i className="fa-solid fa-check text-white font-bold absolute right-2 top-1/2 -translate-y-1/2"></i>
            )}
          </div>
        ))}
      </div>

      <div className="flex items-center justify-between sm:justify-center sm:gap-3 w-full mt-3">
        <motion.button
          className="text-white bg-[#28402E] px-4 py-2 rounded-xl disabled:opacity-50"
          onClick={() => handleQuestionChange("-")}
          disabled={num === 0}
          whileTap={{scale: 0.8}}
        >
          Prev
        </motion.button>

        {typeof window !== "undefined" &&
          window.innerWidth > 640 &&
          Array.from({ length: questionInfo.questions.length }, (_, i) =>
            i < 10 ? (
              <span
                key={i}
                onClick={() => {
                  setNum(i);
                  setOptNum(answer[i + 1] ?? null);
                }}
                className={`flex items-center justify-center w-10 h-10 rounded-lg border border-gray-700 cursor-pointer ${
                  i === num ? "bg-[#28402E] text-white" : "bg-white text-black"
                }`}
              >
                {i + 1}
              </span>
            ) : (
              <p key={i}>...</p>
            )
          )}

        <motion.button
          className="text-white bg-[#28402E] px-4 py-2 rounded-xl disabled:opacity-50"
          onClick={() => handleQuestionChange("+")}
          disabled={num === questionInfo.questions.length - 1}
          whileTap={{scale: 0.8}}
        >
          Next
        </motion.button>
      </div>
    </div>
  );
};

export default Quiztemplate;
