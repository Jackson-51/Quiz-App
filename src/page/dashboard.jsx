import { useState } from "react";

const DashBoard = () => {
    const dashboardData = {
            icon: ["fa-regular fa-circle-check", "fa-regular fa-clock", "fa-solid fa-chart-simple", "fa-solid fa-trophy"],
            name: ["Quizzes Completed", "In progress", "Average Score", "Achievement Points"],
            data: [24, 7, 82, 1240]
        }
    const allQuizzes = [
        {Qimage: "/quizImage/Qimg1.jpg", courseCode: "GEG311", courseName: "Multivariable calculus", duration: "25 min", quantity: "20", status: "completed"},
        {Qimage: "/quizImage/Qimg2.jpg", courseCode: "CEG211", courseName: "Mechanics of material", duration: "20 min", quantity: "15", status: "progress"},
        {Qimage: "/quizImage/Qimg3.jpg", courseCode: "PGG318", courseName: "Natural gas processing", duration: "30 min", quantity: "25", status: "notstarted"},
        {Qimage: "/quizImage/Qimg4.jpg", courseCode: "CHG331", courseName: "Transport phenomenon II", duration: "45 min", quantity: "30", status: "completed"}
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

    return (
        <div className="w-screen h-screen flex flex-col items-center bg-[var(--lightGray)] overflow-y-scroll">
            <nav className="w-full flex items-center justify-between p-3 bg-[var(--deepLemon)]">
                <h1 className="font-extrabold text-xl text-[var(--baseColor)]">BrainFuel</h1>
                <div className="relative hidden md:block">
                    <input type="text" name="search" id="search"  className="focus:border-[var(--baseColor)] text-sm text-gray-700 rounded-2xl pl-7 py-3 outline-none border border-[#38ac55]"/>
                    <i className="fa-solid fa-search absolute left-1 top-1/2 transform-[translateY(-50%)] text-[var(--lightBaseColor)]"></i>
                </div>
                <div className="flex items-center gap-2">
                    <span className="w-10 h-10 flex justify-center items-center rounded-full bg-[#7f9b72]"><i className="fa-regular fa-user text-[var(--baseColor)]"></i></span>
                    <small className="font-bold text-[var(--baseColor)]">Jackson-5</small>
                </div>
            </nav>
            <section className="w-full p-5 gap-3 flex flex-col items-start">
                <h1 className="text-gray-700">Dashboard Overview</h1>
                <div className="w-full flex flex-col gap-3">
                    {dashboardData.name.map((item, i) => {
                        const colors = [
                            ["#caf3d5", "#038024"],
                            ["#c2d0ff", "#00249c"],
                            ["#c2d0ff", "#00249c"],
                            ["#ffdfbf", "#d66c01"]
                        ]
                        return (
                            <div key={i} className="w-full p-5 flex items-center gap-4 rounded-2xl bg-white">
                                <span className="w-12 h-12 rounded-xl flex justify-center items-center bg-[var(--lightLemon)]" style={{backgroundColor: colors[i][0]}}><i className={dashboardData.icon[i]} style={{color: colors[i][1]}}></i></span>
                                <div className="flex flex-col justify-between">
                                    <small className="text-gray-500">{item}</small>
                                    <b className="text-xl">{i !== 2 ? dashboardData.data[i] : dashboardData.data[i] + " %"}</b>
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

            <section className="flex w-full h-max flex-col items-center gap-5 p-4">
                {quiz.map((item, i) => (
                    <main className="cursor-pointer flex flex-col w-full h-80 rounded-3xl overflow-hidden" key={i}>
                        <span className="relative w-full overflow-hidden rounded-t-3xl flex justify-center items-centers">
                            <small className="absolute right-3 top-3 text-white p-3 rounded-lg bg-[#0000008a]">{item.quantity} Questions</small>
                            <img src={item.Qimage} alt="" className="object-cover w-full" />
                        </span>
                        <div className="flex flex-col gap-3 bg-[#ffffffb7] px-5 pt-5">
                            <small className="text-[#00249c]">{item.courseCode}</small>
                            <h1 className="text-xl">{item.courseName}</h1>
                            <small className="flex items-center gap-2 text-[#838383]">
                                <i className="fa-regular fa-clock"></i>
                                <p>{item.duration}</p>
                            </small>
                            {
                                item.status === "completed" ?
                                <footer className="flex justify-between items-center py-2 border-t border-gray-300">
                                    <span className="flex items-center gap-3 text-[var(--lightBaseColor)]">
                                        <i className="fa-regular fa-circle-check"></i>
                                        <small>Completed &middot; {Math.floor(Math.random() * (100 - 50 + 1)) + 50}%</small>
                                    </span>
                                    <span className="flex justify-center items-center w-10 h-10 rounded-full bg-[#caf3d5]">
                                        <i className="fa-solid fa-chart-simple text-[#038024]"></i>
                                    </span>
                                </footer> : item.status === "notstarted" ?
                                <footer className="flex justify-between items-center py-2 border-t border-gray-300">
                                    <small className="text-gray-400">Not Started</small>
                                    <span className="flex justify-center items-center w-10 h-10 rounded-full bg-[#c2d0ff]">
                                        <i className="fa-solid fa-play text-[#00249c]"></i>
                                    </span>
                                </footer> :
                                <footer className="flex justify-between items-center pt-2 pb-3 border-t border-gray-300">
                                    <span className="flex flex-col justify-center gap-2 w-max">
                                        <div className="flex items-center gap-2 text-[#00249c]">
                                            <i className="fa-regular fa-circle-check"></i>
                                            <small>In progress</small>
                                        </div>
                                        <div className="relative">
                                            <div className="z-5 absolute w-full h-2 rounded-2xl bg-gray-300"></div>
                                            <div className={`z-10 absolute top-0 left-0 w-[30%] h-2 rounded-2xl bg-[#00249c]`}></div>
                                        </div>
                                    </span>
                                    <span className="flex justify-center items-center w-10 h-10 rounded-full bg-[#c2d0ff]">
                                        <i className="fa-solid fa-play text-[#00249c]"></i>
                                    </span>
                                </footer>
                            }           
                        </div>
                    </main>
                ))}
            </section>
        </div>
    );
}
 
export default DashBoard;