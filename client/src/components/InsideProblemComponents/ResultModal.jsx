import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { apiCallFunction } from '../../helpers/apiHelper';

function ResultModal({msg,success,type,stopShow,problemId}) {
    const user = useSelector(state => state.user);
    const formattedMsg =
        (type === "Result" && !success)
            ?
            msg = msg.substring(0, msg.indexOf("Expected")) +
            "\n" +
            msg.substring(msg.indexOf("Expected"), msg.indexOf("Your")) +
            "\n" +
            msg.substring(msg.indexOf("Your"))
            : msg;
    useEffect(()=>{
        (
            async()=>{
                const res = await apiCallFunction("user/progress",{msg,success,type,problemId},"POST");
                console.log(res);
            }
        )();
    },[]);
    return (
        <>
            <div className="fixed inset-0 bg-black/50 backdrop-blur-md z-40 transition-opacity duration-300" />

            <div className="fixed inset-0 flex items-center justify-center z-50 px-4 sm:px-6">
                <div 
                    className={`
                        w-full max-w-md bg-gradient-to-b from-white to-slate-50/90 
                        rounded-2xl shadow-2xl overflow-hidden
                        border ${success ? 'border-orange-200/70' : 'border-rose-200/60'}
                        transform transition-all duration-300 scale-100
                    `}
                >
                    <div className={`
                        px-6 py-4 flex items-center justify-between
                        ${success 
                            ? 'bg-gradient-to-r from-amber-50 via-orange-50 to-rose-50/70' 
                            : 'bg-gradient-to-r from-rose-50 to-rose-100/40'}
                        border-b ${success ? 'border-orange-100' : 'border-rose-100'}
                    `}>
                        <h2 className={`
                            text-lg font-semibold tracking-tight
                            ${success ? 'text-orange-700' : 'text-rose-600'}
                        `}>
                            {type === "Result"
                                ? success ? "Great Job!" : "So Close!"
                                : "Error"}
                        </h2>

                        <button
                            onClick={() => stopShow()}
                            className="text-slate-500 hover:text-slate-800 text-xl font-medium leading-none transition-colors"
                            aria-label="Close"
                        >
                            ×
                        </button>
                    </div>

                    <div className="px-6 py-5">
                        {success && (
                            <p className="text-sm text-slate-700 font-medium mb-4 leading-relaxed">
                                Hey {user.name}, you nailed it — all testcases passed! 🎉
                            </p>
                        )}

                        <div className="text-sm text-slate-800 whitespace-pre-line leading-6 font-mono bg-slate-50/70 p-4 rounded-lg border border-slate-200/80">
                            {formattedMsg}
                        </div>
                    </div>

                    <div className={`
                        h-1.5 bg-gradient-to-r
                        ${success 
                            ? 'from-orange-400 via-amber-400 to-rose-400' 
                            : 'from-rose-400 to-rose-500'}
                    `} />
                </div>
            </div>
        </>
    );
}

export default ResultModal;