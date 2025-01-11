import  { useState } from 'react';

const  Filter = () => {
    const [internshipType, setInternshipType] = useState(''); 
    const [experienceLevel, setExperienceLevel] = useState('');
    const [remoteInternship, setRemoteInternship] = useState(false);
    const [jobOffer, setJobOffer] = useState(false); 
    const [monthlyStipend, setMonthlyStipend] = useState(0);
    const [maxDuration, setMaxDuration] = useState('');
    const [internshipMode, setInternshipMode] = useState(''); 

    const handleApplyFilters = () => {
        console.log('Filters Applied:', {
            internshipType,
            experienceLevel,
            remoteInternship,
            jobOffer,
            monthlyStipend,
            maxDuration,
            internshipMode,
        });
    };

    const handleClearFilters = () => {
        setInternshipType('');
        setExperienceLevel('');
        setRemoteInternship(false);
        setJobOffer(false);
        setMonthlyStipend(0);
        setMaxDuration('');
        setInternshipMode('');
    };

    return (
        <div className="p-4 border rounded shadow-md">
            <h2 className="font-bold text-lg mb-4">Apply Filters</h2>

            <div className="mb-4">
                <label className="block text-sm font-medium">Internship Type</label>
                <select
                    value={internshipType}
                    onChange={(e) => setInternshipType(e.target.value)}
                    className="mt-1 block w-full p-2 border border-gray-300 rounded"
                >
                    <option value="">Select Tech/Non-Tech</option>
                    <option value="tech">Tech</option>
                    <option value="non-tech">Non-Tech</option>
                </select>
            </div>

            <div className="mb-4">
                <label className="block text-sm font-medium">Experience Level</label>
                <select
                    value={experienceLevel}
                    onChange={(e) => setExperienceLevel(e.target.value)}
                    className="mt-1 block w-full p-2 border border-gray-300 rounded"
                >
                    <option value="">Select Level</option>
                    <option value="entry-level">Entry Level</option>
                    <option value="mid-level">Mid Level</option>
                    <option value="senior-level">Senior Level</option>
                </select>
            </div>

            <div className="mb-4">
                <label className="flex items-center">
                    <input
                        type="checkbox"
                        checked={remoteInternship}
                        onChange={() => setRemoteInternship(!remoteInternship)}
                        className="mr-2"
                    />
                    Remote Internship
                </label>
            </div>

            <div className="mb-4">
                <label className="flex items-center">
                    <input
                        type="checkbox"
                        checked={jobOffer}
                        onChange={() => setJobOffer(!jobOffer)}
                        className="mr-2"
                    />
                    Job Offer Attached
                </label>
            </div>

            <div className="mb-4">
                <label className="block text-sm font-medium">Monthly Stipend</label>
                <select
                    value={monthlyStipend}
                    onChange={(e) => setMonthlyStipend(e.target.value)}
                    className="mt-1 block w-full p-2 border border-gray-300 rounded"
                >
                    <option value={0}>0</option>
                    <option value={5000}>5K</option>
                    <option value={10000}>10K</option>
                    <option value={20000}>20K</option>
                    <option value={30000}>30K</option>
                    <option value={50000}>50K</option>
                </select>
            </div>

            <div className="mb-4">
                <label className="block text-sm font-medium">Max Duration (in Months)</label>
                <input
                    type="number"
                    value={maxDuration}
                    onChange={(e) => setMaxDuration(e.target.value)}
                    className="mt-1 block w-full p-2 border border-gray-300 rounded"
                />
            </div>

            <div className="mb-4">
                <label className="block text-sm font-medium">Internship Mode</label>
                <select
                    value={internshipMode}
                    onChange={(e) => setInternshipMode(e.target.value)}
                    className="mt-1 block w-full p-2 border border-gray-300 rounded"
                >
                    <option value="">Select Mode</option>
                    <option value="full-time">Full-Time</option>
                    <option value="part-time">Part-Time</option>
                </select>
            </div>

            <div className="flex justify-between">
                <button
                    onClick={handleClearFilters}
                    className="bg-red-500 text-white py-2 px-4 rounded"
                >
                    Clear
                </button>
                <button
                    onClick={handleApplyFilters}
                    className="bg-blue-500 text-white py-2 px-4 rounded"
                >
                    Apply Filters
                </button>
            </div>
        </div>
    );
};

export default  Filter;
