import { useEffect, useRef } from "react";
import { EditorState } from "@codemirror/state";
import { EditorView, lineNumbers } from "@codemirror/view";
import { javascript } from "@codemirror/lang-javascript";
import { autocompletion } from "@codemirror/autocomplete";
import { oneDark } from "@codemirror/theme-one-dark";

export default function EditorBox({ code, setCode }) {
  const editorRef = useRef(null);
  const viewRef = useRef(null);

  useEffect(() => {
    const state = EditorState.create({
      doc: code,
      extensions: [
        lineNumbers(),
        javascript(),
        autocompletion(),
        oneDark,
        EditorView.updateListener.of((update) => {
          if (update.docChanged) {
            setCode(update.state.doc.toString());
          }
        }),
      ],
    });

    viewRef.current = new EditorView({
      state,
      parent: editorRef.current,
    });

    viewRef.current.focus();

    return () => viewRef.current.destroy();
  }, []);

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
          className="h-full w-full px-3 py-3"
        />
      </div>

    </div>
  );
}
