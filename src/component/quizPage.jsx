import Circle from "./circle";
import Quiztemplate from "./quizTemplate"

const QuizPage = () => {
  return ( 
    <div id="body" className="px-4 py-2 font-roboto w-[100%] h-screen flex flex-col gap-5 md:gap-3 bg-[#EFF5EC] items-center">
      <nav className="w-[100%] sm:w-[70%] flex items-center justify-between px-3">
        <h1 className="text-[#28402e] font-bold text-2xl">BrainFuel</h1>
        <div className="w-15 h-15 rounded-[50%]"><img src="/logo.png" alt="" /></div>
      </nav>

      <section className="flex flex-col md:grid md:grid-cols-6 md:grid-rows-6 gap-3 items-center bg-white rounded-3xl w-full h-full md:w-[80%] md:h-[90%] p-3">

        <header className="w-full flex items-center text-[#3f3f3f] justify-between md:col-span-6 md:row-span-1">
          <div className="flex items-center gap-3">
            <i className="fa-regular fa-clock text-3xl"></i>   
            <div className="flex flex-col">
              <small className="text-[#3f3f3f]">Time remaining</small>
              <b><span>14</span>:<span>44</span>:<span>00</span></b>
            </div>
          </div>
          <button className="px-4 py-2 rounded-xl text-white bg-[#28402E] font-bold">Submit</button>
        </header>

        {/* Circle positioned in grid for desktop */}
        <div className="md:col-span-2 md:col-start-5 md:row-span-5 md:row-start-2 flex items-center justify-center w-full">
          <Circle w="150" h="150" percent={70} total={10}/>
        </div>
        
        {/* Quiz template positioned next to circle for desktop */}
        <div className="md:col-span-4 md:col-start-1 md:row-span-5 md:row-start-2 w-full">
          <Quiztemplate num={7} total={10}/>
        </div>
      </section>
    </div>
  );
}
 
export default QuizPage;