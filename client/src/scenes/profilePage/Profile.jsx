import { Box, useMediaQuery } from "@mui/material";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import FriendListWidget from "scenes/widgets/FriendListWidget";
import MyPostWidget from "scenes/widgets/MyPostWidget";
import PostsWidget from "scenes/widgets/PostsWidget";
import UserWidget from "scenes/widgets/UserWidget";

const Profile = () => {
  const [user, setUser] = useState(null);
  const { id } = useParams();
  console.log("Profile UserID: ",id)
  const token = useSelector((state) => state.token);
  const isNonMobileScreens = useMediaQuery("(min-width:1000px)");

  const getUser = async () => {
    const response = await fetch(`http://localhost:3001/users/${id}`, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` }
    })
    const data = await response.json();
    setUser(data);
  }
  

  useEffect(() => {
    getUser();
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  if (!user) return null;
  return (

    <Box
      width="100%"
      padding="2rem 6%"
      display={isNonMobileScreens ? "flex" : "block"}
      gap="0.5rem"
      justifyContent="space-between"
    >
      <Box flexBasis={isNonMobileScreens ? "26%" : undefined}>
        <UserWidget userId={id} picturePath={user.picturePath} />
      </Box>
      <Box
        flexBasis={isNonMobileScreens ? "42%" : undefined}
        mt={isNonMobileScreens ? undefined : "2rem"}
      >
        <MyPostWidget picturePath={user.picturePath} />
        <PostsWidget userId={id} />
      </Box>
    </Box>

  )
}

export default Profile