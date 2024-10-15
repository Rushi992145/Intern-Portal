import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import SideBar from '../components/SideBar';
import PostTemplate from '../components/PostTemplate';

const FullTimeJobsPage = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    return (
        <div className='text-black h-screen flex flex-col'>
            <Navbar />
            <div className='flex flex-1 overflow-hidden'>
                <div className={`hidden md:block w-[20vw] border-r border-gray-200`}>
                    <SideBar />
                </div>

                <button
                    className='md:hidden p-2 text-blue-500'
                    onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                >
                    {isSidebarOpen ? 'Close Menu' : 'Open Menu'}
                </button>

                <div
                    className={`fixed inset-y-0 left-0 w-64 bg-white border-r border-gray-200 transition-transform duration-300 transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}
                >
                    <SideBar />
                </div>
                <div className="flex-1 p-4 overflow-y-auto">
                    <div className="space-y-4">
                        <PostTemplate />
                        <PostTemplate />
                        <PostTemplate />
                        <PostTemplate />
                        <PostTemplate />
                        <PostTemplate />
                        <PostTemplate />
                    </div>
                </div>

                <div className="hidden md:block w-[25vw] md:w-[20vw] p-4 border-l border-gray-200">
                    Filter
                </div>
            </div>
        </div>
    );
};

export default FullTimeJobsPage;
