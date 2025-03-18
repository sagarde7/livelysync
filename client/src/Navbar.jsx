import React, { useState } from 'react';
import Chat from './Chat';

function Navbar() {
  const [toggle, setToggle] = useState(false);

  return (
    <>
      {/* Navbar */}
      <div className="navbar bg-gray-500 flex justify-between items-center sticky top-0 z-10 p-4">
        <div className="logo">LiveLySync - Real Time Documentation</div>
        <ul className="flex gap-4 mx-2 hover:cursor-pointer">
          <li className="hover:underline hover:decoration-pink-500">Home</li>
          <li
            className="hover:underline hover:decoration-pink-500"
            onClick={() => window.print()}
          >
            Print
          </li>
          <li
            onClick={() => {
              setToggle(!toggle);
              console.log("Toggle State:", !toggle);
            }}
            className="hover:underline hover:decoration-pink-500"
          >
            Use AI
          </li>
        </ul>
      </div>

      {/* Chat Component - Independent of Navbar */}
      {toggle && (
    <Chat setToggle={setToggle}/>
  
)}

    </>
  );
}

export default Navbar;
