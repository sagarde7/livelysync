import React from 'react'
import Quill from 'quill'
import { useEffect } from 'react'
import "quill/dist/quill.snow.css"
import "./style.css"

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
    const quill = new Quill("#container", { theme: "snow", modules: { toolbar: TOOLBAR_OPTIONS } });

   

  }, []);

 

  return (
    <>
      <div id='container'></div>
      
    </>
  )
}

export default TextEditor
