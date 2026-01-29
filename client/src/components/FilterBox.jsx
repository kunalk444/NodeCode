import React from 'react'
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { changeFilters } from './Slices/filterSlice';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function FilterBox() {
    const user = useSelector(state => state.user);
    const filters = useSelector(state => state.filters);
    const dispatch = useDispatch();
    const [msg, setMsg] = useState(null);
    const navigate = useNavigate();
    const problems = useSelector(state=>state.problems);
    useEffect(() => {
        setTimeout(() => setMsg(null), 1700);
    }, [msg]);

    const handleTagChange = (sel) => {
        //console.log(sel);
        dispatch(changeFilters({ type: "tag", tag: sel.target.value }));
    }

    const handleStatusChange = (sel) => {
        if (!user.isLoggedIn && (sel.target.value === "solvedbyme" || sel.target.value === "remaining")) {
            setMsg("Login or Signup to change status!");
            dispatch(changeFilters({ type: "status", status:"all"}));
            return;
        }
        dispatch(changeFilters({ type: "status", status: sel.target.value }));
    }

    const handleRandom = () =>{
        const index = Math.floor(Math.random()*(problems.length-1));
        navigate(`/insideproblem?id=${problems.at(index)._id}`);
    }

    return (
        <div className="rounded-2xl bg-white p-5 shadow-[0_10px_30px_rgba(0,0,0,0.08)] hover:shadow-[0_12px_40px_rgba(251,146,60,0.25)] transition-shadow">

            <h1 className="mb-4 text-2xl font-extrabold tracking-tight bg-gradient-to-r from-rose-500 to-orange-400 bg-clip-text text-transparent">
                Filter Box
            </h1>

            <h2 className="mb-1 text-sm font-semibold bg-gradient-to-r from-rose-500 to-orange-400 bg-clip-text text-transparent">
                Tag
            </h2>
            <select
                onChange={(e) => handleTagChange(e)}
                value={filters.tag}
                className="mb-4 w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-700 shadow-sm focus:border-orange-400 focus:outline-none focus:ring-2 focus:ring-orange-200"
            >
                <option value={"all"}>All</option>
                <option value={"easy"}>Easy</option>
                <option value={"medium"}>Medium</option>
                <option value={"hard"}>Hard</option>
            </select>

            <h2 className="mb-1 text-sm font-semibold bg-gradient-to-r from-rose-500 to-orange-400 bg-clip-text text-transparent">
                Status
            </h2>
            <select
                onChange={(e) => handleStatusChange(e)}
                value={filters.status}
                className="mb-5 w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-700 shadow-sm focus:border-orange-400 focus:outline-none focus:ring-2 focus:ring-orange-200"
            >
                <option value={"all"}>All</option>
                <option value={"solvedbyme"}>Solved By me</option>
                <option value={"remaining"}>Remaining</option>
            </select>

            <button className="w-full rounded-xl border border-orange-200 bg-white px-4 py-2 text-sm font-semibold bg-gradient-to-r from-rose-500 to-orange-400 bg-clip-text text-transparent shadow-sm transition hover:border-orange-300 hover:shadow-md active:scale-95"
                onClick={handleRandom}
            >
                Select a random problem
            </button>


            {msg && (
                <div className="mt-4 rounded-lg bg-orange-50 px-3 py-2 text-center text-sm font-medium text-orange-600 shadow-inner">
                    {msg}
                </div>
            )}
        </div>
    );


}

export default FilterBox