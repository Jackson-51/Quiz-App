const Quiztemplate = ({num, total}) => {
    const option =["Cobol", "Java", "Vue", "Python"]
    const Alps = ["A", "B", "C", "D"]
    return ( 
        <div className="flex flex-col gap-2 items-start w-full h-full md:p-3">
            <small className="text-[#535353]">Question {num} of {total}</small>
            <b>Which of the following is a popular programming language for developing multimedia webpage</b>
            <div className="flex flex-col w-[100%] gap-4 mt-4">
                {option.map((item, i) => (
                    <div className="w-[100%] flex gap-20 p-4 border-1 border-gray-400 rounded-2xl hover:bg-[#28402E] hover:text-white" key={i}><b>{Alps[i]}.</b>{item}</div>
                ))}
            </div>
            <div className="flex items-center justify-between sm:justify-center sm:gap-3 w-[100%] mt-auto">
                <button className="text-white bg-[#28402E] px-4 py-2 rounded-xl">Prev</button>
                {typeof window !== 'undefined' && window.innerWidth > 640 && 
                Array.from({ length: 10 }, (_, i) => (
                    <span key={i} className="flex items-center justify-center w-10 h-10 rounded-lg border-1 border-gray-700 hover:bg-[#28402E] hover:text-white">
                    {i + 1}
                    </span>
                ))
                }
                <button className="text-white bg-[#28402E] px-4 py-2 rounded-xl">Next</button>
            </div>
        </div>
    );
}
 
export default Quiztemplate;