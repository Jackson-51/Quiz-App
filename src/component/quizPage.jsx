import { useState, useEffect } from "react";
import Quiztemplate from "./quizTemplate"
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";

const QuizPage = () => {
  const [dashName, setDashName] = useState("");
  const [quizData, setQuizData] = useState({});
  const { quizId } = useParams();
  const [pageLoad, setPageLoad] = useState(true);

  useEffect(() => {
      const username = localStorage.getItem("username");
      setDashName(username)
      fetch("https://raw.githubusercontent.com/Jackson-51/my-json-data/main/data.json")
          .then(response => {
              if (!response.ok) throw new Error(`Fetch failed: ${response.status}`);
              return response.json();
          })
          .then(data => {
              setQuizData(data[quizId] || {});
              console.log("Quiz data loaded:", data[quizId] || {});
          })
          .catch(err => {
              console.error("Failed to load quiz data:", err);
              setQuizData({});
      });
      const timer = setTimeout(() => setPageLoad(false), 2000);
      return () => clearTimeout(timer);
  }, [])

  return ( 
    <div id="body" className="px-4 py-2 font-roboto w-[100%] h-screen flex flex-col gap-4 md:gap-2 bg-[#EFF5EC] items-center overflow-scroll sb">
      <nav className="w-full flex items-center justify-between py-3">
          <span className="flex items-center gap-2 cursor-pointer">
              <img src="/logo.png"  alt="" className="w-10 h-10" />
              <h1 className="font-extrabold text-xl text-[var(--baseColor)]">BrainFuel</h1>
          </span>
          <div className="flex items-center gap-2">
              <small className="font-bold text-[var(--baseColor)]">{dashName}</small>
              <span className="w-10 h-10 flex justify-center items-center rounded-full bg-[#7f9b72]"><i className="fa-regular fa-user text-[var(--baseColor)]"></i></span>
          </div>
      </nav>
      {pageLoad ? (
        <motion.div 
        className="text-gray-800 font-bold text-2xl w-full h-full flex justify-center items-center" 
        animate={{opacity: [1, 0.3, 1]}}
        transition={{duration: 1.5, repeat: Infinity, ease: "easeInOut"}} 
        >Loading...</motion.div>
      ) : (
        <section className="h-max bg-white rounded-3xl w-full md:w-[80%] p-4 md:py-2 md:px-3 shadow-sm">
          <div className="w-full mt-6 md:mt-0">
            <Quiztemplate courseData={quizData} quizId={quizId} />
          </div>

        </section>)
      }
    </div>
  );
}
 
export default QuizPage;