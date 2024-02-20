import User from "../models/User.js";


export const getAllUsers = async (req, res) => {
  try {
    const user = await User.find({});
    res.status(200).json(user);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
}
// get or search for a user 
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
export const getUserFriends = async(req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id).populate('friends');
    res.status(200).json(user.friends);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
}

// Updating user profile
export const updateUser = async(req, res) => {
  try {
    const { id } = req.params;
    const updatedUser = await User.findByIdAndUpdate(id, req.body, { new: true});
    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

// Adding or removing friend
export const addRemoveFriend = async (req, res) => {
  try {
    const { id, friendId } = req.params;
    const user = await User.findById(id);
    const friend = await User.findById(friendId);

    if (user.friends.includes(friendId)) {
      user.friends = user.friends.filter((id) => id !== friendId);
      friend.friends = friend.friends.filter((id) => id !== id);
    } else {
      user.friends.push(friendId);
      friend.friends.push(id);
    }
    await user.save();
    await friend.save();
    const friends = await Promise.all(
      user.friends.map((id) => User.findById(id))
    );
    const formattedFriends = friends.map(
      ({
        _id,
        firstName,
        lastName,
        email,
        picturePath,
        friends,
        location,
        occupation,
        viewedProfile,
        impressions,
        profileLock,
        bio,
        relationshipStatus,
        dob,
      }) => {
        return {
          _id,
          firstName,
          lastName,
          email,
          picturePath,
          friends,
          location,
          occupation,
          viewedProfile,
          impressions,
          profileLock,
          bio,
          relationshipStatus,
          dob,
        };
      }
    );
    res.status(200).json(formattedFriends);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// Deleting a user 
export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    await User.findByIdAndDelete(id);
    res.status(200).json({ message: "User deleted successfully!"});
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}