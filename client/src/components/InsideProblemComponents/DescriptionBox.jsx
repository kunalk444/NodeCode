import React from 'react'
import { useSelector } from 'react-redux';

function DescriptionBox({ solved }) {
    const descData = useSelector(state => state.insideProblem);
    if (Object.keys(descData).length == 0) return null;
    const desc_arr = descData?.description?.split(".");
    const testcases = descData?.testcases;
    const tag = descData?.difficulty;
    const return_type = descData?.return_type;
    const expected_output = descData?.expected_output;
    const title = descData?.title;


    return (
        <div
            className="w-full h-full overflow-y-auto
      bg-gradient-to-b from-white via-white to-rose-50/40
      border border-slate-200
      rounded-2xl
      shadow-lg shadow-slate-200/60
      text-slate-900"
        >
            <div
                className="px-10 pt-10 pb-9
        bg-white/85 backdrop-blur-xl
        border-b border-slate-200"
            >
                <div className="flex items-start justify-between mb-4">
                    <h1
                        className="text-4xl font-extrabold tracking-tight
            bg-gradient-to-r from-rose-500 to-orange-400
            bg-clip-text text-transparent"
                    >
                        {title}
                    </h1>

                    <div className="flex items-center gap-2">
                        <div
                            className="px-3 py-[4px] rounded-full
              text-[11px] font-semibold tracking-wide
              bg-rose-100 text-rose-600"
                        >
                            {tag}
                        </div>

                        {solved && (
                            <div
                                className="px-3 py-[4px] rounded-full
                text-[11px] font-semibold tracking-wide
                bg-emerald-100 text-emerald-700"
                            >
                                Solved
                            </div>
                        )}
                    </div>
                </div>

                <div className="text-[26px] font-semibold tracking-tight leading-tight text-slate-900">
                    Problem Description
                </div>
            </div>

            <div className="px-10 py-8">
                <div className="space-y-6 text-[15.5px] leading-[1.85] text-slate-700 max-w-[92%]">
                    {desc_arr &&
                        desc_arr.map(
                            (ele, index) =>
                                ele && (
                                    <p key={index}>
                                        {ele}.
                                    </p>
                                )
                        )}
                </div>

                {testcases?.length > 0 && (
                    <div className="my-12 h-px bg-gradient-to-r from-transparent via-slate-300 to-transparent" />
                )}

                <div className="space-y-7">
                    {testcases &&
                        testcases.map((ele, index) => (
                            <div
                                key={index}
                                className="group rounded-2xl
                bg-white
                border border-slate-200
                px-6 py-5
                shadow-sm
                hover:shadow-lg
                hover:border-rose-300
                transition-all"
                            >
                                <div className="flex items-center justify-between mb-3">
                                    <div className="text-[11px] font-semibold tracking-[0.2em] text-slate-500">
                                        EXAMPLE {index + 1}
                                    </div>

                                    <div className="w-2 h-2 rounded-full bg-gradient-to-br from-rose-400 to-orange-400 opacity-80" />
                                </div>

                                <div className="text-[14.5px] text-slate-800 leading-relaxed">
                                    <span className="font-semibold text-slate-900">
                                        Input:
                                    </span>{" "}
                                    {"[" + String(ele) + "]"}
                                </div>

                                <div className="text-[14.5px] text-slate-800 mt-2 leading-relaxed">
                                    <span className="font-semibold text-slate-900">
                                        Expected Output:
                                    </span>{" "}
                                    {expected_output.at(index) === ""
                                        ? '""'
                                        : JSON.stringify(expected_output.at(index))}
                                </div>
                            </div>
                        ))}
                </div>
            </div>
        </div>
    );

}

export default DescriptionBox
