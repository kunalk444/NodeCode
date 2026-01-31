import React from 'react'
import { useEffect } from 'react';
import { useSelector } from 'react-redux'
import { apiCallFunction } from '../helpers/apiHelper';
import { useState } from 'react';
import Navbar from './Navbar';
import { useNavigate } from 'react-router-dom';
import Report from './Report';

function ProgressPage() {
    const user = useSelector(state => state.user);
    const navigate = useNavigate();
    if (!user.isLoggedIn) return (<div>Login to view progress...</div>);
    const [progress, setProgress] = useState({});
    const[report,setReport] = useState({});

    useEffect(() => {
        (
            async () => {
                const res = await apiCallFunction("user/showprogress", null, "GET");
                if (res.success){
                    setProgress(res.progress);
                    setReport(res.report);
                }
            }
        )();
    }, []);

    const sortedProgress = progress
        ? Object.entries(progress).sort(
            (a, b) => b[1].timestamp - a[1].timestamp
        )
        : [];

    if(!progress)return(<div>Loading...</div>)
    return (

        <div className="min-h-screen bg-gradient-to-b from-rose-50/40 via-white to-white">

            <Navbar />

            <div className="max-w-[1200px] mx-auto px-6 py-8">

                <button
                    onClick={() => navigate(-1)}
                    className="
          mb-8
          flex items-center gap-2
          text-orange-600
          font-semibold
          hover:text-orange-700
          transition
        "
                >
                    <span className="
          inline-flex items-center justify-center
          w-8 h-8
          rounded-full
          bg-orange-100
          border border-orange-200
          hover:bg-orange-200
          transition
        ">
                        ←
                    </span>
                    Back
                </button>

                <div className="flex gap-10 items-start">

                    <div className="w-[60%]">

                        <h2 className="
            text-3xl font-extrabold
            bg-gradient-to-r from-rose-500 to-orange-400
            bg-clip-text text-transparent
            mb-6 
          ">
                            Progress Report
                        </h2>

                        {!progress && (
                            <p className="text-slate-500">
                                Nothing to see here😢
                                Start solving!
                            </p>
                        )}

                        {progress && (
                            <div className="
              overflow-hidden
              rounded-xl
              border border-orange-200
              bg-white
              shadow-sm
            ">
                                <table className="w-full text-sm">
                                    <thead className="bg-orange-50">
                                        <tr className="text-left text-orange-700">
                                            <th className="px-5 py-3 font-semibold">Problem</th>
                                            <th className="px-5 py-3 font-semibold">Message</th>
                                            <th className="px-5 py-3 font-semibold">Time</th>
                                            <th className="px-5 py-3 font-semibold text-center">Action</th>
                                        </tr>
                                    </thead>

                                    <tbody>
                                        {sortedProgress.map(([id, item], idx) => (
                                            <tr
                                                key={id}
                                                className={`
                        border-t
                        ${idx % 2 === 0 ? "bg-white" : "bg-orange-50/40"}
                        hover:bg-rose-50/40
                        transition
                      `}
                                            >
                                                <td className="px-5 py-4 font-medium text-slate-800">
                                                    {item.title}
                                                </td>

                                                <td className="px-5 py-4 text-slate-600">
                                                    {item.msg.length > 22
                                                        ? item.msg.slice(0, 22) + "..."
                                                        : item.msg}
                                                </td>

                                                <td className="px-5 py-4 text-slate-500 text-xs">
                                                    {new Date(item.timestamp).toLocaleString()}
                                                </td>

                                                <td className="px-5 py-4 text-center">
                                                    <button
                                                        onClick={() => navigate(`/insideproblem?id=${id}`)}
                                                        className="
                            px-3 py-1.5
                            text-xs font-semibold
                            rounded-md
                            bg-orange-100
                            text-orange-700
                            border border-orange-200
                            hover:bg-orange-200
                            transition
                          "
                                                    >
                                                        View Problem
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </div>

                    <div className="w-[40%] min-h-[300px] rounded-xl border border-dashed border-orange-200 bg-orange-50/30">
                        <Report report={report}/>
                    </div>

                </div>
            </div>
        </div>
    );


}

export default ProgressPage