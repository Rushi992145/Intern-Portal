import React from 'react';

const PostTemplate = () => {
    return (
        <div className="p-4 flex justify-center">
            <div className="w-full max-w-3xl border border-gray-400 rounded-xl p-6">
                <div className="companyInfo flex flex-wrap items-center justify-between gap-5">
                    <div className="logo">
                        <img className="w-12 h-12 rounded-full" src="./src/assets/complogo.png" alt="Company Logo" />
                    </div>

                    <div className="title flex-1">
                        <div className="font-bold text-xl">
                            Software Development Engineer in Test (SDET) Internship
                        </div>
                        <div className="text-gray-400">
                            Vibencode Pvt. Ltd. | Indore, India
                        </div>
                    </div>

                    <div className="flex gap-4 text-blue-500 cursor-pointer">
                        <span className="material-symbols-outlined w-9 h-9 flex items-center justify-center hover:bg-blue-200 rounded-full">
                            bookmark
                        </span>
                        <span className="material-symbols-outlined w-9 h-9 flex items-center justify-center hover:bg-blue-200 rounded-full">
                            share
                        </span>
                    </div>
                </div>

                <div className="skillsReq pt-5 flex flex-wrap gap-4">
                    <div className="inline-block px-4 py-1 text-center rounded-2xl bg-slate-100">AI/ML</div>
                    <div className="inline-block px-4 py-1 text-center rounded-2xl bg-slate-100">UI/UX</div>
                    <div className="inline-block px-4 py-1 text-center rounded-2xl bg-slate-100">idk</div>
                </div>

                <div className="allInfo pt-10 flex flex-wrap gap-20">
                    <div>
                        <div className="flex items-center gap-2 text-gray-500">
                            <span className="material-symbols-outlined">local_atm</span>
                            <p>Stipend per month</p>
                        </div>
                        <div className="font-semibold">₹ 5K - 7K</div>
                    </div>

                    <div>
                        <div className="flex items-center gap-2 text-gray-500">
                            <span className="material-symbols-outlined">schedule</span>
                            <p>Duration</p>
                        </div>
                        <div className="font-semibold">6 Months</div>
                    </div>

                    <div>
                        <div className="flex items-center gap-2 text-gray-500">
                            <span className="material-symbols-outlined">calendar_today</span>
                            <p>Start Date</p>
                        </div>
                        <div className="font-semibold">Immediate</div>
                    </div>

                    <div>
                        <div className="flex items-center gap-2 text-gray-500">
                            <p>#Openings</p>
                        </div>
                        <div className="font-semibold">1</div>
                    </div>
                </div>

                <div className="pt-12 flex flex-wrap items-center justify-between gap-5">
                    <div className="text-blue-500">
                        Apply by 25 October 2024 • Posted 9h ago
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
