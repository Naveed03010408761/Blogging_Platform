import express from "express";
import {
  createPost,
  getAllPosts,
  getPost,
  updatePost,
  deletePost,
} from "../controllers/post.controller.js";

const postRouter = express.Router();

// Create a post
postRouter.post("/", createPost);

// Get all posts
postRouter.get("/", getAllPosts);

// Get a single post by id
postRouter.get("/:id", getPost);

// Update a post by id
postRouter.put("/:id", updatePost);

// Delete a post by id
postRouter.delete("/:id", deletePost);

export default postRouter;
