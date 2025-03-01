import React from 'react'
import Quill from 'quill'
import { useEffect } from 'react'
import "quill/dist/quill.snow.css"
import "./style.css"

const TOOLBAR_OPTIONS = [
  [{ header: [1, 2, 3, 4, 5, 6, false] }], // Heading levels
  [{ font: [] }], // Font selection
  [{ size: ["small", false, "large", "huge"] }], // Font sizes
  ["bold", "italic", "underline", "strike"], // Text styling
  [{ color: [] }, { background: [] }], // Text & background colors
  [{ script: "sub" }, { script: "super" }], // Subscript & Superscript
  [{ list: "ordered" }, { list: "bullet" }], // Lists
  [{ indent: "-1" }, { indent: "+1" }], // Indentation
  [{ align: [] }], // Alignment
  ["blockquote", "code-block"], // Block elements
  ["image", "video", "link"], // Media options
  ["clean"], // Remove formatting
  
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
