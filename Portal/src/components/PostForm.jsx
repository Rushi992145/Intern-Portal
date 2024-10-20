import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    toggleModal,
    updateFormData,
    addSkill,
    updateSkill,
    resetForm,
} from '../redux/postSlice.js';

const PostForm = () => {
    const dispatch = useDispatch();
    const { isModalOpen, formData } = useSelector((state) => state.post);

    const handleChange = (e) => {
        const { name, value } = e.target;
        dispatch(updateFormData({ name, value }));
    };

    const handleSkillChange = (index, value) => {
        dispatch(updateSkill({ index, value }));
    };

    const handleAddSkill = () => {
        dispatch(addSkill());
    };

    const handleReset = () => {
        dispatch(resetForm());
    };

    return (
        <>
            <button
                className="bg-blue-500 text-white px-4 py-2 rounded-md"
                onClick={() => dispatch(toggleModal())}
            >
                Create Post
            </button>

            {isModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                    <div className="bg-white p-6 rounded-md w-[500px] relative"> {/* Added relative positioning */}
                        {/* Close button */}
                        <button
                            className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
                            onClick={() => dispatch(toggleModal())} // Close the modal
                        >
                            <span className="material-symbols-outlined">close</span> {/* Icon for close button */}
                        </button>

                        <h2 className="text-lg font-semibold mb-4">Create a New Post</h2>

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

                        <input
                            type="text"
                            name="impression"
                            value={formData.impression}
                            onChange={handleChange}
                            placeholder="Impression"
                            className="w-full p-2 border border-gray-300 rounded-md mb-4"
                        />

                        {formData.requiredSkills.map((skill, index) => (
                            <div key={index} className="flex items-center gap-2 mb-2">
                                <input
                                    type="text"
                                    value={skill.skill}
                                    onChange={(e) =>
                                        handleSkillChange(index, e.target.value)
                                    }
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

                        <div className="flex justify-end gap-2">
                            <button
                                className="bg-gray-300 px-4 py-2 rounded-md"
                                onClick={handleReset}
                            >
                                Reset
                            </button>
                            <button
                                className="bg-blue-500 text-white px-4 py-2 rounded-md"
                                onClick={() => dispatch(toggleModal())}
                            >
                                Submit
                            </button>

                            {/* <button
                                className="bg-blue-500 text-white px-4 py-2 rounded-md"
                                onClick={() => {
                                    console.log(formData); // Log the entire formData object
                                    dispatch(toggleModal()); // Optionally close the modal after submitting
                                }}
                            >
                                Submit
                            </button> */}
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default PostForm;
