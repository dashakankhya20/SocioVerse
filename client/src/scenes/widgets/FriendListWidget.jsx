import React, { useEffect } from 'react';
import { Box, Typography, useTheme } from "@mui/material";
import Friend from 'components/Friend';
import WidgetWrapper from 'components/WidgetWrapper';
import { useDispatch, useSelector } from 'react-redux';
import { setFriends, setProfileUserFriends } from 'state';
import { useLocation } from 'react-router-dom';

const FriendListWidget = ({ userId }) => {
    
    const dispatch = useDispatch();
    const location = useLocation();
    const { palette } = useTheme();
    const token = useSelector((state) => state.token);
    const isProfilePage = location.pathname.startsWith("/user-profile/");
    const friends = useSelector((state) => isProfilePage ? state.profileUserFriends : state.user.friends);
    console.log(friends);

    const getFriends = async () => {
        const response = await fetch(`http://localhost:3001/users/${userId}/friends`, {
            method: "GET",
            headers: { Authorization: `Bearer ${token}` }
        });
        const data = await response.json();
        if (isProfilePage) {
            dispatch(setProfileUserFriends({ friends: data }));
        } else {
            dispatch(setFriends({ friends: data }));
        }
    };

    useEffect(() => {
        getFriends();
    }, [userId, isProfilePage]); 

    return (
        <WidgetWrapper>
            <Typography
                color={palette.neutral.dark}
                variant="h5"
                fontWeight="500"
                sx={{ mb: "1.5rem" }}
            >
                Friend List
            </Typography>
            <Box display="flex" flexDirection="column" gap="1.5rem">
                {Array.isArray(friends) ? (
                    friends.map((friend) => (
                        <Friend
                            key={friend._id}
                            friendId={friend._id}
                            name={`${friend.firstName} ${friend.lastName}`}
                            subtitle={friend.occupation}
                            userPicturePath={friend.picturePath}
                            showActions={!isProfilePage}
                        />
                    ))
                ) : (
                    <>
                    <Typography color={palette.neutral.medium} variant="h3" align="center" marginTop="2rem">
                      You don't have any friends!
                    </Typography>
                  </>
                )}
            </Box>
        </WidgetWrapper>
    );
};

export default FriendListWidget;
