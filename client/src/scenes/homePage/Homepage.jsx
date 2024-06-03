import React from 'react'
import Navbar from 'scenes/navbar/Navbar'
import UserWidget from 'scenes/widgets/UserWidget'
import { useSelector } from 'react-redux'
import { Box } from '@mui/material'
import { useMediaQuery } from '@mui/material'
import MyPostWidget from 'scenes/widgets/MyPostWidget'
import PostsWidget from 'scenes/widgets/PostsWidget'
import AdvertWidget from 'scenes/widgets/AdvertWidget'
import FriendListWidget from 'scenes/widgets/FriendListWidget'
import SearchBar from 'scenes/searchBar/SearchBar'

const Homepage = () => {
  const isNonMobileScreens = useMediaQuery("(min-width:1000px)");
  const { _id, picturePath } = useSelector((state) => state.user);
  //console.log("Id: ", _id);

  return (
    <Box>
      <Navbar />
      <Box
        width="100%"
        padding="2rem 6%"
        display={isNonMobileScreens ? "flex" : "block"}
        gap="0.5rem"
        justifyContent="space-between"
        mt="5rem"
      >
        <Box flexBasis={isNonMobileScreens ? "26%" : undefined}>
          {isNonMobileScreens ? (
            <UserWidget userId={_id} picturePath={picturePath} />
          ) : (
            <SearchBar placeholder="Search for people..."/>
          )}

        </Box>
        <Box
          flexBasis={isNonMobileScreens ? "42%" : undefined}
          mt={isNonMobileScreens ? undefined : "2rem"}
        >
          <MyPostWidget picturePath={picturePath} />
          <PostsWidget userId={_id} />
        </Box>
        {isNonMobileScreens && (
          <Box flexBasis="26%">
            <AdvertWidget />
            <Box m="2rem 0">
              <FriendListWidget userId={_id} />
            </Box>
          </Box>
        )}
      </Box>
    </Box>
  )
}

export default Homepage