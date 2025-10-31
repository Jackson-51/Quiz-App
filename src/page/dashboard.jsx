import { useState, useRef, useEffect } from "react";
import { defineElement } from "@lordicon/element";
import { motion } from "framer-motion";
import { Link } from "react-router-dom"

defineElement()
const DashBoard = () => {
    const [dashName, setDashName] = useState("");
    let [quizData, setQuizData] = useState({});
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const signupDetails = localStorage.getItem("signupDetails");
        setDashName(JSON.parse(signupDetails)?.username || "User");

        setIsLoading(true);
        fetch("https://raw.githubusercontent.com/Jackson-51/my-json-data/main/data.json")
            .then(response => {
                if (!response.ok) throw new Error(`Fetch failed: ${response.status}`);
                return response.json();
            })
            .then(data => {
                setQuizData(data);
                setIsLoading(false);
            })
            .catch(err => {
                console.error("Failed to load quiz data:", err);
                setQuizData({});
                setIsLoading(false);
            });
    }, []);

    const [dashboardData, setDashboardData] = useState([]);

    useEffect(() => {
        const data = [
        { icon: "fa-regular fa-circle-check", name: "Quizzes Completed", data: Number(localStorage.getItem("completedQuizzes")) || 0 },
        { icon: "fa-regular fa-clock", name: "In progress", data: Number(localStorage.getItem("inProgress")) || 0 },
        { icon: "fa-solid fa-chart-simple", name: "Average Score", data: Number(localStorage.getItem("averageScore")) || 0 },
        { icon: "fa-solid fa-trophy", name: "Achievement Points", data: Number(localStorage.getItem("points")) || 0 }
        ];

        setDashboardData(data);
    }, []);

    const allQuizzes = [
        {Qimage: "/quizImage/Qimg1.jpg", courseCode: "GEG311", courseName: "Multivariable calculus"},
        {Qimage: "/quizImage/Qimg2.jpg", courseCode: "CEG211", courseName: "Mechanics of material"},
        {Qimage: "/quizImage/Qimg3.jpg", courseCode: "PGG318", courseName: "Natural gas processing"},
        {Qimage: "/quizImage/Qimg4.jpg", courseCode: "CHG331", courseName: "Transport phenomenon II"}
    ]
    const sidebar = [
        {icon: "https://cdn.lordicon.com/jeuxydnh.json", name: "Dashboard"},
        {icon: "https://cdn.lordicon.com/sobzmbzh.json", name: "My Quizess"},
        {icon: "https://cdn.lordicon.com/fumzwfyw.json", name: "Analytics"},
        {icon: "https://cdn.lordicon.com/vttzorhw.json", name: "Achievements"},
        {icon: "https://cdn.lordicon.com/fwkrbvja.json", name: "Settings"},
    ]
    const [quiz, setQuiz] = useState(allQuizzes);
    const [optionVal, setOptionVal] = useState("");
    const handleOption = (e) => {
        const selected = e.target.value;
        setOptionVal(selected)
        if (selected == ""){
            setQuiz(allQuizzes)
        }
        else{
            const filterQuiz = allQuizzes.filter(item => item.courseCode === selected);
            setQuiz(filterQuiz);            
        }
    }
    const iconRefs = useRef([]);
    const [hovered, setHovered] = useState(null);
    return (
        <div className="relative w-screen h-screen flex flex-col items-start bg-[var(--lightGray)] overflow-y-scroll sb">
            <nav className="w-full flex items-center justify-between p-3 bg-[var(--deepLemon)]">
                <span className="flex items-center gap-2 cursor-pointer">
                    <img src="/logo.png"  alt="" className="w-10 h-10" />
                    <h1 className="font-extrabold text-xl text-[var(--baseColor)]">BrainFuel</h1>
                </span>
                <div className="relative hidden md:block">
                    <input type="text" name="search" id="search"  className="focus:border-[var(--baseColor)] text-sm text-gray-700 rounded-2xl pl-7 py-3 outline-none border border-[#38ac55]"/>
                    <i className="fa-solid fa-search absolute left-1 top-1/2 transform-[translateY(-50%)] text-[var(--lightBaseColor)]"></i>
                </div>
                <div className="flex items-center gap-2">
                    <small className="font-bold text-[var(--baseColor)] flex items-center gap-3"><p className="custom-text">Welcome</p> {dashName}</small>
                    <span className="w-10 h-10 flex justify-center items-center rounded-full bg-[#7f9b72]"><i className="fa-regular fa-user text-[var(--baseColor)]"></i></span>
                </div>
            </nav>
            <div className="flex items-start w-full h-full">
                <aside className="hidden md:flex md:w-60 flex-shrink-0 h-full bg-white border border-gray-300 px-3 flex-col items-center pt-5">
                    <div className="flex flex-col gap-2 w-full">
                        {sidebar.map((item, i) => (
                                <motion.span
                                key={i}
                                onMouseEnter={() => {
                                    setHovered(i);
                                    iconRefs.current[i]?.play?.();
                                }}
                                onMouseLeave={() => {
                                    setHovered(null);
                                    iconRefs.current[i]?.stop?.();
                                }}
                                whileHover={{
                                    backgroundColor: "#caf3d5",
                                    color: "#02691e",
                                }}
                                className="flex items-center gap-2 p-2 rounded-xl cursor-pointer transition-colors duration-300 pr-5"
                                >
                                <lord-icon
                                    ref={(el) => (iconRefs.current[i] = el)}
                                    src={item.icon}
                                    trigger="hover"
                                    stroke="bold"
                                    colors={
                                    hovered === i
                                        ? "primary:#02691e,secondary:#02691e"
                                        : "primary:#364153,secondary:#364153"
                                    }
                                    style={{ width: "25px", height: "25px" }}
                                ></lord-icon>
                                <small className="font-bold text-[#364153]">{item.name}</small>
                                </motion.span>
                            ))}
                    </div>
                    <Link 
                    to="/" 
                    onClick={() => localStorage.clear()}
                    className="mt-auto mb-5 w-full flex items-center text-red-700 bg-red-100 px-5 py-3 rounded-2xl text-sm"
                    >Log out <i class="fa-solid fa-arrows-turn-right"></i>
                    </Link>
                </aside>

                <div className="flex-1 flex flex-col gap-5 h-full overflow-y-scroll sb">
                    <section className="w-full p-5 gap-3 flex flex-col items-start">
                        <h1 className="text-gray-700 font-bold">Dashboard Overview</h1>
                        <div className="w-full flex flex-col gap-3 md:grid md:grid-cols-2">
                            {dashboardData.map((item, i) => {
                                const colors = [
                                    {bgColor: "#caf3d5", iconColor: "#038024"},
                                    {bgColor: "#c2d0ff", iconColor: "#00249c"},
                                    {bgColor: "#c2d0ff", iconColor: "#00249c"},
                                    {bgColor: "#ffdfbf", iconColor: "#d66c01"}
                                ]
                                return (
                                    <div key={i} className="w-full p-5 flex items-center gap-4 rounded-2xl bg-white">
                                        <span 
                                        className="w-12 h-12 rounded-xl flex justify-center items-center bg-[var(--lightLemon)]" 
                                        style={{backgroundColor: colors[i].bgColor}}>
                                            <i 
                                            className={item.icon + " text-2xl"} 
                                            style={{color: colors[i].iconColor}}></i>
                                        </span>
                                        <div className="flex flex-col justify-between">
                                            <small className="text-gray-500">{item.name}</small>
                                            <b className="text-xl">{i !== 2 ? item.data : item.data + " %"}</b>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    </section>

                    <section className="w-full px-3 grid grid-flow-col gap-2">
                        <header className=" flex items-center justify-between">
                            <p className="text-lg font-semibold text-gray-700">Your Quizzes</p>
                            <select id="browser" value={optionVal} onChange={handleOption} className="focus:border-[var(--lightBaseColor)] px-5 py-2 outline-none border rounded-xl text-sm bg-white border-gray-400">
                                <option className="" value="">All Categories</option>
                                <option className="" value="GEG311">GEG311</option>
                                <option className="" value="CHG331">CHG331</option>
                                <option className="" value="CEG211">CEG211</option>
                                <option className="" value="PGG318">PGG318</option>
                            </select>
                        </header>
                    </section>

                    <section className="flex w-full h-max flex-col items-center gap-5 p-4 md:grid md:grid-cols-3">
                        {quiz.map((item, i) => {
                            const completed = JSON.parse(localStorage.getItem(`quiz_${item.courseCode}_completed`)) || false;
                            return(
                            <Link to={`/quizpage/${item.courseCode}`} className="flex flex-col w-full h-80 rounded-3xl overflow-hidden" key={i}>
                                <span className="relative w-full overflow-hidden rounded-t-3xl flex justify-center items-centers">
                                    <small className="absolute right-3 top-3 text-white p-3 rounded-lg bg-[#0000008a]">
                                        {isLoading ? "Loading..." : 
                                        quizData[item.courseCode]?.questions 
                                            ? `${quizData[item.courseCode].questions.length} Questions`
                                            : "No questions"}
                                    </small>
                                    <img src={item.Qimage} alt="" className="object-cover w-full" />
                                </span>
                                <div className="flex flex-col gap-3 bg-[#ffffffb7] px-3 pt-5">
                                    <small className="text-[#00249c]">{item.courseCode}</small>
                                    <h1 className="text-sm">{item.courseName}</h1>
                                    <small className="flex items-center gap-2 text-[#838383]">
                                        <i className="fa-regular fa-clock"></i>
                                        <p>{quizData[item.courseCode]?.duration} min</p>
                                    </small>
                                    {
                                        completed ?
                                        <footer className="flex justify-between items-center py-2 border-t border-gray-300">
                                            <span className="flex items-center gap-3 text-[var(--lightBaseColor)]">
                                                <i className="fa-regular fa-circle-check"></i>
                                                <small>Completed &middot; 100%</small>
                                            </span>
                                            <span className="flex justify-center items-center w-10 h-10 rounded-full bg-[#caf3d5]">
                                                <i className="fa-solid fa-chart-simple text-[#038024]"></i>
                                            </span>
                                        </footer> : 
                                        <footer className="flex justify-between items-center py-2 border-t border-gray-300">
                                            <small className="text-gray-400">Not Started</small>
                                            <span className="flex justify-center items-center w-10 h-10 rounded-full bg-[#c2d0ff]">
                                                <i className="fa-solid fa-play text-[#00249c]"></i>
                                            </span>
                                        </footer>
                                    }           
                                </div>
                            </Link>
                        )}
                        )}
                    </section>                    
                </div>
            </div>
            
        </div>
    );
}
 
export default DashBoard;