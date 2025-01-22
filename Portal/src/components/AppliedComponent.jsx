import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { Link } from 'react-router-dom';
import conf from '../conf/conf.js';

const AppliedComponent = () => {
    const [isSelected, setIsSelected] = useState(true);
    const [appliedJobs, setAppliedJobs] = useState([]);
    const [myPosts, setMyPosts] = useState([]);
    const [loading, setLoading] = useState(true);

    const { currentUser } = useSelector((state) => state.user);
    const myApplied = currentUser?.data.data.user.myApplied || [];
    const token = currentUser?.data.data.accessToken || "";

    const handleDeletePost = async (postId) => {
        if (window.confirm('Are you sure you want to delete this post?')) {
            try {
                console.log("Post ID to delete:", postId);
    
                const response = await axios.delete(`${conf.postApiUrl}delete-post/${postId}`, {
                    headers: { Authorization: `Bearer ${token}` },
                });
    
                console.log("Response from API:", response);
    
                if (response.status === 200) {
                    setMyPosts((prevPosts) => prevPosts.filter((post) => post._id !== postId));
                    alert('Post deleted successfully.');
                } else {
                    alert('Failed to delete the post. Please try again later.');
                }
            } catch (error) {
                console.error("Error deleting post:", error);
                alert('An error occurred while deleting the post. Please try again later.');
            }
        }
    };    
    

    const loadAppliedJobs = async () => {
        try {
            setLoading(true);

            if (myApplied.length === 0) {
                setAppliedJobs([]);
                return;
            }

            const appliedJobIdsString = myApplied.join(',');
            const response = await axios.get(`${conf.postApiUrl}get-myapplied`, {
                params: { appliedJobIds: appliedJobIdsString },
                headers: { Authorization: `Bearer ${token}` },
            });

            setAppliedJobs(response.data.jobs || []);
        } catch (error) {
            console.error('Error fetching applied jobs:', error.message || error.response?.data);
        } finally {
            setLoading(false);
        }
    };

    const loadMyPosts = async () => {
        try {
            setLoading(true);

            const response = await axios.get(`${conf.postApiUrl}my-posts`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            console.log("Rushi",response.data);
            

            setMyPosts(response.data.data || []);
        } catch (error) {
            console.error('Error fetching jobs posted by logged-in user:', error.message || error.response?.data);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (isSelected) {
            loadAppliedJobs();
        } else {
            loadMyPosts();
        }
    }, [isSelected, myApplied]);

    return (
        <div className='dark:text-white'>
            <div className="flex items-center gap-3">
                <div
                    onClick={() => setIsSelected(true)}
                    className={`text-xl font-bold cursor-pointer hover:shadow-lg ${
                        isSelected ? 'text-blue-600 underline' : ''
                    }`}
                >
                    My Applied
                </div>
                <div className="border-2 h-6 mx-2"></div>
                <div
                    onClick={() => setIsSelected(false)}
                    className={`text-xl font-bold cursor-pointer hover:shadow-lg ${
                        !isSelected ? 'text-blue-600 underline' : ''
                    }`}
                >
                    My Posts
                </div>
            </div>
            <p className="pt-5">
                Once the internship is closed, it will be removed after 90 days from this list.
            </p>

            {loading ? (
                <div className="flex justify-center items-center pt-20">
                    <p>Loading...</p>
                </div>
            ) : isSelected ? (
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
                                        onClick={() =>
                                            job.applicationLink
                                                ? window.location.href = job.applicationLink
                                                : alert('Application link is not available for this job.')
                                        }
                                        className="bg-blue-500 text-white py-1 px-2 rounded ml-auto"
                                    >
                                        Check
                                    </button>
                                </div>
                            ))}
                        </ul>
                    </div>
                ) : (
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
            ) : myPosts.length > 0 ? (
                <div className="pt-10 dark:text-white">
                    <h2 className="font-bold text-2xl mb-4">My Posts</h2>
                    <ul>
                        {myPosts.map((post) => (
                            <div
                                key={post._id}
                                className="mb-4 border-b pb-2 flex items-center justify-between"
                            >
                                <div>
                                    <div className="font-semibold">{post.companyName}</div>
                                    <div className="text-gray-500">{post.role}</div>
                                </div>
                                <div className="flex gap-2">
                                    <button
                                        onClick={() => handleDeletePost(post._id)}
                                        className="bg-red-500 text-white py-1 px-2 rounded"
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>
                        ))}
                    </ul>
                </div>
            ) : (
                <div className="flex justify-center items-center gap-10 flex-col pt-36">
                    <p className="font-bold text-xl">No Posts</p>
                    <p>You have not posted any job yet.</p>
                    <Link to="/fulltime-jobs">
                        <button className="bg-blue-600 text-white p-3 rounded-md w-40">
                            Post a Job
                        </button>
                    </Link>
                </div>
            )}
        </div>
    );
};

export default AppliedComponent;
