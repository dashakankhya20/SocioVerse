import Post from "../models/Post.js";

// Creating a post
export const createPost = async (req, res) => {
  try {
    const { userId, content, picturePath } = req.body;
    const newPost = new Post({ userId, content, picturePath });
    await newPost.save();
    res.status(201).json(newPost);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};
// Getting all posts
export const getFeedPosts = async (req, res) => {
  try {
    const posts = await Post.find();
    res.status(200).json(posts);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// Getting posts made by a user
export const getUserPosts = async (req, res) => {
  try {
    const { userId } = req.params;
    const posts = await Post.find({ userId });
    res.status(200).json(posts);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// Updating a post
export const updatePost = async (req, res) => {
  try {
    const { id } = req.params;
    const { content, picturePath } = req.body;
    const updatedPost = await Post.findByIdAndUpdate(
      id,
      { content, picturePath },
      { new: true }
    );
    res.status(200).json(updatedPost);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Deleting a post
export const deletePost = async (req, res) => {
  try {
    const { id } = req.params;
    await Post.findByIdAndDelete(id);
    res.status(200).json({ message: "Post deleted successfully." });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Liking a post
export const likePost = async (req, res) => {
  try {
    const { postId, userId } = req.params;
    const post = await Post.findById(postId);

    // Remove userId from dislikes array if present
    const dislikeIndex = post.dislikes.indexOf(userId);
    if (dislikeIndex !== -1) {
      post.dislikes.splice(dislikeIndex, 1);
    }

    // Add userId to likes array if not already liked
    if (!post.likes.includes(userId)) {
      post.likes.push(userId);
      await post.save();
    }

    res.status(200).json(post.likes);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Disliking a post
export const dislikePost = async (req, res) => {
  try {
    const { postId, userId } = req.params;
    const post = await Post.findById(postId);

    // Remove userId from likes array if present
    const likeIndex = post.likes.indexOf(userId);
    if (likeIndex !== -1) {
      post.likes.splice(likeIndex, 1);
    }

    // Add userId to dislikes array if not already disliked
    if (!post.dislikes.includes(userId)) {
      post.dislikes.push(userId);
      await post.save();
    }

    res.status(200).json(post.dislikes);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
