import User from "../models/User.js";

export const getAllUsers = async (req, res) => {
  try {
    const user = await User.find({});
    res.status(200).json(user);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
// get a user by id
export const getUser = async (req, res) => {
  try {
    const { id } = req.params;
    console.log(req.params);
    const user = await User.findById(id);
    console.log(id);
    res.status(200).json(user);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// getting user's friends
// export const getUserFriends = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const user = await User.findById(id);

//     const friends = await Promise.all(
//       user.friends.map((id) => User.findById(id))
//     );
//     const formattedFriends = friends.map(
//       ({
//         _id,
//         firstName,
//         lastName,
//         email,
//         picturePath,
//         friends,
//         location,
//         occupation,
//         viewedProfile,
//         impressions,
//         profileLock,
//         bio,
//         relationshipStatus,
//         dob,
//       }) => {
//         return {
//           _id,
//           firstName,
//           lastName,
//           email,
//           picturePath,
//           friends,
//           location,
//           occupation,
//           viewedProfile,
//           impressions,
//           profileLock,
//           bio,
//           relationshipStatus,
//           dob,
//         };
//       }
//     );
//     res.status(200).json(formattedFriends);
//   } catch (error) {
//     res.status(404).json({ message: error.message });
//   }
// };
//get a user's friend by userid
export const getUserFriends = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id).populate("friends");
    res.status(200).json(user.friends);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// Updating user profile
export const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedUser = await User.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Create a friend
export const createFriend = async (req, res) => {
  try {
    const { id, friendId } = req.params;
    console.log(id);

    // Check if the user and friend exist
    const user = await User.findById(id);
    const friend = await User.findById(friendId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    if (!friend) {
      return res.status(404).json({ message: "Friend not found" });
    }

    // Add friendId to user's friends list
    if (!user.friends.includes(friendId)) {
      user.friends.push(friendId);
      await user.save();
    }

    // Add userId to friend's friends list
    if (!friend.friends.includes(id)) {
      friend.friends.push(id);
      await friend.save();
    }

    // Populate the friends field with detailed friend information
    const populatedUser = await user.populate(
      "friends",
      "firstName lastName occupation picturePath"
    );

    // Return populated friends data
    return res.status(200).json(populatedUser.friends);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};
// Remove a friend
export const removeFriend = async (req, res) => {
  try {
    const { id, friendId } = req.params;

    // Check if the user and friend exist
    const user = await User.findById(id);
    const friend = await User.findById(friendId);
    if (!user || !friend) {
      return res.status(404).json({ message: "User or friend not found" });
    }

    // Remove friendId from user's friends list
    if (user.friends.includes(friendId)) {
      user.friends = user.friends.filter((id) => id.toString() !== friendId);
      await user.save();
    }

    // Remove userId from friend's friends list
    if (friend.friends.includes(id)) {
      friend.friends = friend.friends.filter(
        (friend_id) => friend_id.toString() !== id
      );
      await friend.save();
    }

    // Populate the friends field with detailed friend information
    const populatedUser = await user.populate('friends', 'firstName lastName occupation picturePath');

    // Return populated friends data
    return res.status(200).json(populatedUser.friends);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

// Deleting a user
export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    await User.findByIdAndDelete(id);
    res.status(200).json({ message: "User deleted successfully!" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

//search for a user by the search term
export const searchUsers = async (req, res) => {
  try {
    const searchTerm = req.query.searchTerm;
    // console.log(searchTerm)
    //searching users by their firstname or lastname
    const users = await User.find({
      $or: [
        { firstName: { $regex: searchTerm, $options: "i" } },
        { lastName: { $regex: searchTerm, $options: "i" } },
      ],
    });
    //console.log("Users found:", users);

    res.status(200).json(users);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// To increment viewedProfile
export const incrementProfileViews = async (req, res) => {
  try {
    const { viewerId, profileUserId } = req.body;
    const viewInterval = 24 * 60 * 60 * 1000; // 24 hours in milliseconds

    if (viewerId !== profileUserId) {
      const profileUser = await User.findById(profileUserId);

      if (!profileUser) {
        return res.status(404).json({ message: "Profile user not found" });
      }

      const now = new Date();

      // Find the recent view by the same user
      let recentViewIndex = profileUser.recentViews.findIndex((view) =>
        view.viewerId.equals(viewerId)
      );

      if (recentViewIndex === -1 || now - new Date(profileUser.recentViews[recentViewIndex].viewedAt) > viewInterval) {
        // Increment the viewedProfile field
        profileUser.viewedProfile += 1;

        if (recentViewIndex !== -1) {
          // Update the existing recent view timestamp
          profileUser.recentViews[recentViewIndex].viewedAt = now;
        } else {
          // Add a new recent view entry
          profileUser.recentViews.push({ viewerId, viewedAt: now });
        }

        await profileUser.save();
        return res.status(200).json({ message: "Profile view incremented" });
      } else {
        return res
          .status(200)
          .json({
            message: "Profile view not incremented due to frequent viewing",
          });
      }
    } else {
      return res
        .status(400)
        .json({ message: "Users cannot increment their own profile views" });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
