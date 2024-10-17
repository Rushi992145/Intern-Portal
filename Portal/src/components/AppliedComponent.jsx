import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const AppliedComponent = () => {
    const [isSelected, setisSelected] = useState(true)

    return (
        <div>
            <div>
                <div className='flex items-center gap-3'>
                    <div onClick={() => setisSelected(true)} className={`text-xl font-bold cursor-pointer hover:shadow-lg ${isSelected && 'text-blue-600 underline'}`}>Applied Internships (0)</div>
                    <div className='border-2 h-6 mx-2'></div>
                    <div onClick={() => setisSelected(false)} className={`text-xl font-bold cursor-pointer hover:shadow-lg ${!isSelected && 'text-blue-600 underline'}`}>Applied Jobs (0)</div>
                </div>

                <p className='pt-5'>Once the internship is closed, it will be removed after 90 days from this list</p>
            </div>

            <div className='flex justify-center items-center gap-10 flex-col pt-36'>
                <p className='font-bold text-xl'>No Applied internships</p>
                <p>You have not applied to any internship yet.</p>

                {
                isSelected ? (<Link to='/internships'>
                    <button className='bg-blue-600 text-white p-3 rounded-md w-40 '>
                        Search Intership
                    </button>
                </Link>) : (<Link to='/fulltime-jobs'>
                    <button className='bg-blue-600 text-white p-3 rounded-md w-40 '>
                        Search Job
                    </button>
                </Link>)
            }
            </div>

            

        </div>
    );
};

export default AppliedComponent;
