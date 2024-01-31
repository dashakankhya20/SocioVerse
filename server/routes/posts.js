import express from "express";
import {
  createPost,
  getFeedPosts,
  getUserPosts,
  updatePost,
  deletePost,
  likePost,
  dislikePost,
} from "../controllers/posts.js";
import { verifyToken } from "../middlewares/auth.js";

const router = express.Router();

// Create a post
router.post("/", verifyToken, createPost);
// Get all posts
router.get("/", verifyToken, getFeedPosts);
// Get posts made by a user
router.get("/user/:userId", verifyToken, getUserPosts);
// Update a post
router.put("/:postId", verifyToken, updatePost);
// Delete a post
router.delete("/:postId", verifyToken, deletePost);
// Like a post
router.put("/:postId/like/:userId", verifyToken, likePost);
// Dislike a post
router.put("/:postId/dislike/:userId", verifyToken, dislikePost);

export default router;
