import React, { useEffect } from "react";
import { apiCallFunction } from "../helpers/apiHelper";
import { saveProblems } from "./Slices/problemsSlice";
import { useSelector, useDispatch } from "react-redux";

function Problems() {
    const dispatch = useDispatch();
    const problems = useSelector(state => state.problems);

    useEffect(() => {
        (async () => {
            const res = await apiCallFunction("viewproblems/", null, "GET");
            dispatch(saveProblems(res.problems));
        })();
    }, []);

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

                {problems.map((p) => (
                    <a
                        key={p._id}
                        href={`/insideproblem?id=${p._id}`}
                        className="
                            group
                            flex items-center justify-between
                            px-4 py-2
                            rounded-lg
                            border border-slate-200
                            bg-white/80
                            hover:border-rose-300
                            hover:bg-rose-50/40
                            transition-all
                        "
                    >
                        <div className="flex items-center gap-3 min-w-0">
                            <span className="text-[11px] font-semibold text-slate-400">
                                #{p.serial_no}
                            </span>

                            <div className="min-w-0">
                                <h3 className="
                                    text-sm font-semibold text-slate-900
                                    group-hover:text-rose-500
                                    transition truncate
                                ">
                                    {p.title}
                                </h3>
                                <p className="text-[11px] text-slate-500">
                                    Algorithms • Interview Ready
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
        </div>
    );
}

export default Problems;
