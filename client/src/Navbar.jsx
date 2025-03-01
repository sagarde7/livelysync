import React from 'react'

function Navbar() {
  return (
    <>
      <div className="navbar bg-gray-500 flex justify-between align-center sticky top-0 z-2 ">
        <div className="logo ">
            LiveLySync
        </div>
        <ul className='flex gap-2 mx-2 hover:cursor-pointer  '>
            <li className='hover:underline hover:decoration-pink-500'>Home</li>
            <li className='hover:underline hover:decoration-pink-500'
            onClick={()=>{
                window.print();
            }}
            >Print</li>
            <li className='hover:underline hover:decoration-pink-500'>Use AI</li>
        </ul>
      </div>
    </>
  )
}

export default Navbar
