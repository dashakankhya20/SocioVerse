import express from "express";
import { 
    getUser,
    getUserFriends,
    updateUser,
    addRemoveFriend,
    deleteUser
} from "../controllers/users.js";
import { verifyToken } from "../middlewares/auth.js";

const router = express.Router();
// Here the routes will start from /users
// Get a user by ID
router.get("/:id", verifyToken, getUser);
// Get user's friends 
router.get("/:id/friends", verifyToken, getUserFriends);
// Update user profile
router.put("/:id", verifyToken,updateUser);
// Add or remove friend
router.put('/:id/friends/:friendId', addRemoveFriend);
// Delete a user
router.delete('/:id', deleteUser);


export default router;