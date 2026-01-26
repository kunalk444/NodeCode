import { useEffect, useRef, useState } from "react";
import { EditorState } from "@codemirror/state";
import { EditorView, lineNumbers } from "@codemirror/view";
import { javascript } from "@codemirror/lang-javascript";
import { autocompletion } from "@codemirror/autocomplete";
import { oneDark } from "@codemirror/theme-one-dark";
import { useDispatch, useSelector } from "react-redux";
import { deriveFunction } from "./helper";
import { delCode, saveCode } from "../Slices/codeSlice";

export default function EditorBox({id,copyCode}) {
  const editorRef = useRef(null);
  const viewRef = useRef(null);
  const code = useRef(null);
  const func_name = useSelector(state=>state.insideProblem.function_name);
  const parameter = useSelector(state=>state.insideProblem.parameter_type);
  const testcases = useSelector(state=>state.insideProblem.testcases);
  const derive = deriveFunction(func_name,parameter);
  const dispatch = useDispatch();
  useEffect(() => {
  code.current = derive;
  const paddingTheme = EditorView.theme({
    ".cm-scroller": {
      paddingTop: "0.75rem",
      paddingBottom: "0.75rem",
      paddingLeft: "0.75rem",
      paddingRight: "0.75rem",
    }
  });

  const state = EditorState.create({
    doc: code.current,
    extensions: [
      lineNumbers(),
      javascript(),
      autocompletion(),
      oneDark,
      paddingTheme,
      EditorView.updateListener.of((update) => {
        if (update.docChanged) {
          code.current =  update.state.doc.toString();
        }
      }),
    ],
  });

  viewRef.current = new EditorView({
  state,
  parent: editorRef.current
  });

   return () => {
    viewRef.current?.destroy();
    viewRef.current = null;
  };

}, []);

 useEffect(()=>{
    if(copyCode){
      const obj = {id,code:code.current};
      dispatch(saveCode(obj));
    }
  },[copyCode])

  if(!func_name)return null;

  return (
    <div className="h-full w-full flex flex-col overflow-hidden rounded-2xl shadow-lg">

      <div className="h-11 shrink-0 flex items-center px-4
                      bg-slate-900 text-slate-300
                      border-b border-slate-700
                      text-[13px]">
        JavaScript
      </div>

      <div className="flex-1 bg-[#1e1e1e] overflow-hidden">
        <div
          ref={editorRef}
          className="h-full w-full"
        />
      </div>

    </div>
  );
}