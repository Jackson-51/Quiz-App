import { Link } from "react-router-dom";
import { defineElement } from "@lordicon/element";
import { motion, spring, useInView } from "framer-motion"
import { useRef } from "react";

defineElement();
const App = () => {
  const webSummary = [
    ["Diverse Topics", "From science and technology to history and pop culture, we've got quizzes on virtually every subject."],
    ["Skill Levels", "Whether you're a beginner or an expert, we have difficulty levels tailored to challenge everyone."],
    ["Score System", "Earn points, climb the leaderboard, and track your progress over time as you improve your knowledge."]
  ];
  const features = [
    ["https://cdn.lordicon.com/kozvmqsd.json", "Challenge Yourself", "Test your knowledge with different difficulty levels and specialized topics.", "primary:#f24c00,secondary:#28402e", " "],
    ["https://cdn.lordicon.com/xowcggal.json", "Track Progress", "Monitor your improvement with detailed statistics and performance history.", "primary:#109121,secondary:#0a5c15,tertiary:#28402e,quaternary:#28402e", "loop-all"],
    ["https://cdn.lordicon.com/qhsjyool.json", "Learn As You Play", "Gain new knowledge while having fun with our educational quizzes.", "primary:#b4b4b4,secondary:#28402e,tertiary:#e88c30"," "],
    ["https://cdn.lordicon.com/ydwstxbl.json", "Compete with Friends", "Challenge friends, join tournaments, and see who can top the leaderboard.", "primary:#28402e,secondary:#ebe6ef", "morph-alone"]
  ];
  const leaderboard = [
    ["fa-solid fa-medal", "BrainMaster99", 9850, "#E6B800"],
    ["fa-solid fa-medal", "QuizWizard", 9720, "#B8B8B8"],
    ["fa-solid fa-medal", "ThinkTank", 9580, "#B87333"],
    ["fa-solid fa-4", "MindExplorer", 9350, ""],
    ["fa-solid fa-5", "BrainiacQueen", 9210, ""]
  ]
  return (
    <div className="flex flex-col">
      <section className="flex flex-col items-center w-full md:h-[50%] bg-gradient-to-b from-transparent to-[#bbeba3] justify-between">
        <nav className="flex items-center p-3 justify-between w-full md:w-[90%]">
          <span className="flex items-center gap-1">
            <div className="w-12 h-12 cursor-pointer">
              <img src="/logo.png" alt="BrainFuel logo" />
            </div>
            <p className="text-gray-800 font-semibold">BrainFuel</p>
          </span>
          <span className="flex gap-4 items-center">
            <Link to="/" className="text-[var(--baseColor)] font-bold">Login</Link>
            <Link to="/" className="px-4 py-2 rounded-lg text-sm font-bold bg-[var(--baseColor)] text-white">Sign Up</Link>
          </span>
        </nav>

        <div className="flex flex-col items-center md:flex-row-reverse justify-center md:w-[90%]">
          <lord-icon
            src="https://cdn.lordicon.com/xzvgfwwv.json"
            trigger="loop"
            colors="primary:#ebe6ef,secondary:var(--baseColor)"
            style={{ width: "350px", height: "350px" }}>
          </lord-icon>

          <div className="flex flex-col gap-3 md:gap-5 items-center md:items-start w-full px-5 pb-10 text-center">
            <h1 className="text-3xl md:text-4xl md:w-1/2 md:text-left md:mb-3">
              Test Your Knowledge. Level Up Your Brain!
            </h1>
            <small className="md:w-1/2 md:text-left">
              Challenge yourself with our fun, engaging quizzes designed to expand your mind and test your knowledge across various topics.
            </small>
            <Link to="/" className="px-4 py-2 rounded-lg text-sm font-bold bg-[var(--baseColor)] text-white md:text-left">
              Get Started
            </Link>
          </div>
        </div>
      </section>

      <section className="flex flex-col justify-center p-5 items-center">
        <div className="flex flex-col w-full text-center py-6 gap-10 md:w-1/2">
          <h1 className="relative text-3xl font-semibold before:content-[''] before:absolute before:bottom-[-20px] before:left-1/2 before:-translate-x-1/2 before:w-20 before:h-1 before:bg-[var(--baseColor)]">
            What it's All About
          </h1>
          <p className="text-sm">
            BrainFuel helps you sharpen your mind with fast, fun quizzes across science, technology, history, and more!
            Our timed challenges and point-based system make learning exciting and competitive.
          </p>
        </div>

        <div className="flex flex-col gap-7 md:flex-row md:w-[70%]">
          {webSummary.map((item, i) => (
            <div key={i} className="p-6 bg-[var(--lightGray)] rounded-3xl flex flex-col gap-3">
              <h1 className="font-semibold text-[var(--baseColor)] text-2xl">{item[0]}</h1>
              <small>{item[1]}</small>
            </div>
          ))}
        </div>
      </section>

      <section className="my-10 flex flex-col items-center justify-center bg-[var(--lightGray)] text-center px-6 py-8 gap-6">
        <div className="flex flex-col gap-10">
          <h1 className="relative text-3xl font-semibold before:content-[''] before:absolute before:bottom-[-20px] before:left-1/2 before:-translate-x-1/2 before:w-20 before:h-1 before:bg-[var(--baseColor)]">
            Features and Benefits
          </h1>
          <p className="text-sm">
            Our quiz platform is packed with features designed to make learning fun, engaging, and effective.
          </p>
        </div>

        <div className="flex flex-col gap-6 md:grid md:grid-cols-2 lg:grid-cols-4 w-full max-w-5xl">
          {features.map((item, i) => {
            const ref = useRef(null)
            const inView = useInView(ref, {threshold: 0.3});
            return(
              <motion.div 
              key={i} 
              className="flex flex-col items-center gap-2 bg-white rounded-3xl p-5 shadow-md"
              ref={ref}
              initial={window.innerWidth > 768 ? {scale: 0.5, opacity: 0} : {y: -50, opacity: 0}}
              animate={inView ? window.innerWidth > 768 ? {scale: 1, opacity: 1} : {y:0, opacity: 1} : {}}
              transition={{duration: 0.6, delay: (i * 0.25), type: "spring"}}
              >
              <div className="p-3 bg-[var(--lightGray)] rounded-full flex justify-center items-center">
                <lord-icon
                  src={item[0]}
                  trigger="loop"
                  colors={item[3]}
                  state={item[4]}
                  style={{ width: "60px", height: "60px" }}
                  >
                </lord-icon>
              </div>
              <h1 className="text-lg font-semibold">{item[1]}</h1>
              <p className="text-sm text-gray-600">{item[2]}</p>
            </motion.div>
            )
          })}
        </div>
      </section>

      <section className="flex flex-col px-3">
        <div className="trig flex flex-col w-full text-center px-2 py-6 gap-10 md:w-1/2">
          <h1 className="relative text-3xl font-semibold before:content-[''] before:absolute before:bottom-[-20px] before:left-1/2 before:-translate-x-1/2 before:w-20 before:h-1 before:bg-[var(--baseColor)]">
            Leaderboard
          </h1>
          <p className="text-sm">
            Our top quiz champions! Do you have what it takes to join them?
          </p>
        </div>

        <div className="w-[100%] flex flex-col rounded-3xl overflow-hidden mb-10">
          <header className="flex items-center gap-2 w-[100%] bg-[#e88c30] p-3">
            <lord-icon
                src="https://cdn.lordicon.com/lewtedlh.json"
                trigger="loop"
                stroke="bold"
                state="hover-pinch"
                colors="primary:#28402e,secondary:#28402e"
                style={{width: "50px", height: "50px"}}
                >
            </lord-icon>
            <p className="text-xl text-[var(--baseColor)]">Top Players This Month</p>
          </header>
          <div className="flex flex-col w-[100%]">
            {leaderboard.map((item, i) => (
              <div key={i} className="w-[100%] p-2 flex items-center justify-between py-3 border-b-1 border-[#dddddd] bg-[#f0c50663]">
                <div className="flex items-center gap-3">
                  <span className="flex justify-center items-center bg-[var(--lightGray)] w-8 h-8 rounded-full"><i className={item[0]} style={{color: `${item[3]}`}}></i></span>
                  <span className="w-10 h-10 bg-[var(--lightGray)] rounded-full"></span>
                  <p className="text-[13px]">{item[1]}</p>                  
                </div>
                <div className="flex flex-col items-end">
                  <b>{item[2]}</b>
                  <small className="text-[10px]">Points</small>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default App;
