import React, { useState } from 'react';
import axios from 'axios';

const PostForm = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [formData, setFormData] = useState({
        role: '',
        companyName: '',
        description: '',
        applicationLink: '',
        requiredSkills: [''],
        opportunityType: '',
        salary: '',
        duration: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSkillChange = (index, value) => {
        const updatedSkills = [...formData.requiredSkills];
        updatedSkills[index] = value;
        setFormData((prev) => ({ ...prev, requiredSkills: updatedSkills }));
    };

    const handleAddSkill = () => {
        setFormData((prev) => ({
            ...prev,
            requiredSkills: [...prev.requiredSkills, ''],
        }));
    };

    const handleReset = () => {
        setFormData({
            role: '',
            companyName: '',
            description: '',
            applicationLink: '',
            requiredSkills: [''],
            opportunityType: '',
            salary: '',
            duration: '',
        });
    };

    const handleSubmit = async () => {
        console.log(formData)
        try {
            
            const response = await axios.post('http://localhost:9000/api/v2/post/create-post', formData);
            console.log(response.data); // Log success message
            setIsModalOpen(false); // Close the modal
            handleReset(); // Reset form after submission
        } catch (error) {
            console.error('Error submitting the form:', error);
        }
    };

    return (
        <>
            <button
                className="bg-blue-500 text-white px-4 py-2 rounded-md"
                onClick={() => setIsModalOpen(true)}
            >
                Create Post
            </button>

            {isModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                    <div className="bg-white p-6 rounded-md w-[500px] relative">
                        <button
                            className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
                            onClick={() => setIsModalOpen(false)}
                        >
                            <span className="material-symbols-outlined">close</span>
                        </button>

                        <h2 className="text-lg font-semibold mb-4">Create a New Post</h2>

                        <input
                            type="text"
                            name="role"
                            value={formData.role}
                            onChange={handleChange}
                            placeholder="Role"
                            className="w-full p-2 border border-gray-300 rounded-md mb-4"
                        />

                        <input
                            type="text"
                            name="companyName"
                            value={formData.companyName}
                            onChange={handleChange}
                            placeholder="Company Name"
                            className="w-full p-2 border border-gray-300 rounded-md mb-4"
                        />

                        <textarea
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            placeholder="Description"
                            className="w-full p-2 border border-gray-300 rounded-md mb-4"
                        />

                        {formData.requiredSkills.map((skill, index) => (
                            <div key={index} className="flex items-center gap-2 mb-2">
                                <input
                                    type="text"
                                    value={skill}
                                    onChange={(e) => handleSkillChange(index, e.target.value)}
                                    placeholder={`Skill ${index + 1}`}
                                    className="w-full p-2 border border-gray-300 rounded-md"
                                />
                            </div>
                        ))}

                        <button
                            className="bg-green-500 text-white px-4 py-2 rounded-md mb-4"
                            onClick={handleAddSkill}
                        >
                            Add Skill
                        </button>

                        <input
                            type="text"
                            name="applicationLink"
                            value={formData.applicationLink}
                            onChange={handleChange}
                            placeholder="Application Link"
                            className="w-full p-2 border border-gray-300 rounded-md mb-4"
                        />

                        <input
                            type="text"
                            name="opportunityType"
                            value={formData.opportunityType}
                            onChange={handleChange}
                            placeholder="Opportunity Type"
                            className="w-full p-2 border border-gray-300 rounded-md mb-4"
                        />

                        <input
                            type="number"
                            name="salary"
                            value={formData.salary}
                            onChange={handleChange}
                            placeholder="Salary (Optional)"
                            className="w-full p-2 border border-gray-300 rounded-md mb-4"
                        />

                        <input
                            type="text"
                            name="duration"
                            value={formData.duration}
                            onChange={handleChange}
                            placeholder="Duration (Optional)"
                            className="w-full p-2 border border-gray-300 rounded-md mb-4"
                        />

                        <div className="flex justify-end gap-2">
                            <button
                                className="bg-gray-300 px-4 py-2 rounded-md"
                                onClick={handleReset}
                            >
                                Reset
                            </button>
                            <button
                                className="bg-blue-500 text-white px-4 py-2 rounded-md"
                                onClick={handleSubmit}
                            >
                                Submit
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default PostForm;
