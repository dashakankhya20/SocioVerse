import express from "express";
import { 
    getAllUsers,
    getUser,
    getUserFriends,
    updateUser,
    addRemoveFriend,
    deleteUser,
    searchUsers
} from "../controllers/users.js";
import { verifyToken } from "../middlewares/auth.js";

const router = express.Router();
// Here the routes will start from /users
//get a user by the search term
router.get('/search', verifyToken, searchUsers);
//Get all users 
router.get("/", getAllUsers);
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