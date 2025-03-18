import React, { useEffect } from 'react';
import Quill from 'quill';
import "quill/dist/quill.snow.css";
import "./style.css";

const TOOLBAR_OPTIONS = [
  [{ header: [1, 2, 3, 4, 5, 6, false] }],
  [{ font: [] }],
  [{ size: ["small", false, "large", "huge"] }],
  ["bold", "italic", "underline", "strike"],
  [{ color: [] }, { background: [] }],
  [{ script: "sub" }, { script: "super" }],
  [{ list: "ordered" }, { list: "bullet" }],
  [{ indent: "-1" }, { indent: "+1" }],
  [{ align: [] }],
  ["blockquote", "code-block"],
  ["image", "video", "link"],
  ["clean"]
];

function TextEditor() {
  useEffect(() => {
    const quill = new Quill("#container", { 
      theme: "snow", 
      modules: { 
        toolbar: TOOLBAR_OPTIONS,
        clipboard: {
          matchVisual: false,
        }
      } 
    });

    document.addEventListener('copy', (e) => {
      const selection = document.getSelection();
      if (selection) {
        const text = selection.toString(); 
        e.clipboardData.setData('text/plain', text); 
        e.preventDefault();
      }
    });
    
    quill.focus();

  }, []);

  return (
    <>
      <div id='container' className="relative p-4 "></div>
    </>
  );
}

export default TextEditor;
