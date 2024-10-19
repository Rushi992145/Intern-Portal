import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import SideBar from '../components/SideBar';
import yourImage from '../assets/homepage_banner.jpg';

const HomePage = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="text-gray-800 h-screen flex flex-col font-sans bg-gray-50">
      <Navbar />

      <div className="flex flex-1 overflow-hidden relative">
        {!isSidebarOpen && (
          <div className="md:hidden p-10">
            <button
              className="absolute top-4 left-4 md:hidden p-2 text-blue-500"
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
          {/* Internship Portal UI starts here */}
          <div className="max-w-3xl mx-auto mt-10 bg-white p-6 rounded-lg shadow-xl text-center border border-gray-200">
            {/* Top image placeholder */}
            <div
              className="w-full h-40 rounded-t-lg mb-6"
              style={{
                backgroundImage: `url(${yourImage})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
            ></div>

            <h1 className="text-2xl font-bold mb-2 text-blue-900">Welcome to the</h1>
            <h2 className="text-4xl text-blue-800 font-extrabold mb-4">InternNet Portal!</h2>
            <p className="text-base text-gray-600 mb-4">
              Post Your Internship or Job Vacancy in Minutes!
            </p>

            {/* Section: Two Cards for the Following Content */}
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* First Card (Looking for fresh talent section) */}
              <div className="bg-white shadow-lg p-5 rounded-lg border border-gray-200 hover:shadow-xl transition duration-300 ease-in-out">
                <h3 className="text-xl font-bold mb-2 text-blue-700">Looking for fresh talent?</h3>
                <p className="text-sm text-gray-700">
                  Post your <strong>internship or job openings</strong> today and connect with a diverse pool of eager students
                  and professionals looking to kick-start their careers.
                </p>
              </div>

              {/* Second Card (Why Post with Us section) */}
              <div className="bg-white shadow-lg p-5 rounded-lg border border-gray-200 hover:shadow-xl transition duration-300 ease-in-out">
                <h3 className="text-xl font-bold mb-2 text-blue-700">Why Post with Us?</h3>
                <ul className="list-none text-sm text-gray-700">
                  <li className="mb-2">Effortless job posting with customizable options to highlight the skills you need.</li>
                  <li>Manage and track your postings in real-time with our easy-to-use dashboard.</li>
                </ul>
              </div>
              
            </div>
            {/* End of Two Cards */}

            {/* Post a Job/Internship button */}
            <div className="mt-8">
              <button className="bg-blue-600 text-white px-6 py-3 rounded-md text-md font-semibold shadow-lg hover:bg-blue-700 transition duration-300">
                Post a Job/Internship
              </button>
            </div>

            {/* Final call to action */}
            <p className="text-base text-gray-700 mt-6">
              Ready to go? Click the button below to post your opportunity!
            </p>
          </div>
          {/* Internship Portal UI ends here */}
        </div>

        <div className="hidden lg:block w-[25vw] p-4 border-l border-gray-200">
          Side contents
        </div>
      </div>
    </div>
  );
};

export default HomePage;
