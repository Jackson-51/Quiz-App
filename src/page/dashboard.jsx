const DashBoard = () => {
    const dashboardData = {
            icon: ["fa-regular fa-circle-check", "fa-regular fa-clock", "fa-solid fa-chart-simple", "fa-solid fa-trophy"],
            name: ["Quizzes Completed", "In progress", "Average Score", "Achievement Points"],
            data: [24, 7, 82, 1240]
        }
    
    return (
        <div className="w-screen h-screen flex flex-col items-center bg-[var(--lightGray)]">
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
                    <select id="browser" name="browser" className="focus:border-[var(--lightBaseColor)] px-5 py-2 outline-none border rounded-xl text-sm bg-white border-gray-400">
                        <option className="" value="">All Categories</option>
                        <option className="" value="GEG311">GEG311</option>
                        <option className="" value="PGG233">PGG233</option>
                        <option className="" value="CEG211">CEG211</option>
                        <option className="" value="PGG311">PGG311</option>
                    </select>
                </header>
            </section>
        </div>
    );
}
 
export default DashBoard;