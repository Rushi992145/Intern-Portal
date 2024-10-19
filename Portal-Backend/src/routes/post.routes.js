import { Router } from "express";
import { varifyJWT } from "../middlewares/auth.middleware.js";
import {createPost,getAllPosts,getAllPostsbyFilter,getPostAddedByLoggedUser,updatePost} from "../controllers/post.controller.js"

const router = Router();

router.route("/create-post").post(varifyJWT,createPost);
router.route("/get-posts").get(getAllPosts);
router.route("/updatepost/:postId").patch(varifyJWT,updatePost);
router.route("/my-posts").get(varifyJWT,getPostAddedByLoggedUser);
router.route("/filter").get(varifyJWT,getAllPostsbyFilter);

export default router;