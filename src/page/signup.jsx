import { motion} from "framer-motion"
import { useState } from "react";
import { Link } from "react-router-dom";

const SignUp = () => {
    const [passwordState, setPasswordState] = useState(false); 
    return (
        <div className="relative z-10 flex justify-center items-center w-screen h-screen bg-[var(--lightLemon)]">
            <div className="absolute bottom-0 w-full h-full z-[-1] overflow-hidden flex flex-col justify-end">
                <motion.img 
                    src="/bg3.svg" 
                    alt="" 
                    className="absolute scale-y-[2] w-full"
                    initial={{ x: 0, scale: 1 }}
                    animate={{ 
                        x: [0, 20, 0, -20, 0], 
                        scale: [1, 1.1, 1, 1.1, 1]
                    }}
                    transition={{ 
                        duration: 4, 
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}/>
                <motion.img 
                    src="/bg2.svg" 
                    alt="" 
                    className="absolute scale-y-[2] w-full"
                    initial={{ x: 0, scale: 1 }}
                    animate={{ 
                        x: [0, -15, 0, 15, 0],
                        scale: [1, 1.05, 1, 1.05, 1]
                    }}
                    transition={{ 
                        duration: 3.5, 
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: 0.2
                    }}/>
                <motion.img 
                    src="/bg1.svg" 
                    alt="" 
                    className="absolute scale-y-[2] w-full"
                    initial={{ x: 0, scale: 1 }}
                    animate={{ 
                        x: [0, 10, -5, 10, 0],
                        scale: [1, 1.03, 1.02, 1.03, 1]
                    }}
                    transition={{ 
                        duration: 3, 
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: 0.4
                    }}
                />
            </div>
            <form action="" className="flex flex-col p-3 bg-white rounded-3xl gap-4 md:gap-6 md:grid md:grid-cols-2">
                <motion.div 
                whileInView={{ scale: [1, 1.1, 1] }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.3}}
                className="relative rounded-3xl overflow-hidden w-[100%] h-40 md:h-[100%] bg-black flex justify-center items-center">
                <img src="/low-poly.svg" alt="" className="absolute z-0 md:object-cover md:h-[100%]" />
                <div className="relative z-1 flex flex-col text-center w-[70%]">
                    <b className="text-[var(--lightGray)]">Learn as you play</b>
                    <small className="text-[#efede693]">Each quiz helps you sharpen your mind while having fun.</small>
                </div>
                </motion.div>
                <div className="flex flex-col items-center gap-3 md:items-start">
                    <b className="text-[var(--baseColor)] text-extrabold mt-4 md:text-2xl">BrainFuel</b>
                    <small className="text-[var(--baseColor)]">SignUp to brainFuel</small>
                    <div className="flex md:flex-col justify-center items-center gap-5 w-full">
                        <span className="md:w-full flex cursor-pointer justify-center items-center bg-[var(--lightGray)] px-5 py-3 rounded-2xl gap-2"><img src="/google.svg" alt="" className="w-6 h-6" /><small className="">{window.innerWidth > 768 ? "SignUp with Google" : "Google"}</small></span>
                        <span className="md:w-full flex cursor-pointer justify-center items-center bg-[var(--lightGray)] px-5 py-3 rounded-2xl gap-2"><img src="/facebook.svg" alt="" className="w-6 h-6" /><small className="">{window.innerWidth > 768 ? "SignUp with Facebook" : "Facebook"}</small></span>
                    </div>
                    <b 
                    className="
                    w-[100%]
                    relative 
                    before:content-[' ']
                    before:absolute 
                    before:w-[40%] 
                    before:left-[10px] 
                    before:transform-[translateY(-50%)] 
                    before:top-[50%] 
                    before:h-[1px] 
                    before:bg-[var(--deepGray)]   
                    after:content-[' ']
                    after:absolute 
                    after:w-[40%] 
                    after:right-[10px] 
                    after:transform-[translateY(-50%)] 
                    after:top-[50%] 
                    after:h-[1px] 
                    after:bg-[var(--deepGray)] 
                    flex 
                    justify-center">or</b>
                    <input type="text" placeholder="Username"  className="px-5 text-sm border outline-none border-[var(--deepGray)] focus:border-[var(--lightBaseColor)] py-4 w-[100%] rounded-xl"/>
                    <input type="email" placeholder="Email" className="px-5 text-sm  border outline-none border-[var(--deepGray)] focus:border-[var(--lightBaseColor)] py-4 w-[100%] rounded-xl" />
                    <div className="w-[100%] relative">
                        <input type={passwordState ? "text" : "password"} placeholder="Password" className="px-5 text-sm border outline-none border-[var(--deepGray)] focus:border-[var(--lightBaseColor)] py-4 w-[100%] rounded-xl" />
                        <i className={`fa-regular ${passwordState ? 'fa-eye' : 'fa-eye-slash'} text-[var(--baseColor)] absolute right-2 top-[50%] transform-[translateY(-50%)]`} onClick={() => setPasswordState(!passwordState)}></i>
                    </div>
                    <input type="button" value="SignUp" className=" cursor-pointer md:w-full px-10 py-3 rounded-xl text-sm bg-[var(--baseColor)] text-[var(--lightGray)] mb-2"/>
                    <small className="text-[#3a3a3a] md:flex md:justify-center md:w-full mb-5">Already have an account? <Link to="/login" className="text-[var(--baseColor)] font-semibold pl-1">Login</Link></small>
                </div>
            </form>
        </div>
    );
}
 
export default SignUp;