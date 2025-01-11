import { Router } from "express";
import { varifyJWT } from "../middlewares/auth.middleware.js";
import {getPostByIds,createPost,getAllPosts,getAllPostsbyFilter,getMyAppliedJobs,getPostAddedByLoggedUser,updatePost,getAllPostOfInternship,getAllPostOfFulltime} from "../controllers/post.controller.js"

const router = Router();

router.route("/create-post").post(varifyJWT,createPost);
router.route("/get-posts").get(getAllPosts);
router.route("/updatepost").patch(varifyJWT,updatePost);
router.route("/my-posts").get(varifyJWT,getPostAddedByLoggedUser);
router.route("/filter").get(getAllPostsbyFilter);
router.route("/internship").get(getAllPostOfInternship);
router.route("/fulltime").get(getAllPostOfFulltime);
router.route("/get-applied-jobs").get(varifyJWT,getAllPostOfFulltime);
router.route("/get-myapplied").get(varifyJWT,getMyAppliedJobs);

export default router;