import Circle from "./circle";
import Quiztemplate from "./quizTemplate"

const QuizPage = () => {
  return ( 
    <div id="body" className="px-4 font-roboto w-[100%] h-[100%] flex flex-col gap-5 bg-[#EFF5EC] items-center">
      <nav className="w-[100%] sm:w-[70%] flex items-center justify-between p-3 sm:py-5">
        <h1 className="text-[#28402e] font-bold text-2xl">BrainFuel</h1>
        <div className="w-15 h-15 rounded-[50%]"><img src="/logo.png" alt="" /></div>
      </nav>

      <section className="w-[100%] sm:w-[70%] h-[88%] bg-white rounded-4xl p-3 sm:p-5 flex flex-col gap-6 justify-start items-center">
        <header className="w-[100%] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <i className="fa-regular fa-clock text-3xl"></i>   
            <div className="flex flex-col">
              <small className="text-[#3f3f3f]">Time remaining</small>
              <b><span>14</span>:<span>44</span>:<span>00</span></b>
            </div>
          </div>
          <button className="px-4 py-2 rounded-xl text-white bg-[#28402E] font-bold">Submit</button>
        </header>
        <Circle w="200" h="200" percent={70} total={10}/>
        <Quiztemplate num={7} total={10}/>
      </section>
    </div>
  );
}
 
export default QuizPage;