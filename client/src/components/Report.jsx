import React from 'react'

function Report({ report }) {

    const total = report.easy + report.medium + report.hard;
    const easypercentage = (report.easy/total)*360;
    const mediumpercentage = (report.medium/total)*360;
    const hardpercentage = (report.hard/total)*360;

    return (
  <div className="w-full h-full flex flex-col items-center justify-center gap-6 ">

    <div
      className="relative w-56 h-56 rounded-full shadow-md mt-10"
      style={{
        background: `conic-gradient(
          #3b82f6 0deg ${easypercentage}deg,
          #facc15 ${easypercentage}deg ${easypercentage + mediumpercentage}deg,
          #ef4444 ${easypercentage + mediumpercentage}deg 360deg
        )`
      }}
    >
      <div className="
        absolute inset-5
        rounded-full
        bg-white
        flex flex-col items-center justify-center
        text-slate-800
      ">
        <div className="text-3xl font-extrabold">
          {total}
        </div>
        <div className="text-xs font-semibold tracking-wide text-slate-500">
          SOLVED
        </div>
      </div>
    </div>

    <div className="flex gap-6 text-sm font-medium mb-15">

      <div className="flex items-center gap-2">
        <span className="w-3 h-3 rounded-full bg-blue-500" />
        <span className="text-slate-700">Easy ({report.easy})</span>
      </div>

      <div className="flex items-center gap-2">
        <span className="w-3 h-3 rounded-full bg-yellow-400" />
        <span className="text-slate-700">Medium ({report.medium})</span>
      </div>

      <div className="flex items-center gap-2">
        <span className="w-3 h-3 rounded-full bg-red-500" />
        <span className="text-slate-700">Hard ({report.hard})</span>
      </div>

    </div>

  </div>
);

}

export default Report