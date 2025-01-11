import profileImage from "../assets/profile.png";
import background_img from "../assets/bg_img2.jpg";
import SideBar from "../components/SideBar";
import { useSelector, useDispatch } from "react-redux";
import UserName from "../components/UserName";
import { useState ,useEffect} from "react";
import {updateUser} from '../redux/user/userSlice'
import { useNavigate } from "react-router-dom";
import toast from 'react-hot-toast';
import axios from "axios";
import { MdDelete } from "react-icons/md";
import conf from '../conf/conf.js'



const animateSkillBars = () => {
  const bars = document.querySelectorAll(".skill-bar-fill");
  bars.forEach((bar) => {
    const value = bar.getAttribute("data-value");
    bar.style.width = value;
  });
};

const ProfilePage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { currentUser } = useSelector((state) => state.user);
  console.log(currentUser)
  
  

  const [editMode, setEditMode] = useState(false);
  const [editQualMode, setEditQualMode] = useState(false);

  const [editedUser, setEditedUser] = useState({
    username: currentUser?.data.data.user.username || "",
    email: currentUser?.data.data.user.email || "",
    fullname: currentUser?.data.data.user.fullname || "",
  });

  const [editedQuali, setEditedQuali] = useState({
    degree: "",
    startYear: "",
    endYear: "",
  });

  const [error, setError] = useState(null);
  const currentYear = new Date().getFullYear();


  useEffect(() => {
    if (currentUser) {
      setEditedUser({
        username: currentUser.data.data.user.username,
        email: currentUser.data.data.user.email,
        fullname: currentUser.data.data.user.fullname,
      });
    }
    animateSkillBars();
  }, [currentUser,setEditedUser]);

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    
    if (editMode) {
      setEditedUser((prev) => ({ ...prev, [name]: value }));
    } else {
      setEditedQuali((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = currentUser?.data?.data?.accessToken;
  
      if (!token) {
        throw new Error('User is not authenticated. Missing access token.');
      }
  
      const response = await axios.patch(
        `${conf.userApiUrl}update-account`,
        editedUser,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        }
      );
  
      if (response.status === 200) {
        toast.success('Successfully updated!');
        toast.success('Successfully updated!');
        // Update Redux state with changed fields only
        dispatch(updateUser({
          ...currentUser,
          data: {
            ...currentUser.data,
            data: {
              ...currentUser.data.data,
              user: { ...currentUser.data.data.user, ...editedUser },
            },
          },
        }));
        setError(null);
      } else {
        toast.error('Unsuccessful attempt');
      }
    } catch (error) {
      if (error.response) {
        toast.error(error.response.data.message || 'Failed profile update.');
      } else if (error.request) {
        toast.error('No response from server. Please try again later.');
      } else {
        toast.error('An unexpected error occurred.');
      }
      setError(error.message);
    } finally {
      setEditMode(false);
    }
  };
  
  const handleQualEditSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = currentUser?.data?.data?.accessToken;

      if (!editedQuali.degree || !editedQuali.startYear || !editedQuali.endYear) {
        toast.error('Incomplete Information')
        return;
      }
  
      if (!token) {
        throw new Error('User is not authenticated. Missing access token.');
      }

      const response = await axios.post(
        `${conf.userApiUrl}add-qualification`,
        { qualification: editedQuali },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response);
      if (response.status === 200) {
        toast.success("Successfully updated!");
        
        dispatch(updateUser({
          ...currentUser,
          data: {
            ...currentUser.data,
            data: {
              ...currentUser.data.data,
              user: {
                ...currentUser.data.data.user,
                qualifications: [...currentUser.data.data.user.qualifications, editedQuali],
              },
            },
          },
        }));
      
        setError(null);
        setEditedQuali({ degree: "", startYear: "", endYear: "" });
      }
      
      else {
        toast.error('Unsuccessfull attempt');
      }
      setError(null);
    } catch (error) {
      setError(error.message);
    }
    setEditQualMode(false);
  };

  return (
    <div className="text-black dark:text-white h-screen flex flex-col bg-gray-50 dark:bg-slate-900">
      <div className="flex flex-1">
        <div className="w-[20vw] border-r border-gray-200 dark:border-gray-700">
          <SideBar />
        </div>
        <div className="w-[80vw] mx-auto py-8 px-4">
          <div
            className="relative h-48 bg-cover bg-center rounded-lg shadow-lg mb-12"
            style={{
              backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url(${background_img})`,
            }}
          >
            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2">
              <img
                src={currentUser?.profileImage || profileImage}
                alt="Profile"
                className="w-36 h-36 rounded-full"
              />
            </div>
          </div>

          <div className="bg-white dark:bg-slate-600 dark:border-gray-700  p-8 shadow-lg rounded-lg mb-12 border border-gray-200">
            <div className="text-center">
              <h2 className="text-4xl font-bold text-gray-900 dark:text-white animate-fade-in">
                {editedUser.username}
              </h2>
            </div>
          </div>

          {/* Personal Information */}
          <div className="bg-white dark:bg-slate-600 dark:border-gray-700 text-gray-900 dark:text-white p-8 shadow-lg rounded-lg mb-12 border border-gray-200">
            <div className="flex justify-between items-center mb-4">
              <h4 className="text-xl font-semibold ">
                Personal Information
              </h4>
              <button
                className="text-blue-500 hover:underline text-sm"
                onClick={() => setEditMode(true)}
              >
                Edit
              </button>
            </div>

            {editMode ? (
              <form onSubmit={handleEditSubmit}>
                <div className="flex flex-col">
                  <input
                    type="text"
                    name="fullname"
                    value={editedUser.fullname}
                    onChange={handleEditChange}
                    className="border border-gray-300 p-2 mb-2"
                    placeholder="Full Name"
                  />
                  <input
                    type="text"
                    name="username"
                    value={editedUser.username}
                    onChange={handleEditChange}
                    className="border border-gray-300 p-2 mb-2"
                    placeholder="Username"
                  />
                  <input
                    type="email"
                    name="email"
                    value={editedUser.email}
                    onChange={handleEditChange}
                    className="border border-gray-300 p-2 mb-2"
                    placeholder="Email Address"
                  />
                  <button
                    type="submit"
                    className="bg-blue-500 text-white p-2 rounded"
                  >
                    Save
                  </button>
                  <button
                    type="button"
                    className="text-red-500 hover:underline p-2"
                    onClick={() => setEditMode(false)}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            ) : (
              <div className="grid grid-cols-2 gap-6 ">
                <UserName user={editedUser} />
                <div>
                  <p className="font-semibold">Username</p>
                  <p>{editedUser.username}</p>
                </div>
                <div>
                  <p className="font-semibold">Email Address</p>
                  <p>{editedUser.email}</p>
                </div>
              </div>
            )}

            {error && <p className="text-red-500">{error}</p>}
          </div>

          {/* Qualification Section */}
          <div className="bg-white text-gray-700 dark:text-white dark:bg-slate-600 dark:border-gray-700 p-8 shadow-md rounded-lg border border-gray-200">
            <div className="flex justify-between items-center mb-4">
              <h4 className="text-xl font-semibold ">
                Qualifications
              </h4>
              <button
                onClick={() => setEditQualMode(true)}
                className="text-blue-500 hover:underline text-sm"
              >
                Add
              </button>
            </div>

            {editQualMode ? (
              <form onSubmit={handleQualEditSubmit}>
                <div className="flex flex-col">
                  <input
                    type="text"
                    name="degree"
                    value={editedQuali.degree}
                    onChange={handleEditChange}
                    className="border border-gray-300 p-2 mb-2"
                    placeholder="Degree"
                  />
                  <input
                    type="text"
                    name="startYear"
                    value={editedQuali.startYear}
                    onChange={handleEditChange}
                    className="border border-gray-300 p-2 mb-2"
                    placeholder="Start Year"
                  />
                  <input
                    type="text"
                    name="endYear"
                    value={editedQuali.endYear}
                    onChange={handleEditChange}
                    className="border border-gray-300 p-2 mb-2"
                    placeholder="End Year"
                  />
                  <button
                    type="submit"
                    className="bg-blue-500 text-white p-2 rounded"
                  >
                    Save
                  </button>
                  <button
                    type="button"
                    className="text-red-500 hover:underline p-2"
                    onClick={() => setEditQualMode(false)}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            ) : (
              <div className="text-gray-600 dark:text-white">
                {currentUser.data.data.user.qualifications.map((qualification, index) => (
                <div key={index} className="flex items-center justify-between border-b border-gray-300 py-4">
                  <div className="flex flex-col">
                    <p className="font-semibold text-lg">{qualification.degree}</p>
                    <p className="text-gray-500 dark:text-gray-300 text-sm">{qualification.startYear} - {qualification.endYear}</p>
                  </div>
                  <div className="flex items-center">
                    {qualification.endYear < currentYear ?(<span className="bg-blue-500 text-white text-xs font-semibold px-2 py-1 rounded-full mr-2">
                      Completed
                    </span>):(<span className="bg-red-500 text-white text-xs font-semibold px-2 py-1 rounded-full mr-2">
                      Not Completed
                    </span>)
                    }
                    <button className=" hover:scale-125"><MdDelete /></button>
                  </div>
                </div>

              ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
