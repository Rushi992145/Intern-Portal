import {asyncHandler} from "../utils/asyncHandler.js";
import {ApiError} from "../utils/ApiError.js";
import {User} from "../models/user.model.js"
import {uploadOnCloudinary} from "../utils/cloudinary.js"
import { ApiResponse } from "../utils/ApiResponse.js";
import jwt from "jsonwebtoken"
import mongoose from "mongoose";

const generateAccessAndRefreshTokens = async(userId) => {
    try {
        const user = await User.findById(userId)
        const accessToken = await user.generateAccessToken()
        const refreshToken = await user.generateRefreshToken()

        user.refreshToken = refreshToken
        await user.save({validateBeforeSave:false})

        return {accessToken,refreshToken}

    } catch (error) {
        throw new ApiError(500,"Something went wrong while generating access token");
    }
}


const registerUser = asyncHandler(async(req,res) => {
    // res.status(200).json({
    //     message:"ok"
    // })    

    const {fullname,email,username,password,mobileNumber,birthDate} = req.body;
    console.log(req.body);

    if(
        [fullname,email,username,password,mobileNumber,birthDate].some((field)=> field?.trim()==="")
    ) {
        throw new ApiError(400,"All fields are required")
    }
    
    const existedUser = await User.findOne({
        $or: [{ username },{ email }]
    })
    if(existedUser) {
        throw new ApiError(409,"User with email or username already exists")
    }
    // console.log(req.files);
    

    let coverImageLocalPath;
    if(req.files && Array.isArray(req.files.coverImage) && req.files.coverImage.length > 0) {
        coverImageLocalPath = req.files.coverImage[0].path;
    }

    const coverImage = await uploadOnCloudinary(coverImageLocalPath);

    const user = await User.create({
        fullname,
        coverImage:coverImage?.url || "",
        email,
        password,
        username:username.toLowerCase(),
        mobileNumber,
        birthDate
    })
    const {accessToken,refreshToken} =  await generateAccessAndRefreshTokens(user._id);

    const createdUser =  await User.findById(user._id).select(
        "-password -refreshToken"
    )


    if(!createdUser) {
        throw new ApiError(500,"Something went wrong while registering user")
    }
    const options = {
        httpOnly: true,
        secure: true
    }

    return res.status(201)
    .cookie("accessToken",accessToken,options)
    .cookie("refreshToken",refreshToken,options)
    .json(
        new ApiResponse(200,createdUser,"User registered successfully")
    )

})

const loginUser = asyncHandler(async(req,res) => {

    const {email,username,password} = req.body

    if(!username && !email) {
        throw new ApiError(400,"username or email is required")
    }

    const user = await User.findOne({
        $or:[{username},{email}]
    })
    if(!user) {
        throw new ApiError(404,"User does not exists");
    }

    const isPasswordValid = await user.isPasswordCorrect(password)

    if(!isPasswordValid) {
        throw new ApiError(401,"Invalid user credential");
    }
    const {accessToken,refreshToken} =  await generateAccessAndRefreshTokens(user._id);

    const loggedInUser = await User.findById(user._id).select("-password -refreshToken")

    const options = {
        httpOnly: true,
        secure: true
    }
    return res
    .status(200)
    .cookie("accessToken",accessToken,options)
    .cookie("refreshToken",refreshToken,options)
    .json(
        new ApiResponse(
            200,
            {
                user: loggedInUser,accessToken,refreshToken
            },
            "User Logged In Successfully"
        )
    )
})

const logoutUser = asyncHandler(async(req,res) => {
    await User.findByIdAndUpdate(
        req.user._id,
        {
            $unset:{
                refreshToken:1
            }
        },
        {
            new: true
        }
    )
    const options = {
        httpOnly: true,
        secure: true
    }
    return res
    .status(200)
    .clearCookie("accessToken",options)
    .clearCookie("refreshToken",options)
    .json(new ApiResponse(200,{},"User Logged out Successfully"))
})

const refreshAccessToken = asyncHandler(async(req,res) => {
    const incomingRefreshToken = req.cookies.refreshToken || req.body.refreshToken

    if(!incomingRefreshToken) {
        throw new ApiError(401,"Unauthorized request")
    }

    try {
        const decodedToken = jwt.verify(
            incomingRefreshToken,
            process.env.REFRESH_TOKEN_SECRET
        )
    
        const user = await User.findById(decodedToken?._id)
        if(!user) {
            throw new ApiError(401,"Invalid refresh token")
        }
    
        if(incomingRefreshToken !== user?.refreshToken ){
            throw new ApiError(401,"Refresh token is expired or used")
        }
    
        const options = {
            httpOnly:true,
            secure:true
        }
    
        const {accessToken,newrefreshToken} = await generateAccessAndRefreshTokens(user._id)
    
        return res
        .status(200)
        .cookie("accessToken",accessToken,options)
        .cookie("refreshToken",newrefreshToken,options)
        .json(
            new ApiResponse(
                200,
                {accessToken,refreshToken:newrefreshToken},
                "Access token successfully"
            )
        )
    } catch (error) {
        throw new ApiError(401,error?.message || "Invalid refresh token")
    }

})

const changeCurrentPassword = asyncHandler(async(req,res) =>{
    const {oldPassword,newPassword} = req.body
    console.log(req);
    console.log(oldPassword,newPassword);
    
    const user = await User.findById(req.user?._id)
    
    const isPasswordCorrect = await user.isPasswordCorrect(oldPassword)
    if(!isPasswordCorrect) {
        throw new ApiError(400,"Invalid old password")
    }

    user.password = newPassword
    await user.save({validateBeforeSave:false})

    return res
    .status(200)
    .json(new ApiResponse(200,{},"Password changed successfully"))
})

const getCurrentUser = asyncHandler(async(req,res) => {
    return res
    .status(200)
    .json(new ApiResponse(200,req.user,"current user fetched successfully"))
})

const updateAccountDetails = asyncHandler(async(req,res) => {
    const {fullname,username,email} = req.body
    if(!fullname || !email || !username) {
        throw new ApiError(400,"All fields are required")
    }

    const user = await User.findByIdAndUpdate(
        req.user?._id,
        {
            $set:{
                username:username,
                email:email,
                fullname:fullname
            }
        },
        {new:true}
    ).select("-password")
    console.log(user)
    return res
    .status(200)
    .json(new ApiResponse(200,user,"Account details updated successfully"))

})

const updateUserProfileImage = asyncHandler(async(res,req) => {
    const profileImageLocalPath = req.file?.path
    if(!profileImageLocalPath) {
        throw new ApiError(400,"Cover Image file is missing")
    }

    const  profileImage = await uploadOnCloudinary(profileImageLocalPath)
    if(!profileImage.url) {
        throw new ApiError(400,"Error while uploading cover image")
    }

    const user = await User.findByIdAndUpdate(
        req.user._id,
        {
            $set:{
                profileImage:profileImage.url
            }
        },
        {new: true}
    ).select("-password")

    return res
    .status(200)
    .json(
        new ApiResponse(200,user,"Cover Image updated successfully")
    )

})

const addQualification = asyncHandler(async (req, res) => {
    const { qualification } = req.body;

    console.log("Rushi",qualification)

    if (!qualification || !qualification.degree || !qualification.startYear || !qualification.endYear) {
        return res.status(400).json({ message: 'All fields are required for qualification' });
    }

    if (qualification.startYear > qualification.endYear) {
        return res.status(400).json({ message: 'Start year cannot be greater than end year' });
    }

    try {
        const user = await User.findById(req.user?._id).select("-password -refreshToken");
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Check if qualification already exists or overlaps with the same degree
        const doesExist = user.qualifications.some(q => 
            q.degree === qualification.degree && 
            (
                (q.startYear <= qualification.endYear && q.endYear >= qualification.startYear)
            )
        );

        if (doesExist) {
            return res.status(201).json({ message: 'Qualification already exists or overlaps in the year range' });
        }

        // Add new qualification
        user.qualifications.push(qualification);

        await user.save();

        return res.status(200).json({ message: 'Qualification added successfully', user });
    } catch (error) {
        return res.status(500).json({ message: 'An error occurred while adding qualification', error });
    }
});

const removeQualification = asyncHandler(async (req, res) => {
    const { degree, startYear, endYear } = req.body;
    console.log(req.body);
    

    if (!degree || !startYear || !endYear) {
        return res.status(400).json({ message: 'Degree, start year, and end year are required' });
    }

    try {
        const user = await User.findById(req.user?._id).select("-password -refreshToken");

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Find the index of the qualification to remove
        const qualificationIndex = user.qualifications.findIndex(
            (qualification) =>
                qualification.degree === degree &&
                qualification.startYear === startYear &&
                qualification.endYear === endYear
        );

        if (qualificationIndex === -1) {
            return res.status(404).json({ message: 'Qualification not found' });
        }

        // Remove the qualification from the qualifications array
        user.qualifications.splice(qualificationIndex, 1);

        // Save the updated user document
        await user.save();

        // Return the updated user with qualifications removed
        return res.status(200).json({ message: 'Qualification removed successfully', user });
    } catch (error) {
        console.error("Error removing qualification:", error);
        return res.status(500).json({ message: 'An error occurred while removing the qualification', error: error.message });
    }
});

const getMyAppliedJobs = asyncHandler(async (req, res) => {
    try {
        const user = await User.findById(req.user._id).populate('myApplied', '-description -impression').select('-password -refreshToken');

        if (!user) {
            throw new ApiError(404, 'User not found');
        }

        return res.status(200).json(new ApiResponse(200, user.myApplied, 'Applied jobs fetched successfully'));
    } catch (error) {
        return res.status(500).json({ message: 'An error occurred while fetching applied jobs', error });
    }
});

const addMyAppliedJobs = asyncHandler(async (req, res) => {
    const { jobId } = req.body;

    // Validate jobId presence
    if (!jobId) {
        return res.status(400).json({ success: false, message: 'Job ID is required' });
    }

    try {
        // Fetch user data based on authenticated user ID
        const user = await User.findById(req.user._id);

        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }

        // Check if the job is already applied
        if (user.myApplied.includes(jobId)) {
            return res.status(400).json({ success: false, message: 'Job already applied' });
        }

        // Add jobId to myApplied list
        user.myApplied.push(jobId);

        // Save user data
        await user.save();

        return res.status(200).json({
            success: true,
            message: 'Job added to applied list successfully',
            data: user.myApplied,
        });
    } catch (error) {
        // Detailed error logging for debugging
        console.error('Error adding applied job:', error);

        return res.status(500).json({
            success: false,
            message: 'An error occurred while adding the job to the applied list',
            error: error.message || 'Unknown error',
        });
    }
});

const removeMyAppliedJob = asyncHandler(async (req, res) => {
    const { jobId } = req.body;

    if (!jobId) {
        throw new ApiError(400, 'Job ID is required');
    }

    try {
        const user = await User.findById(req.user._id);

        if (!user) {
            throw new ApiError(404, 'User not found');
        }

        // Check if the job is in the applied list
        const jobIndex = user.myApplied.indexOf(jobId);
        if (jobIndex === -1) {
            throw new ApiError(404, 'Job not found in applied list');
        }

        // Remove the job from the applied list
        user.myApplied.splice(jobIndex, 1);

        await user.save();

        return res.status(200).json(new ApiResponse(200, {}, 'Job removed from applied list successfully'));
    } catch (error) {
        return res.status(500).json({ message: 'An error occurred while removing the job from the applied list', error });
    }
});




export {
    registerUser,
    loginUser,
    logoutUser,
    refreshAccessToken,
    getCurrentUser,
    changeCurrentPassword,
    updateAccountDetails,
    updateUserProfileImage,
    addQualification,
    removeQualification,
    getMyAppliedJobs,
    addMyAppliedJobs,
    removeMyAppliedJob,
}