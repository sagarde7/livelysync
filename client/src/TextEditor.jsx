import React, { useEffect, useState } from "react";
import Quill from "quill";
import "quill/dist/quill.snow.css";
import "./style.css";
import io from "socket.io-client";
import { useParams } from "react-router-dom";

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
  ["clean"],
];

function TextEditor() {
  const {id: documentId}=useParams();
  const [socket, setSocket] = useState();
  const [quillback, setQuillback] = useState();
  
  
  useEffect(() => {
    const quill = new Quill("#container", {
      theme: "snow",
      modules: {
        toolbar: TOOLBAR_OPTIONS,
        clipboard: {
          matchVisual: false,
          matchers: [
            [Node.ELEMENT_NODE, (node, delta) => {
              delta.ops.forEach((op) => {
                if (op.attributes && op.attributes.color) {
                  delete op.attributes.color; // Remove forced text color
                }
              });
              return delta;
            }],
          ],
        },
      },
    });

    quill.focus();
    quill.disable();
    quill.setText("Loading....");
    setQuillback(quill);
    

    const s = io("https://livelysyncingserver.onrender.com");
    setSocket(s);

    return () => {
      s.disconnect();
    };
  }, []);
  useEffect(() => {
    if (socket == null || quillback == null) {
      return;
    }
    socket.on("load-document",document=>{
      quillback.setContents(document);
      quillback.enable();
      quillback.focus();
    })
    socket.emit("get-document",documentId)
    return () => {
      
    }
  }, [socket,quillback,documentId])
  

  useEffect(() => {
    if (socket == null || quillback == null) {
      return;
    }

    const handler = (delta, oldDelta, source) => {
      if (source !== "user") {
        return;
      }
      socket.emit("send-changes", delta);
    };

    quillback.on("text-change", handler);

    return () => {
      quillback.off("text-change", handler);
    };
  }, [socket, quillback]);

  useEffect(() => {
    if (socket == null || quillback == null) {
      return;
    }
    const interval=setInterval(()=>{
      socket.emit("save-document",quillback.getContents())
    },2000)

    return()=>{
      clearInterval(interval);
    }
    
  }, [socket, quillback]);


  useEffect(() => {
    if (socket == null || quillback == null) {
      return;
    }

    const handler = (delta) => {
      quillback.updateContents(delta)
    };

    socket.on("receive-changes", handler);

    return () => {
      socket.off("receive-changes", handler);
    };
  }, [socket, quillback]);

  useEffect(() => {
    const copyHandler = (e) => {
      const selection = document.getSelection();
      if (selection) {
        const text = selection.toString();
        e.clipboardData.setData("text/plain", text);
        e.preventDefault();
      }
    };

    document.addEventListener("copy", copyHandler);

    return () => {
      document.removeEventListener("copy", copyHandler);
    };
  }, []);

  return (
    <>
      <div id="container" className="relative p-4 dark-theme"></div>
    </>
  );
}

export default TextEditor;