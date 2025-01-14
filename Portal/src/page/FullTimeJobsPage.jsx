import  { useState, useEffect } from 'react';
import axios from 'axios'; 
import SideBar from '../components/SideBar';
import PostTemplate from '../components/PostTemplate';
import Filter from '../components/Filter';
import SearchBar from '../components/Searchbar';
import conf from '../conf/conf.js';

const FullTimeJobsPage = () => {
    const [posts, setPosts] = useState([]);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    // Function to load posts from the server
    const loadPosts = async () => {
        try {
            const token = localStorage.getItem('accessToken');
            const response = await axios.get(`${conf.postApiUrl}fulltime`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            
            // Extract the posts from the response data
            const fetchedPosts = response.data.message.docs;
            // console.log(fetchedPosts);
            
            setPosts(fetchedPosts); // Update state with the posts array

        } catch (error) {
            console.error("Error fetching posts:", error);
        }
    };

    // useEffect hook to load posts once when the component mounts
    useEffect(() => {
        loadPosts();
    }, []); // Empty dependency array ensures this runs only once

    // Function to handle search input
    const handleSearch = (term) => {
        // Add your search logic here
    };

    return (
        <div className='text-black h-screen flex flex-col'>
            <div className='flex flex-1 overflow-hidden'>
                {!isSidebarOpen && (
                    <div className="md:hidden p-10">
                        <button
                            className="absolute top-4 left-4 p-2 text-blue-500"
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

                <div className="flex-1 flex overflow-hidden">
                    <div className="flex-1 p-4 overflow-y-auto">
                        <SearchBar onSearch={handleSearch} />

                        <div className="space-y-4">
                            {posts.map((post, index) => (
                                <PostTemplate
                                    key={post._id || index}
                                    keyProp={post._id || index}
                                    logoSrc={post.logoSrc}
                                    title={post.role || 'Internship Position'}
                                    companyName={post.companyName || 'Unknown Company'}
                                    location={post.location || 'Location Not Specified'}
                                    skills={post.requiredSkills || ['Not Specified']}
                                    stipend={post.salary ? `${post.salary} per month` : 'Stipend Not Disclosed'}
                                    duration={post.duration || 'Duration Not Specified'}
                                    startDate={post.startDate || 'To Be Decided'}
                                    openings={post.openings || 'Not Specified'}
                                    applyBy={post.applyBy || 'Not Specified'}
                                    applyLink={post.applicationLink}
                                    description={post.description}
                                    postedAgo={post.updatedAt ? new Date(post.updatedAt).toLocaleDateString() : 'Not Specified'}
                                />
                            ))}
                        </div>
                    </div>

                    {/* <div className="hidden md:block w-[25vw] p-4 border-l border-gray-200">
                        <Filter />
                    </div> */}
                </div>
            </div>
        </div>
    );
};

export default FullTimeJobsPage;
