import React, { useEffect } from "react";
import profile_img from '../assets/profile_img.jpg'; // Adjust path as needed
import background_img from '../assets/bg_img2.jpg'; // Adjust path as needed
import SideBar from "../components/SideBar";

// Helper function to animate skill bars
const animateSkillBars = () => {
  const bars = document.querySelectorAll(".skill-bar-fill");
  bars.forEach((bar) => {
    const value = bar.getAttribute("data-value");
    bar.style.width = value;
  });
};

const ProfilePage = () => {
  useEffect(() => {
    animateSkillBars(); // Run the animation on load
  }, []);

  return (
    <div className="text-black h-screen flex flex-col bg-gray-50">
      <div className="flex flex-1">
        {/* Sidebar */}
        <div className="w-[20vw] border-r border-gray-200">
          <SideBar />
        </div>

        {/* Main Content */}
        <div className="w-[80vw] mx-auto py-8 px-4">
          {/* Profile Header with Background Image */}
          <div
            className="relative h-48 bg-cover bg-center rounded-lg shadow-lg mb-12"
            style={{ backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url(${background_img})` }}
          >
            {/* Profile Image */}
            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2">
              <img
                className="w-40 h-40 rounded-full border-8 border-transparent shadow-lg transition-all duration-300 ease-in-out hover:scale-105"
                src={profile_img}
                alt="Profile"
              />
            </div>
          </div>

          {/* Profile Information Card */}
          <div className="bg-white p-8 shadow-lg rounded-lg mb-12 border border-gray-200">
            <div className="text-center">
              <h2 className="text-4xl font-bold text-gray-900 animate-fade-in">Jack Adams</h2>
              <p className="text-gray-500 mt-2">Product Designer</p>
              <p className="text-gray-500">Los Angeles, California, USA</p>
              <div className="mt-4 space-x-4">
                <button className="text-sm text-white bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800 px-6 py-2 rounded-md shadow-md transition-all duration-300">
                  Edit Profile
                </button>
                <button className="text-sm text-white bg-gradient-to-r from-green-500 to-green-700 hover:from-green-600 hover:to-green-800 px-6 py-2 rounded-md shadow-md transition-all duration-300">
                  Message
                </button>
                <button className="text-sm text-white bg-gradient-to-r from-yellow-500 to-yellow-700 hover:from-yellow-600 hover:to-yellow-800 px-6 py-2 rounded-md shadow-md transition-all duration-300">
                  Follow
                </button>
                <button className="text-sm text-white bg-gradient-to-r from-purple-500 to-purple-700 hover:from-purple-600 hover:to-purple-800 px-6 py-2 rounded-md shadow-md transition-all duration-300">
                  View Portfolio
                </button>
              </div>
            </div>
          </div>

          {/* Personal Information Section */}
          <div className="bg-white p-8 shadow-md rounded-lg mb-12 border border-gray-200">
            <div className="flex justify-between items-center mb-4">
              <h4 className="text-xl font-semibold text-gray-700">Personal Information</h4>
              <button className="text-blue-500 hover:underline text-sm">Edit</button>
            </div>
            <div className="grid grid-cols-2 gap-6 text-gray-600">
              <div>
                <p className="font-semibold">First Name</p>
                <p>Jack</p>
              </div>
              <div>
                <p className="font-semibold">Last Name</p>
                <p>Adams</p>
              </div>
              <div>
                <p className="font-semibold">Email Address</p>
                <p>jackadams@gmail.com</p>
              </div>
              <div>
                <p className="font-semibold">Phone</p>
                <p>(213) 555-1234</p>
              </div>
              <div className="col-span-2">
                <p className="font-semibold">Bio</p>
                <p>Product Designer with 10 years of experience in designing user-friendly and aesthetically pleasing digital products.</p>
              </div>
            </div>
          </div>

          {/* Skill Section */}
          <div className="bg-white p-8 shadow-md rounded-lg mb-12 border border-gray-200">
            <div className="flex justify-between items-center mb-4">
              <h4 className="text-xl font-semibold text-gray-700">Skills</h4>
            </div>
            <div className="grid grid-cols-2 gap-6 text-gray-600">
              <div>
                <p className="font-semibold">UI/UX Design</p>
                <div className="w-full bg-gray-200 rounded-full h-4 mb-4">
                  <div className="skill-bar-fill bg-blue-500 h-4 rounded-full" data-value="90%"></div>
                </div>
              </div>
              <div>
                <p className="font-semibold">Adobe XD</p>
                <div className="w-full bg-gray-200 rounded-full h-4 mb-4">
                  <div className="skill-bar-fill bg-purple-500 h-4 rounded-full" data-value="85%"></div>
                </div>
              </div>
              <div>
                <p className="font-semibold">React</p>
                <div className="w-full bg-gray-200 rounded-full h-4 mb-4">
                  <div className="skill-bar-fill bg-green-500 h-4 rounded-full" data-value="75%"></div>
                </div>
              </div>
              <div>
                <p className="font-semibold">JavaScript</p>
                <div className="w-full bg-gray-200 rounded-full h-4 mb-4">
                  <div className="skill-bar-fill bg-yellow-500 h-4 rounded-full" data-value="80%"></div>
                </div>
              </div>
            </div>
          </div>

          {/* Address Section */}
          <div className="bg-white p-8 shadow-md rounded-lg border border-gray-200">
            <div className="flex justify-between items-center mb-4">
              <h4 className="text-xl font-semibold text-gray-700">Address</h4>
              <button className="text-blue-500 hover:underline text-sm">Edit</button>
            </div>
            <div className="grid grid-cols-2 gap-6 text-gray-600">
              <div>
                <p className="font-semibold">Country</p>
                <p>United States of America</p>
              </div>
              <div>
                <p className="font-semibold">City/State</p>
                <p>California, USA</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
