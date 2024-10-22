import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const signupUser = createAsyncThunk(
    'auth/signup',
    async (userData, { rejectWithValue }) => {
        try {
            const response = await axios.post('http://localhost:9000/api/v2/users/register', userData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            console.log(response)
            
            if (response.data.data.accessToken && response.data.data.user) {
                localStorage.setItem('accessToken', response.data.data.accessToken);
                localStorage.setItem('user', JSON.stringify(response.data.data.user));
            }
            console.log(localStorage);

            console.log('Signup Response:', response.data);
            return response.data;
        } catch (error) {
            console.error('Signup Error:', error.response?.data);
            return rejectWithValue('User already exist');
        }
    }
);

export const loginUser = createAsyncThunk(
    'auth/login',
    async (credentials, { rejectWithValue }) => {
        try {
            const response = await axios.post('http://localhost:9000/api/v2/users/login', credentials);
            console.log(response);

            if (response.data.data.accessToken && response.data.data.user) {
                localStorage.setItem('accessToken', response.data.data.accessToken);
                localStorage.setItem('user', JSON.stringify(response.data.data.user));
                console.log("localStorage set");
            }
            console.log('Login Response:', response);
            return response.data;   
        } catch (error) {
            return rejectWithValue('Invalid credentials');
        }
    }
);

export const logoutUser = createAsyncThunk('auth/logout', async (_, { rejectWithValue }) => {
    try {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('user'); 
        return true;
    } catch (error) {
        return rejectWithValue('Logout failed');
    }
});


const authSlice = createSlice({
    name: 'auth',
    initialState: {
        user: JSON.parse(localStorage.getItem('user')) || null, // Retrieve user from local storage
        accessToken: localStorage.getItem('accessToken') || null, // Use accessToken
        loading: false,
        error: null,
    },
    reducers: {},
    
    extraReducers: (builder) => {
        builder
            .addCase(signupUser.fulfilled, (state, action) => {
                state.user = action.payload.user; // Use user from action
                state.error = null;
                state.loading = false;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.user = action.payload.user;
                state.accessToken = action.payload.accessToken;
                state.error = null;
                state.loading = false;
            })
            .addCase(logoutUser.fulfilled, (state) => {
                state.user = null;
                state.accessToken = null;
                state.error = null;
            })
            .addMatcher(
                (action) => action.type.endsWith('/pending'),
                (state) => {
                    state.loading = true;
                    state.error = null;
                }
            )
            .addMatcher(
                (action) => action.type.endsWith('/rejected'),
                (state, action) => {
                    state.loading = false;
                    state.error = action.payload || action.error.message;
                }
            );
    },
});

export default authSlice.reducer;
