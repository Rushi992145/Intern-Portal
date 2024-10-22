import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const AppliedComponent = () => {
    const [isSelected, setisSelected] = useState(true);
    const [appliedJobs, setAppliedJobs] = useState([]);
    const [loading, setLoading] = useState(true);

    // Function to load applied jobs from the server
    const loadAppliedJobs = async () => {
        try {
            const token = localStorage.getItem('accessToken');
            const appliedJobIds = JSON.parse(localStorage.getItem('myApplied')) || [];

            // Ensure appliedJobIds is an array before making the API call
            if (appliedJobIds.length === 0) {
                setLoading(false);
                return;
            }

            const response = await axios.post(
                'http://localhost:9000/api/v2/post/my-applied-jobs',
                { jobId: appliedJobIds }, // Send jobId as an array
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            console.log('Applied jobs response:', response.data);
            setAppliedJobs(response.data.jobs); // Adjust this based on your backend response structure
            setLoading(false);
        } catch (error) {
            console.error('Error fetching applied jobs:', error);
            setLoading(false);
        }
    };

    // useEffect hook to load applied jobs when the component mounts
    useEffect(() => {
        // Call loadAppliedJobs once when the component mounts
        loadAppliedJobs();

        // Optionally, you can listen for a page reload event using a custom event handler
        const handleReload = () => {
            loadAppliedJobs();
        };

        // Add event listener for reload or refresh
        window.addEventListener('load', handleReload);

        // Clean up event listener on component unmount
        return () => {
            window.removeEventListener('load', handleReload);
        };
    }, []); // Empty dependency array means this effect runs once when the component mounts

    return (
        <div>
            <div>
                <div className='flex items-center gap-3'>
                    <div onClick={() => setisSelected(true)} className={`text-xl font-bold cursor-pointer hover:shadow-lg ${isSelected && 'text-blue-600 underline'}`}>My Applied</div>
                    <div className='border-2 h-6 mx-2'></div>
                    <div onClick={() => setisSelected(false)} className={`text-xl font-bold cursor-pointer hover:shadow-lg ${!isSelected && 'text-blue-600 underline'}`}>My Posts</div>
                </div>

                <p className='pt-5'>Once the internship is closed, it will be removed after 90 days from this list</p>
            </div>

            {loading ? (
                <div className="flex justify-center items-center pt-20">
                    <p>Loading...</p>
                </div>
            ) : (
                isSelected ? (
                    appliedJobs.length > 0 ? (
                        <div className='pt-10'>
                            <h2 className='font-bold text-2xl mb-4'>My Applied Jobs</h2>
                            <ul>
                                {appliedJobs.map((job) => (
                                    <li key={job._id} className='mb-4 border-b pb-2'>
                                        <div className='font-semibold'>{job.companyName}</div>
                                        <div className='text-gray-500'>{job.position}</div>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ) : (
                        <div className='flex justify-center items-center gap-10 flex-col pt-36'>
                            <p className='font-bold text-xl'>No Applied internships</p>
                            <p>You have not applied to any internship yet.</p>
                            <Link to='/internships'>
                                <button className='bg-blue-600 text-white p-3 rounded-md w-40 '>
                                    Search Internship
                                </button>
                            </Link>
                        </div>
                    )
                ) : (
                    <div className='flex justify-center items-center gap-10 flex-col pt-36'>
                        {/* Render My Posts content here */}
                        <p className='font-bold text-xl'>No Posts</p>
                        <p>You have not posted any job yet.</p>
                        <Link to='/fulltime-jobs'>
                            <button className='bg-blue-600 text-white p-3 rounded-md w-40 '>
                                Search Job
                            </button>
                        </Link>
                    </div>
                )
            )}
        </div>
    );
};

export default AppliedComponent;
