import { useState, useRef, useEffect } from "react";
import { apiCallFunction } from "../helpers/apiHelper";
import { useDispatch } from "react-redux";
import { delUserData } from "./Slices/userSlice";

function UserAvatar({user,ifDone,ifNot}) {
    const [open, setOpen] = useState(false);
    const dispatch = useDispatch();
    const ref = useRef(null);
    const [msg,setMsg] = useState("Log Out");

    useEffect(() => {
        const handler = (e) => {
            if (ref.current && !ref.current.contains(e.target)) {
                setOpen(false);
            }
        };
        document.addEventListener("mousedown", handler);
        return () => document.removeEventListener("mousedown", handler);
    }, []);

    async function handleLogout(){
        setMsg("Logging out....");
        const res = await apiCallFunction("auth/logout",null,"POST");
        if(res.success){
            dispatch(delUserData());
            setMsg("Log out");
            ifDone();
        }else{
            ifNot();
        }
    }

    return (
        <div className="relative" ref={ref}>
            <div
                onClick={() => setOpen(!open)}
                className="w-8 h-8 rounded-full bg-gradient-to-br from-rose-400 to-orange-400 flex items-center justify-center text-white text-[13px] font-medium cursor-pointer select-none"
            >
                {user.isLoggedIn && user.name.charAt(0).toUpperCase()}
            </div>

            {open && (
                <div className="absolute right-0 mt-2 min-w-[110px] rounded-md bg-white border border-slate-200 shadow-md z-50">
                    <div
                        onClick={() => {
                            setOpen(false);
                            handleLogout();
                        }}
                        className="px-3 py-2 text-sm text-rose-600 hover:bg-rose-50 cursor-pointer text-center"
                    >
                        {msg}
                    </div>
                </div>
            )}
        </div>
    );
}

export default UserAvatar;