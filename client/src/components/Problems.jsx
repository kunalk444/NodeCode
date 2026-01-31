import React, { useEffect } from "react";
import { apiCallFunction } from "../helpers/apiHelper";
import { saveProblems } from "./Slices/problemsSlice";
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";

function Problems() {
    const dispatch = useDispatch();
    const problems = useSelector(state => state.problems);
    const filters = useSelector(state => state.filters);
    const [currentPage, setCurrentPage] = useState(1);
    const [total, setTotal] = useState([]);

    // useEffect(() => {
    //     (async () => {
    //         const res = await apiCallFunction(
    //             `viewproblems?status=${filters.status}&tag=${filters.tag}&currentpage=${currentPage}&limit=10`,
    //              null, 
    //              "GET");
    //         dispatch(saveProblems(res.problems));
    //         setTotal(res.total);
    //         pages = Array.from({length:(res.total/10)},(_,i) => i+1);
    //         console.log(pages);
    //     })();
    // }, [filters]);

    useEffect(() => {
        (async () => {
            const res = await apiCallFunction(
                `viewproblems?status=${filters.status}&tag=${filters.tag}&currentpage=${currentPage}&limit=10`
                , null,
                "GET");
            dispatch(saveProblems(res.problems));
            console.log(res.total);
            const pages = Array.from({ length: (Math.ceil(res.total / 10)) }, (_, i) => i + 1);
            setTotal(pages);
            if(currentPage > (Math.ceil(res.total / 10)))setCurrentPage(1);
        })();
    }, [filters, currentPage]);

    const difficultyBadge = (difficulty) => {
        if (difficulty === "easy")
            return "bg-emerald-500/10 text-emerald-600 ring-emerald-400/30";
        if (difficulty === "medium")
            return "bg-amber-500/10 text-amber-600 ring-amber-400/30";
        if (difficulty === "hard")
            return "bg-rose-500/10 text-rose-600 ring-rose-400/30";
        return "bg-slate-500/10 text-slate-600 ring-slate-400/30";
    };

    return (
        <div className="max-w-[800px] mx-auto px-6 py-8 bg-gradient-to-b from-rose-50/40 via-white to-white">

            <div className="mb-8 text-center">
                <h1 className="text-4xl font-extrabold tracking-tight bg-gradient-to-r from-rose-500 to-orange-400 bg-clip-text text-transparent">
                    Problem Set
                </h1>
                <p className="mt-2 text-sm text-slate-600">
                    Practice smarter. Build speed. Crack interviews.
                </p>
            </div>

            <div className="grid gap-2">
                {
                    problems && problems.length === 0
                    ?
                    <div>
                        <p>Takes Approx 40-50 secs to load!⌛</p>
                        <p>Looks so empty!🫤</p>
                    </div>
                :
                problems.map((p) => (
                    <a
                        key={p._id}
                        href={`/insideproblem?id=${p._id}`}
                        className="
                        group
                        flex items-center justify-between
                        px-6 py-4
                        rounded-xl
                        border border-slate-200
                        bg-white
                        hover:border-rose-300
                        hover:bg-rose-50/40
                        transition-all
                        shadow-sm
                        hover:shadow-md
                    "
                    >

                        <div className="flex items-center gap-3 min-w-0">
                            <span className="text-[11px] font-semibold text-slate-400">
                                #{p.serial_no}
                            </span>

                            <div className="min-w-0">
                                <h3 className="
                                    text-base font-semibold text-slate-900
                                    group-hover:text-rose-500
                                    transition truncate
                                    ">
                                    {p.title}
                                </h3>

                                <p className="text-[11px] text-slate-500">
                                    Algorithms • Custom-made
                                </p>
                            </div>
                        </div>

                        <span
                            className={`
                                text-[11px] font-semibold
                                px-2.5 py-1
                                rounded-full
                                ring-1
                                ${difficultyBadge(p.difficulty)}
                            `}
                        >
                            {p.difficulty}
                        </span>
                    </a>
                ))}

            </div>
            <div className="mt-10 flex justify-center gap-2 flex-wrap">
                {
                    total &&
                    total.map((i) => (
                        <button
                            key={i}
                            onClick={() => setCurrentPage(i)}
                            disabled={i === currentPage}
                            className={`
                            min-w-[38px] h-10 px-3
                            rounded-lg
                            text-sm font-semibold
                            border
                            transition-all
                            ${i === currentPage? `
                                    bg-gradient-to-r from-rose-500 to-orange-400
                                    text-white
                                    border-orange-400
                                    shadow-md
                                    cursor-not-allowed
                                `
                                : `
                                    bg-orange-50
                                    text-orange-600
                                    border-orange-200
                                    hover:bg-orange-100
                                    hover:border-orange-400
                                    hover:text-orange-700
                                `
                                }`}
                        >
                            {i}
                        </button>
                    ))
                }
            </div>


        </div>
    );
}

export default Problems;
