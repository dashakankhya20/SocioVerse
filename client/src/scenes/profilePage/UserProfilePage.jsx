import React, { useState, useEffect } from 'react'
import Navbar from 'scenes/navbar/Navbar'
import { Box, Typography, useMediaQuery, useTheme, Button } from '@mui/material'
import WidgetWrapper from 'components/WidgetWrapper'
import FriendListWidget from 'scenes/widgets/FriendListWidget'
import PostsWidget from 'scenes/widgets/PostsWidget'
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import UserImage from 'components/UserImage';
import FlexBetween from 'components/FlexBetween';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PeopleIcon from '@mui/icons-material/People';
import EmailIcon from '@mui/icons-material/Email';
import CakeIcon from '@mui/icons-material/Cake';
import WorkIcon from '@mui/icons-material/Work';
import FavoriteIcon from '@mui/icons-material/Favorite';


const UserProfilePage = () => {
    const [user, setUser] = useState(null);
    const { id } = useParams();
    console.log("Profile UserID: ", id);
    const token = useSelector((state) => state.token);
    const isNonMobileScreens = useMediaQuery("(min-width:1000px)");
    const viewerId = useSelector((state) => state.user._id);
    const friends = useSelector((state) => state.user.friends);
    console.log(friends)
    const { palette } = useTheme();
    const medium = palette.neutral.medium;
    const loggedInUserId = useSelector((state) => state.user._id);
    const loggedInUserFriends = useSelector((state) => state.user.friends);
    console.log(loggedInUserFriends)

    const getUser = async () => {
        const response = await fetch(`http://localhost:3001/users/${id}`, {
            method: "GET",
            headers: { Authorization: `Bearer ${token}` },
        });
        const data = await response.json();
        setUser(data);

        if (viewerId !== id) {
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
                body: JSON.stringify({ viewerId, profileUserId })
            });
            const data = await response.json();
            console.log("Profile View:", data.message);
        } catch (error) {
            console.error(`Error incrementing profile view: ${error}`);
        }
    }

    useEffect(() => {
        getUser();
    }, [])


    if (!user) {
        return null;
    }

    console.log(user)
    return (
        <Box>
            <Navbar />
            <Box
                width="100%"
                padding="2rem 6%"
                display="flex"
                flexDirection="column"
                alignItems="center"
                gap="1rem"
                height="auto"
            >

                <WidgetWrapper
                width={isNonMobileScreens ? "60%" : "100%"}
                >
                    <Box>
                        <Box
                            display="flex"
                            flexDirection={isNonMobileScreens ? "row" : "column"}
                            alignItems={isNonMobileScreens ? "flex-start" : "center"}
                            justifyContent="space-around"
                            gap={isNonMobileScreens ? "" : "3rem"}
                            marginTop="2rem"
                        >
                            <Box
                                borderRadius="50%" // This makes the box circular
                                boxShadow="0px 0px 10px 5px rgba(0, 213, 250, 0.5)"
                            >
                                <UserImage image={user.picturePath} size="200px" />
                            </Box>

                            <Box
                                display="flex"
                                flexDirection="column"
                                justifyContent="center"
                                gap="1.5rem"
                            >

                                <Typography variant='h1'
                                    letterSpacing="0.1rem"
                                >
                                    {user.firstName}{" "}{user.lastName}
                                </Typography>
                                <Box
                                    display="flex"
                                    flexDirection="column"
                                    alignItems="flex-start"
                                    gap="1rem"
                                >
                                    <Typography variant="h6">{user.bio}</Typography>
                                    <Box
                                        display="flex"
                                        flexDirection="column"
                                        alignItems="flex-start"
                                        gap="0.5rem"

                                    >
                                        <FlexBetween
                                            gap="2rem"
                                        >
                                            <LocationOnIcon color="primary" />
                                            <Typography variant="h5" color={medium}>
                                                {user.location}
                                            </Typography>
                                        </FlexBetween>
                                        <FlexBetween
                                            gap="2rem"
                                        >
                                            <PeopleIcon color="primary" />
                                            <Typography variant="h5" color={medium}>
                                                {user.friends.length}{" "}friends
                                            </Typography>
                                        </FlexBetween>
                                        <FlexBetween
                                            gap="2rem"
                                        >
                                            <WorkIcon color="primary" />
                                            <Typography variant="h5" color={medium}>
                                                {user.occupation}
                                            </Typography>
                                        </FlexBetween>
                                        <FlexBetween
                                            gap="2rem"
                                        >
                                            <EmailIcon color="primary" />
                                            <Typography variant="h5" color={medium}>
                                                {user.email}
                                            </Typography>
                                        </FlexBetween>
                                        <FlexBetween
                                            gap="2rem"
                                        >
                                            <CakeIcon color="primary" />
                                            <Typography variant="h5" color={medium}>
                                                {new Date(user.dob).toLocaleDateString('en-GB')}
                                            </Typography>
                                        </FlexBetween>
                                        <FlexBetween
                                            gap="2rem"
                                        >
                                            <FavoriteIcon color="primary" />
                                            <Typography variant="h5" color={medium}>
                                                {user.relationshipStatus}
                                            </Typography>
                                        </FlexBetween>
                                    </Box>

                                </Box>
                                {id === loggedInUserId && (
                                    <Box
                                        display="flex"
                                        flexDirection={isNonMobileScreens ? "row" : "column"}
                                        gap="1rem"
                                    >
                                        <Button variant="contained" sx={{ color: "white" }}>Edit Profile</Button>
                                        <Button variant="contained" sx={{ color: "white" }} color="error">Delete Account</Button>
                                    </Box>
                                )}

                            </Box>
                        </Box>
                    </Box>
                </WidgetWrapper>
                <WidgetWrapper
                width={isNonMobileScreens ? "60%" : "100%"}
                >
                    <Typography variant="h2" textAlign="center">{user.firstName}'s Friends</Typography>
                </WidgetWrapper>
                <Box
                width={isNonMobileScreens ? "60%" : "100%"}
                >
                    <FriendListWidget userId={user._id} isProfilePage={true}/>
                </Box>
                <WidgetWrapper
                width={isNonMobileScreens ? "60%" : "100%"}
                >
                    <Typography variant="h2" textAlign="center">{user.firstName}'s Posts</Typography>
                </WidgetWrapper>
                <Box
                width={isNonMobileScreens ? "60%" : "100%"}
                marginTop="-2rem"
                >
                <PostsWidget userId={user._id} isProfile="true" />
                </Box>
            </Box>
        </Box>
    )
}

export default UserProfilePage