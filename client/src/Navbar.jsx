import React, { useState } from 'react';
import Chat from './Chat';
import { useNavigate } from 'react-router-dom';

function Navbar() {
  const navigate = useNavigate();
  const [toggle, setToggle] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false); 
  
    
    React.useEffect(() => {
      if (isDarkMode) {
        document.body.classList.add('dark-mode');
        document.body.classList.remove('light-mode');
      } else {
        document.body.classList.add('light-mode');
        document.body.classList.remove('dark-mode');
      }
    }, [isDarkMode]);

  return (
    <>
      {/* Navbar */}
      <div className="navbar bg-gradient-to-r from-blue-800 to-gray-700 text-white flex justify-between items-center sticky top-0 z-15 px-6 py-3 shadow-md ">
        <div className="logo text-xl font-bold">LiveLySync - Real Time Documentation</div>
        <ul className="flex gap-4 mx-2 text-sm hover:cursor-pointer">
        <li className="hover:text-blue-200 hover:underline underline-offset-4 transition-colors duration-200 cursor-pointer"
        onClick={()=>{
          navigate("/")
        }}
        >Home</li>
          <li
            className="hover:text-blue-200 hover:underline underline-offset-4 transition-colors duration-200 cursor-pointer"
            onClick={() => window.print()}
          >
            Print
          </li>
          <li
            onClick={() => {
              setToggle(!toggle);
              console.log("Toggle State:", !toggle);
            }}
            className="hover:text-blue-200 hover:underline underline-offset-4 transition-colors duration-200 cursor-pointer"
          >
            Use AI
          </li>
          <li
            onClick={() => setIsDarkMode(!isDarkMode)}
            className="hover:text-blue-200 hover:underline underline-offset-4 transition-colors duration-200 cursor-pointer"
          >
            {isDarkMode ? 'Light Mode' : 'Dark Mode'}
          </li>
        </ul>
      </div>

      {/* Chat Component - Independent of Navbar */}
      {toggle && (
              <div className="chat-container">
                <Chat setToggle={setToggle} />
              </div>
            )}

    </>
  );
}

export default Navbar;
