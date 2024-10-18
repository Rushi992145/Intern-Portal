import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import {Post} from "../models/post.model.js";
import {ApiResponse} from "../utils/ApiResponse.js"
import {User} from "../models/user.model.js"
import jwt from "jsonwebtoken"
import mongoose from "mongoose";




const createPost = asyncHandler(async (req, res) => {
    const { role, companyName, description, applicationLink, requiredSkills } = req.body;

    if (!role || !companyName || !description || !applicationLink) {
        throw new ApiError(400, "All required fields must be provided.");
    }
    console.log(req.body);
    

    const user = await User.findById(req.user._id);
    if (!user) {
        throw new ApiError(404, "User not found.");
    }

    const post = new Post({
        role,
        companyName,
        description,
        applicationLink,
        requiredSkills,
    });

    await post.save();

    res.status(201).json(new ApiResponse(201, "Post created successfully", post));
});

const getAllPosts = asyncHandler(async (req, res) => {
    const { page = 1, limit = 10, search, companyName, role } = req.query;

    const aggregationPipeline = [];

    // Filter by companyName or role if provided
    if (companyName) {
        aggregationPipeline.push({
            $match: {
                companyName: { $regex: companyName, $options: "i" },
            },
        });
    }

    if (role) {
        aggregationPipeline.push({
            $match: {
                role: { $regex: role, $options: "i" },
            },
        });
    }

    if (search) {
        aggregationPipeline.push({
            $match: {
                $or: [
                    { description: { $regex: search, $options: "i" } },
                    { role: { $regex: search, $options: "i" } },
                ],
            },
        });
    }

    const options = {
        page: parseInt(page, 10),
        limit: parseInt(limit, 10),
    };

    const posts = await Post.aggregatePaginate(Post.aggregate(aggregationPipeline), options);

    res.status(200).json(new ApiResponse(200, "Posts retrieved successfully", posts));
});

export { createPost, getAllPosts };
