import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { Link } from 'react-router-dom';
import conf from '../conf/conf.js';

const AppliedComponent = () => {
    const [isSelected, setIsSelected] = useState(true);
    const [appliedJobs, setAppliedJobs] = useState([]);
    const [loading, setLoading] = useState(true);

    // Access Redux state
    const { currentUser } = useSelector((state) => state.user);
    const myApplied = currentUser?.data.data.user.myApplied || [];
    const token = currentUser?.data.data.accessToken || "";

    // Function to load applied jobs from the server
    const loadAppliedJobs = async () => {
        try {
            // Exit early if no applied jobs exist
            if (myApplied.length === 0) {
                setAppliedJobs([]);
                setLoading(false);
                return;
            }

            // Convert `myApplied` to a comma-separated string
            const appliedJobIdsString = myApplied.join(',');

            // Make the GET request
            const response = await axios.get(`${conf.postApiUrl}get-myapplied`, {
                params: {
                    appliedJobIds: appliedJobIdsString, // Add appliedJobIds to query string
                },
                headers: {
                    Authorization: `Bearer ${token}`, // Include the token in headers
                },
            });

            // Set the applied jobs state            
            setAppliedJobs(response.data.jobs || []);
        } catch (error) {
            console.error('Error fetching applied jobs:', error.message || error.response?.data);
        } finally {
            setLoading(false);
        }
    };

    // Function to handle "Check" button clicks
    const handleApplyClick = (applyLink) => {
        if (!applyLink) {
            alert('Application link is not available for this job.');
            return;
        }
        // Redirect to the application link
        window.location.href = applyLink;
    };

    // Load applied jobs on component mount or whenever `myApplied` changes
    useEffect(() => {
        loadAppliedJobs();
    }, [myApplied]);

    return (
        <div className=' dark:text-white'>
            {/* Header Section */}
            <div>
                <div className="flex items-center gap-3">
                    <div
                        onClick={() => setIsSelected(true)}
                        className={`text-xl font-bold cursor-pointer hover:shadow-lg ${
                            isSelected && 'text-blue-600 underline'
                        }`}
                    >
                        My Applied
                    </div>
                    <div className="border-2 h-6 mx-2"></div>
                    <div
                        onClick={() => setIsSelected(false)}
                        className={`text-xl font-bold cursor-pointer hover:shadow-lg ${
                            !isSelected && 'text-blue-600 underline'
                        }`}
                    >
                        My Posts
                    </div>
                </div>
                <p className="pt-5">
                    Once the internship is closed, it will be removed after 90 days from this list
                </p>
            </div>

            {/* Content Section */}
            {loading ? (
                // Loading Indicator
                <div className="flex justify-center items-center pt-20">
                    <p>Loading...</p>
                </div>
            ) : isSelected ? (
                // "My Applied" Tab Content
                appliedJobs.length > 0 ? (
                    <div className="pt-10 dark:text-white">
                        <h2 className="font-bold text-2xl mb-4">My Applied Jobs</h2>
                        <ul>
                            {appliedJobs.map((job) => (
                                <div
                                    key={job._id}
                                    className="mb-4 border-b pb-2 flex items-center"
                                >
                                    <li>
                                        <div className="font-semibold">{job.companyName}</div>
                                        <div className="text-gray-500">{job.role}</div>
                                    </li>
                                    <button
                                        onClick={() => handleApplyClick(job.applicationLink)} // Fixed function invocation
                                        className="bg-blue-500 text-white py-1 px-2 rounded ml-auto"
                                    >
                                        Check
                                    </button>
                                </div>
                            ))}
                        </ul>
                    </div>
                ) : (
                    // No Applied Jobs Found
                    <div className="flex justify-center items-center gap-10 flex-col pt-36">
                        <p className="font-bold text-xl">No Applied Internships</p>
                        <p>You have not applied to any internship yet.</p>
                        <Link to="/internships">
                            <button className="bg-blue-600 text-white p-3 rounded-md w-40">
                                Search Internship
                            </button>
                        </Link>
                    </div>
                )
            ) : (
                // "My Posts" Tab Content
                <div className="flex justify-center items-center gap-10 flex-col pt-36">
                    <p className="font-bold text-xl">No Posts</p>
                    <p>You have not posted any job yet.</p>
                    <Link to="/fulltime-jobs">
                        <button className="bg-blue-600 text-white p-3 rounded-md w-40">
                            Search Job
                        </button>
                    </Link>
                </div>
            )}
        </div>
    );
};

export default AppliedComponent;
