import { Router } from "express";
import { varifyJWT } from "../middlewares/auth.middleware.js";
import {createPost,getAllPosts} from "../controllers/post.controller.js"

const router = Router();

router.route("/create-post").post(varifyJWT,createPost);
router.route("/get-posts").get(getAllPosts);
export default router;