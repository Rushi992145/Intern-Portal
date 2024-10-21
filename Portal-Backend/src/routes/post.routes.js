import { Router } from "express";
import { varifyJWT } from "../middlewares/auth.middleware.js";
import {createPost,getAllPosts,getAllPostsbyFilter,getPostAddedByLoggedUser,updatePost,getAllPostOfInternship,getAllPostOfFulltime} from "../controllers/post.controller.js"

const router = Router();

router.route("/create-post").post(varifyJWT,createPost);
router.route("/get-posts").get(getAllPosts);
router.route("/updatepost").patch(varifyJWT,updatePost);
router.route("/my-posts").get(varifyJWT,getPostAddedByLoggedUser);
router.route("/filter").get(varifyJWT,getAllPostsbyFilter);
router.route("/internship").get(varifyJWT,getAllPostOfInternship);
router.route("/fulltime").get(varifyJWT,getAllPostOfFulltime);

export default router;