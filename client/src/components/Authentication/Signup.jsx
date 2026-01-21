import { useRef, useState } from "react";
import { apiCallFunction } from "../../helpers/apiHelper";
import { GoogleLogin } from "@react-oauth/google";
import { useDispatch } from "react-redux";
import { saveUserData } from "../Slices/userSlice";

export default function Signup(props) {
    const username = useRef(null);
    const emailId = useRef(null);
    const password = useRef(null);

    const [mode, setMode] = useState("signup");
    const [show, setShow] = useState(false);
    const [msg, setMsg] = useState("Join the grind. Build daily.");

    const dispatch = useDispatch();

    const submit = async () => {
        const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        const payload =
            mode === "signup"
                ? {
                      name: username.current.value.trim(),
                      email: emailId.current.value.trim(),
                      password: password.current.value.trim(),
                  }
                : {
                      email: emailId.current.value.trim(),
                      password: password.current.value.trim(),
                  };
        if (
            payload.email.length == 0 ||
            payload.password.length == 0 ||
            (mode === "signup" && payload.name.length == 0)
        ) {
            setMsg("Fill all fields!");
            return;
        }
        if (!regex.test(payload.email)) {
            setMsg("Invalid Email!");
            return;
        }
        if (payload.password.length < 8) {
            setMsg("Password must contain atleast 8 characters!");
            return;
        }
        const res = await apiCallFunction(`auth/${mode}`, payload, "POST");
        if(res.success){
            dispatch(saveUserData(res.user));
            props.stopShow();
        }else{
            setMsg(res.msg);
        }
    };

    const handleGoogleLogin = async (token) => {
        const res = await apiCallFunction(`auth/googlelogin`, { token }, "POST");
        if(res.success){
            dispatch(saveUserData(res.user));
            props.stopShow();
        }else{
            setMsg(res.msg);
        }
    };

    return (
        <>
            <div className="fixed inset-0 bg-gradient-to-br from-amber-100/60 via-rose-100/60 to-sky-100/60 backdrop-blur-sm" />

            <div className="fixed inset-0 flex items-center justify-center">
                <div className="relative w-[420px] bg-white rounded-xl px-8 py-7 shadow-[0_20px_50px_rgba(0,0,0,0.15)] text-slate-800">

                    <button
                        onClick={() => props.stopShow()}
                        className="absolute top-5 right-5 text-slate-400 hover:text-slate-700 text-sm"
                    >
                        <big>x</big>
                    </button>

                    <div className="text-[12px] text-rose-500 tracking-wide mb-2">
                        {msg}
                    </div>

                    <div className="text-[22px] font-semibold tracking-tight mb-6">
                        {mode === "signup" ? "Create your account" : "Welcome back"}
                    </div>

                    <div className="space-y-4">
                        {mode === "signup" && (
                            <input
                                ref={username}
                                placeholder="Username"
                                className="w-full rounded-md border border-slate-200 px-3 py-[11px] text-[14px] placeholder-slate-400 focus:border-rose-400 focus:bg-rose-50/30 outline-none"
                            />
                        )}

                        <input
                            ref={emailId}
                            type="email"
                            placeholder="Email address"
                            className="w-full rounded-md border border-slate-200 px-3 py-[11px] text-[14px] placeholder-slate-400 focus:border-rose-400 focus:bg-rose-50/30 outline-none"
                        />

                        <div className="relative">
                            <input
                                ref={password}
                                type={show ? "text" : "password"}
                                placeholder="Password"
                                className="w-full rounded-md border border-slate-200 px-3 py-[11px] pr-14 text-[14px] placeholder-slate-400 focus:border-rose-400 focus:bg-rose-50/30 outline-none"
                            />

                            <button
                                type="button"
                                onClick={() => setShow(!show)}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-[11px] font-medium text-slate-500 hover:text-slate-800"
                            >
                                {show ? "Hide" : "View"}
                            </button>
                        </div>
                    </div>

                    <button
                        onClick={submit}
                        className="mt-7 w-full rounded-md bg-gradient-to-r from-rose-500 to-orange-400 text-white text-[14px] py-[11px] font-medium hover:opacity-90 transition"
                    >
                        {mode === "signup" ? "Sign up" : "Log in"}
                    </button>

                    <div className="mt-5 flex justify-center">
                        <GoogleLogin
                            onSuccess={(res) => {
                                handleGoogleLogin(res.credential);
                            }}
                            onError={(err) => console.error(err)}
                        />
                    </div>

                    <div className="mt-5 text-[12px] text-slate-500 text-center">
                        {mode === "signup" ? "Already here?" : "New here?"}{" "}
                        <span
                            className="text-rose-500 hover:underline cursor-pointer"
                            onClick={() =>
                                setMode(mode === "signup" ? "login" : "signup")
                            }
                        >
                            {mode === "signup" ? "Log in" : "Create an account"}
                        </span>
                    </div>
                </div>
            </div>
        </>
    );
}
