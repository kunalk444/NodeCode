import { useState } from "react";
import { useSelector } from "react-redux";
import Signup from "./Authentication/Signup";

export default function Navbar(props) {
    const isLoggedIn = false;//useSelector((state) => state.user.isLoggedIn);
    function handleRegisterOrLogin() {
        props.showSignup();
    }

    return (
        <nav className="w-full h-14 px-6 flex items-center justify-between bg-white/70 backdrop-blur-md border-b border-slate-200 text-slate-800">
            <div className="text-[18px] font-semibold tracking-tight text-rose-500">
                NodeCode
            </div>

            {isLoggedIn ? (
                <div className="flex items-center gap-4">
                    <input
                        placeholder="Search problems"
                        className="w-56 rounded-md border border-slate-200 px-3 py-[7px] text-[13px] placeholder-slate-400 focus:border-rose-400 focus:bg-rose-50/30 outline-none"
                    />

                    <button className="text-[13px] px-3 py-[7px] rounded-md border border-slate-200 hover:border-rose-400 hover:bg-rose-50/30 transition">
                        View Progress
                    </button>

                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-rose-400 to-orange-400 flex items-center justify-center text-white text-[13px] font-medium cursor-pointer">
                        U
                    </div>
                </div>
            ) : (
                <div className="flex items-center gap-3">

                    <button className="text-[13px] px-4 py-[7px] rounded-md bg-gradient-to-r from-rose-500 to-orange-400 text-white hover:opacity-90 transition"
                        onClick={handleRegisterOrLogin}
                    >
                        Register or Login
                    </button>

                </div>
            )}
        </nav>
    );
}
