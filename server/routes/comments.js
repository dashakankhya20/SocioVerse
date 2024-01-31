import express from "express";
import {
  createComment,
  getCommentsByPostId,
  updateComment,
  deleteComment,
} from "../controllers/comments.js";
import { verifyToken } from "../middlewares/auth.js";


const router = express.Router();

// Create a comment
router.post("/", verifyToken, createComment);

// Get comments by post ID
router.get("/post/:postId", verifyToken, getCommentsByPostId);

// Update a comment
router.put("/:id", verifyToken, updateComment);

// Delete a comment
router.delete("/:id", verifyToken, deleteComment);

export default router;
