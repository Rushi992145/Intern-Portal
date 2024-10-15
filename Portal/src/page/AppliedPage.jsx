import React from 'react';
import Navbar from '../components/Navbar';
import SideBar from '../components/SideBar';
import AppliedComponent from '../components/AppliedComponent';

const AppliedPage = () => {
  return (
    <div className='text-black h-screen flex flex-col'>
      <Navbar />
      <div className='flex flex-1'>

        <div className="w-[20vw] border-r border-gray-200">
          <SideBar />
        </div>

        <div className="w-[80vw] p-4">
          <AppliedComponent/>
        </div>
 
      </div>
    </div>
  );
};

export default AppliedPage;
