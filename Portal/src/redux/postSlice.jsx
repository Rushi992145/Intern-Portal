import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    isModalOpen: false,
    formData: {
        companyName: '',
        description: '',
        impression: '',
        requiredSkills: [{ skill: '' }],
        applicationLink: '',
    },
};

const postSlice = createSlice({
    name: 'post',
    initialState,
    reducers: {
        toggleModal: (state) => {
            state.isModalOpen = !state.isModalOpen;
        },
        updateFormData: (state, action) => {
            const { name, value } = action.payload;
            state.formData[name] = value;
        },
        addSkill: (state) => {
            state.formData.requiredSkills.push({ skill: '' });
        },
        updateSkill: (state, action) => {
            const { index, value } = action.payload;
            state.formData.requiredSkills[index].skill = value;
        },
        resetForm: (state) => {
            state.formData = initialState.formData;
        },
    },
});

export const { toggleModal, updateFormData, addSkill, updateSkill, resetForm } =
    postSlice.actions;
export default postSlice.reducer;
