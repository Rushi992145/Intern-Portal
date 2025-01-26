import React from 'react';
import { NavLink } from 'react-router-dom';

const SideBar = () => {
    const activeClass = 'bg-slate-100 text-blue-600';

    return (
        <div className='flex w-full flex-col h-full gap-2 py-14 dark:bg-slate-950 dark:text-white'>
            <NavLink
                to="/home"
                className={({ isActive }) =>
                    `flex items-center gap-3 py-2 px-10 rounded-r-full hover:bg-slate-100 dark:hover:bg-slate-400 ${isActive ? activeClass : ''}`
                }
            >
                <span className="material-symbols-outlined w-6 text-center">
                    bar_chart_4_bars
                </span>
                <span>Dashboard</span>
            </NavLink>

            <NavLink
                to="/internships"
                className={({ isActive }) =>
                    `flex items-center gap-3 py-2 px-10 rounded-r-full hover:bg-slate-100 dark:hover:bg-slate-400 ${isActive ? activeClass : ''}`
                }
            >
                <span className="material-symbols-outlined w-6 text-center">
                    work
                </span>
                <span>Internships</span>
            </NavLink>

            <NavLink
                to="/fulltime-jobs"
                className={({ isActive }) =>
                    `flex items-center gap-3 py-2 px-10 rounded-r-full hover:bg-slate-100 dark:hover:bg-slate-400 ${isActive ? activeClass : ''}`
                }
            >
                <span className="material-symbols-outlined w-6 text-center">
                    work
                </span>
                <span>Fulltime Jobs</span>
            </NavLink>

            <NavLink
                to="/applied"
                className={({ isActive }) =>
                    `flex items-center gap-3 py-2 px-10 rounded-r-full hover:bg-slate-100 dark:hover:bg-slate-400 ${isActive ? activeClass : ''}`
                }
            >
                <span className="material-symbols-outlined w-6 text-center">
                    description
                </span>
                <span>My Activity</span>
            </NavLink>
        </div>
    );
};

export default SideBar;
