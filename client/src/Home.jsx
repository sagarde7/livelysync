import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "/finisher-header.es5.min.js"; 
    script.type = "text/javascript";
    script.onload = () => {
      new window.FinisherHeader({
        count: 90,
        size: {
          min: 1,
          max: 12,
          pulse: 0.1,
        },
        speed: {
          x: { min: 0, max: 0.4 },
          y: { min: 0, max: 0.3 },
        },
        colors: {
          background: "#1a202c",
          particles: ["#ffffff", "#298eb5", "#acaaff"],
        },
        blending: "screen",
        opacity: {
          center: 0.05,
          edge: 0.4,
        },
        skew: 0,
        shapes: ["c"],
      });
    };
    document.body.appendChild(script);
  }, []);
  const [link,setLink]=useState();
  const handleChange=(e)=>{
    setLink(e.target.value);
  }



  return (
    <div className="header finisher-header w-full h-screen relative overflow-hidden ">
      <div className="box flex flex-col md:flex-row justify-around mt-[10vh] md:mt-[30vh] h-full w-full gap-2">
        <div className="left w-full md:w-1/2">
          <div className=" text-2xl sm:text-3xl md:text-4xl text-center">
            Real Time Documentation at
          </div>
          <div className="text-blue-300 text-2xl font-bold sm:text-3xl md:text-4xl text-center">
            LiveLySync
          </div>
          <div className="text-lg sm:text-xl md:text-2xl text-center">
            Note-making | Documentation | AI Integrated
          </div>

          <div className="input text-center mt-5">
            <input
              type="text"
              placeholder="Type what you want in link"
              className="h-10 w-[90%] sm:w-[80%] md:w-2/3 border-2 rounded-2xl text-center text-white bg-transparent placeholder-white"
              value={link}
              onChange={handleChange}
            
            />

          </div>

          <div className="buttons flex flex-col sm:flex-row justify-center items-center mt-5 gap-3 text-center">
            <button className="border-white bg-[#122051] border-2 rounded-2xl h-12 w-40 hover:cursor-pointer text-center disabled:opacity-70 disabled:cursor-default"
              onClick={()=>{
                navigate(`/documents/${link}`);
              }
            }
            disabled={!link}
            >
              Create Own
            </button>
            <button className="border-white bg-[#122051] border-2 rounded-2xl h-12 w-40 hover:cursor-pointer text-center"
            onClick={()=>{
              navigate(`/documents/`);
            }}
            >
              Create Random
            </button>
          </div>
        </div>

        <div className="right w-full md:w-1/2 flex justify-center mt-10 md:mt-0">
          <img
            src="image.jpg"
            alt=""
            className="h-40 w-2xl sm:h-48 sm:w-48 md:h-52 md:w-2xl rounded-2xl"
          />
        </div>
      </div>
    </div>
  );
};

export default Home;
