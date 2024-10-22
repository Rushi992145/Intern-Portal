import React, { useEffect, useState, useRef } from 'react';
import Navbar from '../components/Navbar';
import SideBar from '../components/SideBar';
import PostForm from '../components/PostForm';
import axios from 'axios';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.css';
import { Navigation } from 'swiper/modules';

const HomePage = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [userPosts, setUserPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [trendingPosts, setTrendingPosts] = useState([]);
  const [showSlider, setShowSlider] = useState(true); // State for slider visibility
  const swiperRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('accessToken');

        const [postsRes] = await Promise.all([
          axios.get('http://localhost:9000/api/v2/post/get-posts', {
            headers: { Authorization: `Bearer ${token}` },
          }),
        ]);

        setUserPosts(postsRes.data.message.docs);
        console.log(postsRes.data.message.docs);

        // Mock data for trending posts
        const mockTrendingPosts = postsRes.data.message.docs.slice(0, 5); // Assuming first 5 posts are trending
        setTrendingPosts(mockTrendingPosts);

        setLoading(false);
      } catch (error) {
        console.error('Failed to fetch data:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleCreatePost = () => {
    setShowSlider(false); 
  };

  return (
    <div className="text-black h-screen flex flex-col bg-gray-100">
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
          className={`fixed inset-y-0 left-0 w-64 bg-white border-r border-gray-200 shadow-lg transform transition-transform duration-300 ease-in-out 
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
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-xl font-semibold">Dashboard</h1>
            <PostForm onCreatePost={handleCreatePost} /> {/* Pass handleCreatePost to PostForm */}
          </div>

          {loading ? (
            <p>Loading content...</p>
          ) : (
            <>
              <section className="mb-6">
                <h2 className="text-lg font-semibold mb-2">Statistics</h2>
                <div className="flex space-x-4 mb-4">
                  <div className="bg-white shadow-lg rounded-lg p-6 flex-1">
                    <h3 className="font-bold text-blue-600">Posts</h3>
                    <p className="text-3xl font-bold">{userPosts.length}</p>
                  </div>
                  <div className="bg-white shadow-lg rounded-lg p-6 flex-1">
                    <h3 className="font-bold text-blue-600">Impressions</h3>
                    <p className="text-3xl font-bold">0</p>
                  </div>
                  <div className="bg-white shadow-lg rounded-lg p-6 flex-1">
                    <h3 className="font-bold text-blue-600">Applied</h3>
                    <p className="text-3xl font-bold">0</p>
                  </div>
                </div>
              </section>

              <section className="mb-6">
                <h2 className="text-lg font-semibold mb-4  text-gray-800">Trending Posts</h2>
                {showSlider && trendingPosts.length > 0 ? ( 
                  <Swiper
                    ref={swiperRef}
                    modules={[Navigation]}
                    navigation
                    spaceBetween={20}
                    slidesPerView={1}
                    breakpoints={{
                      640: {
                        slidesPerView: 2,
                      },
                      768: {
                        slidesPerView: 3,
                      },
                      1024: {
                        slidesPerView: 4,
                      },
                    }}
                  >
                    {trendingPosts.map((post) => (
                      <SwiperSlide key={post._id}>
                        <div className="bg-white shadow-md rounded-lg p-4 flex flex-col h-[300px] transition-transform duration-200 hover:shadow-lg hover:scale-105">
                          <h3 className="font-bold text-blue-600 text-xl mb-2">{post.title}</h3>
                          <p className="text-gray-700 flex-grow">{post.description}</p>
                          <div className="flex justify-between items-center mt-4">
                            <p className="text-sm text-gray-500">Impressions: {post.likes || 0}</p>
                            <a
                              href={post.applicationLink}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="bg-blue-600 text-white py-1 px-3 rounded-md text-center hover:bg-blue-700 transition duration-200"
                            >
                              Apply Now
                            </a>
                          </div>
                        </div>
                      </SwiperSlide>
                    ))}
                  </Swiper>
                ) : (
                  <p className="text-gray-600">No trending posts available.</p>
                )}
              </section>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
