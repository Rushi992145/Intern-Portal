import React, { useState } from 'react';
import axios from 'axios';

const PostTemplate = ({
    keyProp,
    logoSrc = 'https://cdn.vectorstock.com/i/1000x1000/73/46/job-time-logo-icon-design-vector-22947346.webp',
    title = 'Internship Position',
    companyName = 'Unknown Company',
    location = 'Location Not Specified',
    skills = ['Not Specified'],
    stipend = 'Stipend Not Disclosed',
    duration = 'Duration Not Specified',
    startDate = 'To Be Decided',
    openings = 'Not Specified',
    applyBy = 'Not Specified',
    postedAgo = 'Not Specified'
}) => {
    console.log("key", keyProp);

    const [isBookmarked, setIsBookmarked] = useState(false);

    // Function to toggle bookmark status
    const handleBookmarkClick = async () => {
        const token = localStorage.getItem('accessToken'); // Get the token from localStorage
        console.log("Token:", token); // Log the token for debugging
    
        if (!token) {
            console.error("No access token found");
            return; // Early return if no token is found
        }
    
        try {
            if (isBookmarked) {
                // Remove bookmark
                await axios.delete(
                    'http://localhost:9000/api/v2/users/remove-my-applied-job',
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                            'Content-Type': 'application/json',
                        },
                        data: { jobId: keyProp }, // Pass jobId in the request body for DELETE
                    }
                );
            } else {
                // Add bookmark
                await axios.post(
                    'http://localhost:9000/api/v2/users/apply-job',
                    { jobId: keyProp }, // Pass jobId in the request body
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                            'Content-Type': 'application/json',
                        },
                    }
                );
            }
            // Toggle the bookmark state
            setIsBookmarked(prevState => !prevState);
        } catch (error) {
            console.error('Error while bookmarking job:', error);
        }
    };
    

    return (
        <div className="p-4 flex justify-center">
            <div className="w-full max-w-3xl border border-gray-400 rounded-xl p-6">
                <div className="companyInfo flex flex-wrap items-center justify-between gap-5">
                    <div className="logo">
                        <img className="w-12 h-12 rounded-full" src={'https://cdn.vectorstock.com/i/1000x1000/73/46/job-time-logo-icon-design-vector-22947346.webp'} alt="Company Logo" />
                    </div>

                    <div className="title flex-1">
                        <div className="font-bold text-xl">
                            {title}
                        </div>
                        <div className="text-gray-400">
                            {companyName} | {location}
                        </div>
                    </div>

                    <div className="flex gap-4 text-blue-500 cursor-pointer">
                        <span
                            className={`material-symbols-outlined w-9 h-9 flex items-center justify-center hover:bg-blue-200 rounded-full ${isBookmarked ? 'text-yellow-500' : ''}`}
                            onClick={handleBookmarkClick}
                        >
                            bookmark
                        </span>
                        <span className="material-symbols-outlined w-9 h-9 flex items-center justify-center hover:bg-blue-200 rounded-full">
                            share
                        </span>
                    </div>
                </div>

                <div className="skillsReq pt-5 flex flex-wrap gap-4">
                    {skills.map((skill, index) => (
                        <div key={index} className="inline-block px-4 py-1 text-center rounded-2xl bg-slate-100">
                            {skill}
                        </div>
                    ))}
                </div>

                <div className="allInfo pt-10 flex flex-wrap gap-20">
                    <div>
                        <div className="flex items-center gap-2 text-gray-500">
                            <span className="material-symbols-outlined">local_atm</span>
                            <p>Stipend per month</p>
                        </div>
                        <div className="font-semibold">{stipend}</div>
                    </div>

                    <div>
                        <div className="flex items-center gap-2 text-gray-500">
                            <span className="material-symbols-outlined">schedule</span>
                            <p>Duration</p>
                        </div>
                        <div className="font-semibold">{duration}</div>
                    </div>

                    <div>
                        <div className="flex items-center gap-2 text-gray-500">
                            <span className="material-symbols-outlined">calendar_today</span>
                            <p>Start Date</p>
                        </div>
                        <div className="font-semibold">{startDate}</div>
                    </div>

                    <div>
                        <div className="flex items-center gap-2 text-gray-500">
                            <p>#Openings</p>
                        </div>
                        <div className="font-semibold">{openings}</div>
                    </div>
                </div>

                <div className="pt-12 flex flex-wrap items-center justify-between gap-5">
                    <div className="text-blue-500">
                        Posted {postedAgo}
                    </div>
                    <div className="flex gap-4">
                        <button className="border border-gray-500 p-3 rounded-lg hover:bg-gray-300">
                            View Details
                        </button>
                        <button className="bg-blue-700 text-white p-3 rounded-lg hover:bg-blue-500">
                            Apply Now
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PostTemplate;
