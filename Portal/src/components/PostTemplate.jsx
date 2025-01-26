import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { updateUser } from '../redux/user/userSlice';
import conf from '../conf/conf.js';
import toast from 'react-hot-toast'

const PostTemplate = ({
    keyProp,
    logoSrc = './src/assets/complogo.png',
    title = 'Internship Position',
    companyName = 'Unknown Company',
    location = 'Location Not Specified',
    skills = ['Not Specified'],
    stipend = 'Stipend Not Disclosed',
    duration = 'Duration Not Specified',
    startDate = 'To Be Decided',
    openings = 'Not Specified',
    applyBy = 'Not Specified',
    postedAgo = 'Not Specified',
    applyLink,
    description = 'No description available.', // New prop for description
}) => {
    const [isBookmarked, setIsBookmarked] = useState(false);
    const [isDescriptionVisible, setIsDescriptionVisible] = useState(false); // State for description visibility
    const { currentUser } = useSelector((state) => state.user);
    const dispatch = useDispatch();

    useEffect(() => {
        const appliedJobs = currentUser?.data?.data?.user?.myApplied ?? [];
        setIsBookmarked(appliedJobs.includes(keyProp));
    }, [currentUser, keyProp]);

    const handleBookmarkClick = async () => {
        const token = currentUser?.data?.data?.accessToken;

        if (!token) {
            alert('You need to log in to bookmark or unbookmark jobs.');
            return;
        }

        try {
            if (isBookmarked) {
                const response = await axios.delete(`${conf.userApiUrl}remove-my-applied-job`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                    data: { jobId: keyProp },
                });

                const updatedMyApplied = currentUser.data.data.user.myApplied.filter(
                    (jobId) => jobId !== keyProp
                );
                dispatch(
                    updateUser({
                        ...currentUser,
                        data: {
                            ...currentUser.data,
                            data: {
                                ...currentUser.data.data,
                                user: {
                                    ...currentUser.data.data.user,
                                    myApplied: updatedMyApplied,
                                },
                            },
                        },
                    })
                );

                setIsBookmarked(false);
                toast.success('Unsaved')
            } else {
                const response = await axios.post(
                    `${conf.userApiUrl}apply-job`,
                    { jobId: keyProp },
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                            'Content-Type': 'application/json',
                        },
                    }
                );

                const updatedMyApplied = [...currentUser.data.data.user.myApplied, keyProp];
                dispatch(
                    updateUser({
                        ...currentUser,
                        data: {
                            ...currentUser.data,
                            data: {
                                ...currentUser.data.data,
                                user: {
                                    ...currentUser.data.data.user,
                                    myApplied: updatedMyApplied,
                                },
                            },
                        },
                    })
                );

                setIsBookmarked(true);
                toast.success('Saved')
            }
        } catch (error) {
            console.error('Error while updating bookmark status:', error.response?.data || error.message);
            alert('Failed to update bookmark status. Please try again.');
        }
    };

    const handleApplyClick = () => {
        if (!applyLink) {
            alert('Application link is not available for this job.');
            return;
        }
        window.location.href = applyLink;
    };

    const handleShareClick = () => {
        navigator.clipboard.writeText(applyLink);
        toast.success('Copied to clipboard!')
    }

    return (
        <div className="p-4 flex justify-center">
            <div className="w-full max-w-3xl border border-gray-400 rounded-xl p-6">
                <div className="companyInfo flex flex-wrap items-center justify-between gap-5">
                    <div className="logo">
                        <img
                            className="w-12 h-12 rounded-full"
                            src='/letter-n.png'
                            alt="Company Logo"
                            onError={(e) => {
                                e.target.src = './src/assets/defaultlogo.png';
                            }}
                        />
                    </div>

                    <div className="title flex-1">
                        <div className="font-bold text-xl">{title}</div>
                        <div className="text-gray-400">
                            {companyName} | {location}
                        </div>
                    </div>

                    <div className="flex gap-4 text-blue-500 cursor-pointer">
                        <span
                            className={`material-symbols-outlined w-9 h-9 flex items-center justify-center hover:bg-blue-200 rounded-full ${
                                isBookmarked ? 'text-yellow-500' : ''
                            }`}
                            title={isBookmarked ? 'Remove from Bookmarks' : 'Add to Bookmarks'}
                            onClick={handleBookmarkClick}
                        >
                            bookmark
                        </span>
                        <span className="material-symbols-outlined w-9 h-9 flex items-center justify-center hover:bg-blue-200 rounded-full"
                            onClick={handleShareClick}
                        >
                            share
                        </span>
                    </div>
                </div>

                <div className="skillsReq pt-5 flex flex-wrap gap-4">
                    {Array.isArray(skills) &&
                        skills.map((skill, index) => (
                            <div
                                key={index}
                                className="inline-block px-4 py-1 text-center rounded-2xl bg-slate-100"
                            >
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
                    <div className="text-blue-500">Posted {postedAgo}</div>
                    <div className="flex gap-4">
                        <button
                            className="border border-gray-500 p-3 rounded-lg hover:bg-gray-300"
                            onClick={() => setIsDescriptionVisible((prev) => !prev)}
                        >
                            {isDescriptionVisible ? 'Hide Description' : 'Show Description'}
                        </button>
                        <button
                            className="bg-blue-700 text-white p-3 rounded-lg hover:bg-blue-500"
                            onClick={handleApplyClick}
                        >
                            Apply Now
                        </button>
                    </div>
                </div>

                {isDescriptionVisible && (
                    <div className="pt-5 text-gray-600">
                        <h3 className="font-bold">Job Description</h3>
                        <p>{description}</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default PostTemplate;
