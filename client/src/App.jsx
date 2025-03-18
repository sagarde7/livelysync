import React from "react";
import TextEditor from "./TextEditor";
import "./style.css";
import Navbar from "./Navbar";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { v4 as uuidV4 } from "uuid";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to={`/documents/${uuidV4()}`} />} />
        <Route
          path="/documents/:id"
          element={
            <>
              <Navbar />
              <TextEditor />
            </>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
