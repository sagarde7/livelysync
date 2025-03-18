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
          matchers: [
            [Node.ELEMENT_NODE, (node, delta) => {
              delta.ops.forEach(op => {
                if (op.attributes && op.attributes.color) {
                  delete op.attributes.color; // Remove forced text color
                }
              });
              return delta;
            }]
          ]
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
      <div id='container' className="relative p-4 dark-theme"></div>
    </>
  );
}

export default TextEditor;
