import { Router } from "express";
import { 
    loginUser, 
    logoutUser, 
    registerUser ,
    refreshAccessToken, 
    changeCurrentPassword, 
    getCurrentUser, 
    updateAccountDetails, 
    updateUserProfileImage,
    addQualification,
    getMyAppliedJobs,
    addMyAppliedJobs,
    removeMyAppliedJob
} from "../controllers/user.controller.js";
import {upload} from "../middlewares/multer.middleware.js"
import { varifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

router.route("/register").post(
    upload.fields([
        {
            name:"profileImage",
            maxCount:1
        }
    ]),
    registerUser
)
// router.route("/login").post(login)

router.route("/login").post(loginUser)

//secured routes

router.route("/logout").post(varifyJWT,logoutUser)

router.route("/refresh-token").post(refreshAccessToken)

router.route("/change-password").post(varifyJWT,changeCurrentPassword)

router.route("/current-user").get(varifyJWT,getCurrentUser)

router.route("/update-account").patch(varifyJWT,updateAccountDetails)

router.route("/profile-image").patch(varifyJWT,upload.single("profileImage"),updateUserProfileImage)

router.route("/add-qualification").post(varifyJWT,addQualification)

router.route("/get-my-applied").get(varifyJWT,getMyAppliedJobs)

router.route("/apply-job").post(varifyJWT,addMyAppliedJobs)

router.route("/remove-my-applied-job").delete(varifyJWT,removeMyAppliedJob)

export default router;