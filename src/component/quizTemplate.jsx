import { useEffect, useState } from "react";
import Circle from "./circle";

const Quiztemplate = ({ courseData, quizId }) => {
  const [num, setNum] = useState(0);
  const Alps = ["A", "B", "C", "D", "E"];
  const [questionInfo, setQuestionInfo] = useState({
    duration: 0,
    questions: [],
  });
  const [timeLeft, setTimeLeft] = useState(0);

  useEffect(() => {
    if (courseData) {
      const duration = courseData.duration || 0;
      const questions = courseData.questions || [];
      setQuestionInfo({ duration, questions });
      setTimeLeft(duration * 60); 
    }
  }, [courseData]);

  useEffect(() => {
    if (timeLeft <= 0) return;
    const interval = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [timeLeft]);

  const formatTime = (seconds) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hrs.toString().padStart(2, "0")}:${mins
      .toString()
      .padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const handleQuestionChange = (type) => {
    if (type === "+" && num < questionInfo.questions.length - 1) {
      setNum(num + 1);
    } else if (type === "-" && num > 0) {
      setNum(num - 1);
    }
  };

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
        <button className="px-5 py-2.5 rounded-xl text-white bg-[#28402E] font-bold hover:bg-[#355a3f] transition-all duration-200 w-max">
          Submit
        </button>
      </header>

      <div className="flex w-full justify-center">
        <Circle
          w={window.innerWidth < 640 ? "100" : "150"}
          h={window.innerWidth < 640 ? "100" : "150"}
          percent={(num + 1) / questionInfo.questions.length}
          total={questionInfo.questions.length}
        />
      </div>

      <small className="text-[#535353]">
        Question {num + 1} of {questionInfo.questions?.length}
      </small>
      <b>{questionInfo.questions[num]?.question}</b>

      <div className="flex flex-col w-full gap-4 mt-4">
        {questionInfo.questions[num]?.options.map((item, i) => (
          <div
            key={i}
            className="w-full flex gap-4 sm:gap-8 md:gap-20 p-2 border border-gray-400 rounded-2xl hover:bg-[#28402E] hover:text-white transition-all duration-200"
          >
            <b>{Alps[i]}.</b> {item}
          </div>
        ))}
      </div>

      <div className="flex items-center justify-between sm:justify-center sm:gap-3 w-full mt-auto">
        <button
          className="text-white bg-[#28402E] px-4 py-2 rounded-xl"
          onClick={() => handleQuestionChange("-")}
        >
          Prev
        </button>

        {typeof window !== "undefined" &&
          window.innerWidth > 640 &&
          Array.from({ length: questionInfo.questions.length }, (_, i) => (
            <span
              key={i}
              onClick={() => setNum(i)}
              className={`flex items-center justify-center w-10 h-10 rounded-lg border border-gray-700 cursor-pointer ${
                i === num ? "bg-[#28402E] text-white" : "bg-white text-black"
              }`}
            >
              {i + 1}
            </span>
          ))}

        <button
          className="text-white bg-[#28402E] px-4 py-2 rounded-xl"
          onClick={() => handleQuestionChange("+")}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Quiztemplate;
