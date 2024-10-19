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
    const owner = req.user._id

    const user = await User.findById(owner);
    if (!user) {
        throw new ApiError(404, "User not found.");
    }

    const post = new Post({
        owner,
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

const getPostAddedByLoggedUser = asyncHandler(async (req, res) => {
    const owner = req.user._id;

    if (!owner) {
        throw new ApiError(404, "User Not Found");
    }

    try {
        const posts = await Post.find({ owner });

        if (!posts || posts.length === 0) {
            return res.status(404).json(new ApiResponse(404, {}, "No posts found for this user"));
        }

        res.status(200).json(new ApiResponse(200, posts, "Posts retrieved successfully"));
    } catch (error) {
        throw new ApiError(500, "Something went wrong while fetching posts");
    }
});

const updatePost = asyncHandler(async (req, res) => {
    const { postId } = req.params;
    const owner = req.user._id;

    if (!mongoose.Types.ObjectId.isValid(postId)) {
        throw new ApiError(400, "Invalid post ID");
    }

    const post = await Post.findById(postId);
    
    if (!post) {
        throw new ApiError(404, "Post not found");
    }

    if (post.owner.toString() !== owner.toString()) {
        throw new ApiError(403, "You do not have permission to update this post");
    }


    const { role, companyName, description, applicationLink, requiredSkills } = req.body;


    if (role) post.role = role;
    if (companyName) post.companyName = companyName;
    if (description) post.description = description;
    if (applicationLink) post.applicationLink = applicationLink;
    if (requiredSkills) post.requiredSkills = requiredSkills;

    const updatedPost = await post.save();

    res.status(200).json(new ApiResponse(200, updatedPost, "Post updated successfully"));
});


export { createPost, getAllPosts , getPostAddedByLoggedUser,updatePost};
