import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Signup from "./Authentication/Signup";
import UserAvatar from "./UserAvatar";
import SearchBar from "./SearchBar";
import { useNavigate } from "react-router-dom";

export default function Navbar(props) {
    const user = useSelector(state=>state.user);
    const isLoggedIn = user.isLoggedIn;
    const [showSignup,setShowSignup] = useState(false);
    const [msg,setMsg] = useState(null);
    const navigate = useNavigate();

    function handleRegisterOrLogin() {
        setShowSignup(true);
    }
    useEffect(()=>{
        if(msg)setTimeout(()=>setMsg(null),1700);
    },[msg])
    return (
        <nav className="w-full h-14 px-6 flex items-center justify-between bg-white/70 backdrop-blur-md border-b border-slate-200 text-slate-800">
            <div className="mb-0 text-2xl font-extrabold tracking-tight bg-gradient-to-r from-rose-500 to-orange-400 bg-clip-text text-transparent">
                NodeCode
            </div>
            {msg && (
                <div className="px-6 mt-3">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-[13px] font-medium 
            bg-gradient-to-r from-orange-50 to-rose-50 text-rose-600 border border-rose-200">
                        {msg}
                    </div>
                </div>
            )}
            {isLoggedIn ? (
                <div className="flex items-center gap-4">
                    <SearchBar />
                    <button className="text-[13px] px-3 py-[7px] rounded-md border border-slate-200 hover:border-rose-400 hover:bg-rose-50/30 transition"
                        onClick={()=>navigate("/progresspage")}
                    >
                        View Progress
                    </button>

                    <UserAvatar user={user}
                        ifDone={()=>setMsg("Logged out Successfully")}
                        ifNot={()=>setMsg("Couldnt Logout, try again later")}
                    />
                </div>
            ) : (
                <div className="flex items-center gap-4">
                    <SearchBar />
                    <button className="text-[13px] px-4 py-[7px] rounded-md bg-gradient-to-r from-rose-500 to-orange-400 text-white hover:opacity-90 transition"
                        onClick={handleRegisterOrLogin}
                    >
                        Register or Login
                    </button>
                    {showSignup && <Signup stopShow = {()=>setShowSignup(false)}/>}
                </div>
            )}
        </nav>
    );
}
