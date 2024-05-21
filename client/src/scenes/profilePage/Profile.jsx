import { Box, useMediaQuery } from "@mui/material";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import MyPostWidget from "scenes/widgets/MyPostWidget";
import PostsWidget from "scenes/widgets/PostsWidget";
import UserWidget from "scenes/widgets/UserWidget";
import AdvertWidget from "scenes/widgets/AdvertWidget";
import Navbar from "scenes/navbar/Navbar";

const Profile = () => {
  const [user, setUser] = useState(null);
  const { id } = useParams();
  console.log("Profile UserID: ", id);
  const token = useSelector((state) => state.token);
  const isNonMobileScreens = useMediaQuery("(min-width:1000px)");
  const viewerId = useSelector((state) => state.user._id);
  
  const getUser = async () => {
    const response = await fetch(`http://localhost:3001/users/${id}`, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await response.json();
    setUser(data);

    if(viewerId !== id){
      incrementProfileView(viewerId, id);
    }
  };

  const incrementProfileView = async (viewerId, profileUserId) => {
    try {
      const response = await fetch(`http://localhost:3001/users/increment-profile-view`, {
        method: 'PATCH',
        headers: { 
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}` 
        },
        body: JSON.stringify({viewerId, profileUserId})
      });
      const data = await response.json();
      console.log("Profile View:",data.message);
    } catch (error) {
      console.error(`Error incrementing profile view: ${error}`);
    }
  }

  useEffect(() => {
    getUser();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  if (!user) return null;
  return (
    <>
    <Navbar/>
    <Box
      width="100%"
      padding="2rem 6%"
      display={isNonMobileScreens ? "flex" : "block"}
      alignItems="baseline"
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
        {/* <MyPostWidget picturePath={user.picturePath} /> */}
        <PostsWidget userId={id} isProfile={true} />
      </Box>
      {isNonMobileScreens && (
        <Box flexBasis="26%">
          <AdvertWidget />
        </Box>
      )}
    </Box>
    </>
    
  );
};

export default Profile;
