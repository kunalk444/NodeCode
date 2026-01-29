import React, { useRef } from 'react'
import { useEffect } from 'react';
import { useState } from 'react'
import { apiCallFunction } from '../helpers/apiHelper';
import { useNavigate } from 'react-router-dom';

function SearchBar() {
    const [text, setText] = useState(null);
    const [result, setResult] = useState(null);
    const timer = useRef(null);
    const navigate = useNavigate();
    useEffect(() => {
        clearTimeout(timer.current);

        if (text == null) return;
        if (text && text === "") {
            setText(null);
            setResult(null);
            timer.current = null;
            return;
        }
        timer.current = setTimeout(async () => {
            const res = await apiCallFunction(`viewproblems/search?s=${text}`, null, "GET");
            setResult(res);
        }, 600);
    }, [text]);

    const handleSearchSelect=(id)=>{
        setResult(null);
        setText(null);
        navigate(`/insideproblem?id=${id}`);
    }

    return (
        <div className="relative w-56">
            <input
                placeholder="Search problems"
                className="w-full rounded-md border border-slate-200 px-3 py-[7px] text-[13px] placeholder-slate-400 focus:border-rose-400 focus:bg-rose-50/30 outline-none"
                onChange={(e) => setText(e.target.value)}
            />

            {text && result && result.success && (
                <div className="absolute top-full z-20 mt-1 w-full rounded-md border border-slate-200 bg-white shadow-lg">
                    <ul className="max-h-60 divide-y divide-slate-200 overflow-y-auto text-sm">
                        {result.data.map((obj) => (
                            <li
                                key={obj._id}
                                className="cursor-pointer px-3 py-2 text-slate-700 transition-colors hover:bg-orange-50 hover:text-orange-600"
                            >
                                <button
                                    onClick={()=>handleSearchSelect(obj._id)}
                                >
                                {obj.title}
                                </button>
                            </li>
                        ))}
                    </ul>

                </div>
            )}
        </div>
    );


}

export default SearchBar