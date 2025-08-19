import express from "express";
import { protect } from "../middlewares/auth.middleware.js";
import { createProfile, getProfile, updateProfile, deleteProfile} from "../controllers/user.controllers.js";

const userRouter = express.Router();

userRouter.post("/", protect, createProfile); //protect: middleware to make sure that only provide profile if user is logged in
userRouter.get("/", protect, getProfile);
userRouter.patch("/",protect, updateProfile);
userRouter.delete("/",protect,deleteProfile);
export default userRouter;