import React from 'react';
import Navbar from '../components/Navbar';
import SideBar from '../components/SideBar';

const HomePage = () => {
  return (
    <div className='text-black h-screen flex flex-col'>
      <Navbar />
      <div className='flex flex-1'>

        <div className="w-[20vw] border-r border-gray-200">
          <SideBar />
        </div>

        <div className="w-[55vw] p-4">
          Main contents
        </div>

        <div className="w-[25vw] p-4 border-l border-gray-200">
          Side contents
        </div>
      </div>
    </div>
  );
};

export default HomePage;
