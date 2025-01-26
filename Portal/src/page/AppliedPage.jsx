import SideBar from '../components/SideBar';
import AppliedComponent from '../components/AppliedComponent';
import { useState } from 'react';

const AppliedPage = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="text-black h-screen flex flex-col dark:text-white dark:bg-slate-950">
      {/* Navbar */}
      <div className="flex items-center justify-between px-4 bg-white border-b border-gray-200 dark:bg-slate-800">
        <button
          className="p-2 text-blue-500 md:hidden"
          onClick={() => setIsSidebarOpen(true)}
        >
          <span className="material-symbols-outlined">menu</span>
        </button>
        <h1 className="text-xl font-semibold md:hidden">My Activity</h1>
      </div>

      {/* Main Content */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <div
          className={`fixed inset-y-0 left-0 z-40 w-64 bg-white border-r border-gray-200 transform transition-transform duration-300 ease-in-out 
            ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} 
            md:relative md:translate-x-0 md:w-[20vw]'`}
        >
          {/* Close Button */}
          <button
            className="absolute top-4 right-4 p-2 text-blue-500 md:hidden"
            onClick={() => setIsSidebarOpen(false)}
          >
            <span className="material-symbols-outlined">close</span>
          </button>

          {/* Sidebar Component */}
          <SideBar />
        </div>

        {/* Main Section */}
        <div className="flex-1 p-4 overflow-y-auto">
          <AppliedComponent />
        </div>
      </div>
    </div>
  );
};

export default AppliedPage;
