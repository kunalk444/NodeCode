import React, { useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom';
import { apiCallFunction } from '../helpers/apiHelper';
import EditorBox from './InsideProblemComponents/EditorBox';
import DescriptionBox from './InsideProblemComponents/DescriptionBox';
import { useDispatch, useSelector } from 'react-redux';
import { removeProblemData, setProblemData } from './Slices/insideProblemSlice';
import Navbar from './Navbar';
import { useState,useRef } from 'react';
import { writeJS } from './InsideProblemComponents/helper';
import { delCode } from './Slices/codeSlice';

//used shouldrun usestate to actually know that react updated the state and iframeid was also changed,hence no
//previous code run...comment is not llm


function InsideProblem() {
    const [search, setSearch] = useSearchParams();
    const navigate = useNavigate();
    const iframeRef = useRef(null);
    const dispatch = useDispatch();
    const [copyCode,setCopyCode] = useState(false);
    const codeData = useSelector(state=>state.code);
    const isDataLoaded = useSelector(state=>state.insideProblem.success);
    const id = search.get("id");
    const [iframeId,setIframeId] = useState(0);
    const [shouldRun,setShouldRun] = useState(false);

    const problemInfo = useSelector(state=>state.insideProblem);
    const timer = useRef(null);
    useEffect(() => {
        (async () => {
            const res = await apiCallFunction(`viewproblems/insideproblem/?id=${id}`, null, "GET");
            dispatch(setProblemData(res.data));
        })();
        
        const handler = (res)=>{
            if(!res?.data)return;
            if (res.source !== iframeRef.current?.contentWindow) return;
            setShouldRun(false);
            console.log(res.data);
            if(res.data.type==="result"){
               // console.log("on result:",{...res?.data,iframeid:iframeId});
                clearTimeout(timer.current);
            }
            if(res.data.type === "Error"){
                clearTimeout(timer.current);
            }
        }
        window.addEventListener("message",handler);
        return ()=>window.removeEventListener("message",handler);
    }, []);

    useEffect(()=>{
        if(!shouldRun || !iframeRef.current)return;
        setTimeout(()=>{
            const code = codeData?.code;
            iframeRef.current.srcdoc = writeJS(code,problemInfo);
            setCopyCode(false);
        },0);
    },[shouldRun,iframeId,codeData]);

    function runCode(){
        setCopyCode(true);
        setShouldRun(true);
        setIframeId(prev=>prev+1);
        clearTimeout(timer.current);
        timer.current = setTimeout(()=>{
            setShouldRun(false);
            setIframeId(prev=>prev+1);
            console.log("took too long to load ans!");
        },3000);
    }
    if(!isDataLoaded)return (<div>Loading....</div>);
    return (
        <div className="h-screen flex flex-col">
            <Navbar />
            <button
                onClick={()=>{
                    dispatch(delCode());
                    dispatch(removeProblemData());
                    navigate("/");
                }}
            >
                GO BACK
            </button>
            <div className="h-14 shrink-0 bg-white" />
            <div>
                <button
                    onClick={()=>runCode()}
                >
                    Run Code
                </button>
            </div>
            <div className="flex flex-1 gap-12 px-6 overflow-hidden">

                <div className="w-1/2 h-full border-r border-slate-200">
                    <DescriptionBox />
                </div>

                <div className="w-1/2 h-full">
                    <EditorBox id={id} copyCode={copyCode}/>
                </div>

            </div>
            <iframe 
            ref={iframeRef} 
            sandbox='allow-scripts' 
            id='code-sandbox' 
            //style={{display:"none"}}
            key={iframeId}
            ></iframe>
        </div>
    );


}

export default InsideProblem
