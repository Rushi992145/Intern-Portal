import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import SideBar from '../components/SideBar';
import PostForm from '../components/PostForm';


const HomePage = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);


  return (
    <div className="text-black h-screen flex flex-col">
      <Navbar />

      <div className="flex flex-1 overflow-hidden relative ">
        
        {!isSidebarOpen && (
          <div className="md:hidden p-10">
          <button
            className="absolute top-4 left-4 md:hidden p-2  text-blue-500"
            onClick={() => setIsSidebarOpen(true)}
          >
            <span className="material-symbols-outlined">menu</span>
          </button>
          </div>
        )}
       
        <div
          className={`fixed inset-y-0 left-0 w-64 bg-white border-r border-gray-200 transform transition-transform duration-300 ease-in-out 
                      ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} 
                      md:relative md:translate-x-0 md:w-[20vw]`}
        >
          {isSidebarOpen && (
            <button
              className="absolute top-4 right-4 md:hidden p-2 text-blue-500"
              onClick={() => setIsSidebarOpen(false)}
            >
              <span className="material-symbols-outlined">close</span>
            </button>
          )}
          <SideBar />
        </div>

        <div className="flex-1 p-4 overflow-y-auto">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-xl font-semibold">Main Contents</h1> 
             <PostForm />
          </div>
          <p>Explore the main content here...</p>
        </div>

        <div className="hidden lg:block w-[25vw] p-4 border-l border-gray-200">
          Side contents
        </div>
      </div>
    </div>
  );
};

export default HomePage;
