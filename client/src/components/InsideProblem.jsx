import React, { useEffect } from 'react'
import { useSearchParams } from 'react-router-dom';
import { apiCallFunction } from '../helpers/apiHelper';
import EditorBox from './InsideProblemComponents/EditorBox';
import DescriptionBox from './InsideProblemComponents/DescriptionBox';
import { useDispatch, useSelector } from 'react-redux';
import { setProblemData } from './Slices/insideProblemSlice';
import Navbar from './Navbar';
import { useState,useRef } from 'react';

function InsideProblem() {
    const [search, setSearch] = useSearchParams();
    const dispatch = useDispatch();
    const [copyCode,setCopyCode] = useState(false);
    const codeData = useSelector(state=>state.code);
    const id = search.get("id");
    const iframeRef = useRef(null);
    const problemInfo = useSelector(state=>state.insideProblem);
    console.log(problemInfo)
    useEffect(() => {
        (async () => {
            const res = await apiCallFunction(`viewproblems/insideproblem/?id=${id}`, null, "GET");
            res && dispatch(setProblemData(res.data));
        })();
    }, []);

    function runCode(){
        setCopyCode(true);
        if(!iframeRef.current)return;
        const code = codeData?.code;
        if(!code)return;
        iframeRef.current.srcdoc=`
            <html>
                <body>
                    <h1 id="haha"></h1>
                    <script>
                        ${code}
                        const h1 = document.getElementById("haha");
                        const x = ${problemInfo["function_name"]}(${problemInfo["testcases"].at(0)});
                        h1.innerText = x;
                    </script>
                </body>
            </html>
        `;
    }

    return (
        <div className="h-[calc(100vh-56px)] flex flex-col">
            <Navbar />
            <div className="h-14 shrink-0 bg-white" />
            <div>
                <button
                    onClick={()=>runCode()}
                >
                    Run Code
                </button>
                <iframe ref = {iframeRef} sandbox='allow-scripts' id='code-sandbox'></iframe>
            </div>
            <div className="flex flex-1 gap-12 px-6 overflow-hidden">

                <div className="w-1/2 h-full border-r border-slate-200">
                    <DescriptionBox />
                </div>

                <div className="w-1/2 h-full">
                    <EditorBox id={id} copyCode={copyCode}/>
                </div>

            </div>
        </div>
    );


}

export default InsideProblem
