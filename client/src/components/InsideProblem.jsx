import React, { useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom';
import { apiCallFunction } from '../helpers/apiHelper';
import EditorBox from './InsideProblemComponents/EditorBox';
import DescriptionBox from './InsideProblemComponents/DescriptionBox';
import { useDispatch, useSelector } from 'react-redux';
import { removeProblemData, setProblemData } from './Slices/insideProblemSlice';
import Navbar from './Navbar';
import { useState, useRef } from 'react';
import { sanitizeCode, writeJS } from './InsideProblemComponents/helper';
import { delCode } from './Slices/codeSlice';

//used shouldrun usestate to actually know that react updated the state and iframeid was also changed,hence no
//previous code run...comment is not llm


function InsideProblem() {
    const [search, setSearch] = useSearchParams();
    const navigate = useNavigate();
    const iframeRef = useRef(null);
    const dispatch = useDispatch();
    const [copyCode, setCopyCode] = useState(false);
    const codeData = useSelector(state => state.code);
    const isDataLoaded = useSelector(state => state.insideProblem.success);
    const id = search.get("id");
    const [shouldRun, setShouldRun] = useState(false);
    const [msg, setMsg] = useState(null);
    const user = useSelector(state => state.user);

    const problemInfo = useSelector(state => state.insideProblem);
    const timer = useRef(null);
    useEffect(() => {
        (async () => {
            const res = await apiCallFunction(`viewproblems/insideproblem/?id=${id}`, null, "GET");
            dispatch(setProblemData(res.data));
        })();

        const handler = (res) => {
            iframeRef.current.srcdoc = "";
            if (!res?.data) return;
            if (res.source !== iframeRef.current?.contentWindow) return;
            //if(res.data.iframeId !== iframeId)return;
            //setShouldRun(false);
            console.log(res.data);
            clearTimeout(timer.current);
            if (res.data.type === "result") {
            }
            if (res.data.type === "Error") {
            }
        }

        window.addEventListener("message", handler);
        return () => window.removeEventListener("message", handler);

    }, []);

    function runCode(){
        if(!user.isLoggedIn){
            setMsg("Login or Signup to Run Code!");
            return;
        }
        setCopyCode(true);
        setShouldRun(true);
    }

    

    useEffect(()=>{
        if(msg)setTimeout(()=>setMsg(null),1800);
    },[msg]);

    useEffect(()=>{
        setCopyCode(false);
        if(!shouldRun)return;
        if(!codeData?.code)return;
        setShouldRun(false);
        dispatch(delCode());
        //iframeRef.current.srcdoc = "";
        const code = codeData?.code;
        if(!code){
            iframeRef.current.srcdoc = "";
            return;
        }
        const ifSanitized = sanitizeCode(code);
        if(!ifSanitized.success){
            setMsg(`refrain from using the keyword:${ifSanitized.key}`);
            return;
        }

        iframeRef.current.srcdoc = writeJS(code,problemInfo);

        timer.current = setTimeout(()=>{
            setMsg("took too long to execute!try again later..");
            iframeRef.current.srcdoc = "";
        },5000);
    },[shouldRun,codeData?.code])

    
    if (!isDataLoaded) return (<div>Loading....</div>);
    return (
        <div className="h-screen flex flex-col">
            <Navbar />

            {msg && (
                <div className="px-6 mt-3">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-[13px] font-medium 
            bg-gradient-to-r from-orange-50 to-rose-50 text-rose-600 border border-rose-200">
                        {msg}
                    </div>
                </div>
            )}

            <div className="h-14 shrink-0 flex items-center justify-between px-6 bg-white border-b border-slate-200">
                <button
                    onClick={() => {
                        dispatch(delCode());
                        dispatch(removeProblemData());
                        navigate("/");
                    }}
                    className="flex items-center gap-2 text-sm font-medium text-rose-500 hover:text-rose-600 transition"
                >
                    <span className="text-lg leading-none">←</span>
                    <span>Back</span>
                </button>

                <button
                    onClick={() => runCode()}
                    className="px-5 py-2 rounded-md text-sm font-medium text-white bg-gradient-to-r from-rose-500 to-orange-400 hover:opacity-90 transition"
                >
                    Run Code
                </button>
            </div>

            <div className="flex flex-1 gap-12 px-6 overflow-hidden">
                <div className="w-1/2 h-full border-r border-slate-200">
                    <DescriptionBox />
                </div>

                <div className="w-1/2 h-full">
                    <EditorBox id={id} copyCode={copyCode} />
                </div>
            </div>

            <iframe
                ref={iframeRef}
                sandbox="allow-scripts"
                id="code-sandbox"
                style={{ display: "none" }}
            />
        </div>
    );
}

export default InsideProblem
