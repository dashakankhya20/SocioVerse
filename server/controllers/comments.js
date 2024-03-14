import Comment from "../models/Comment.js";
import Post from "../models/Post.js";

// Creating a comment
export const createComment = async (req, res) => {
  try {
    const { postId, userId, content } = req.body;
    const newComment = new Comment({
      postId,
      userId,
      content,
    });
    await newComment.save();

    // Update the post document with the new comment's id
    await Post.findByIdAndUpdate(
      postId,
      { $push: { comments: newComment._id } },
      { new: true }
    );

    // Fetch all comments from the Comment collection
    const comments = await Comment.find();

    res.status(201).json(comments); // Return all comments
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get all comments of a specific post
export const getCommentsByPostId = async (req, res) => {
  try {
    const { postId } = req.params;
    const comments = await Comment.find({ postId }).populate({
      path: 'userId',
      select:'firstName lastName picturePath'
    });
    res.status(200).json(comments);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// Update a comment by id
export const updateComment = async (req, res) => {
  try {
    const { id } = req.params;
    const { content } = req.body;
    const updatedComment = await Comment.findByIdAndUpdate(
      id,
      { content },
      { new: true }
    );
    res.status(200).json(updatedComment);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete a comment by id
export const deleteComment = async (req, res) => {
  try {
    const { id } = req.params;
    await Comment.findByIdAndDelete(id);
    const { postId } = req.params;
    const comments = await Comment.find({ postId });
    res
      .status(200)
      .json({ message: "Comment deleted successfully!", comments });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
