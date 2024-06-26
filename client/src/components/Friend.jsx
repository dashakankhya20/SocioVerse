import { PersonAddOutlined, PersonRemoveOutlined } from "@mui/icons-material"
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { setFriends } from "state";
import FlexBetween from "./FlexBetween";
import UserImage from "./UserImage";
import { useNavigate } from "react-router-dom";
import { localhost } from "utils/Api_Route";
const Friend = ({ friendId, name, subtitle, userPicturePath }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { _id } = useSelector((state) => state.user);
    const token = useSelector((state) => state.token);
    const friends = useSelector((state) => state.user.friends);
    const { palette } = useTheme();
    const primaryLight = palette.primary.light;
    const primaryDark = palette.primary.dark;
    const main = palette.neutral.main;
    const medium = palette.neutral.medium;
    
    
    const isFriend = Array.isArray(friends) && friends.some((friend) => friend._id === friendId);
    //console.log("Friends:", friends);
    const addRemoveFriend = async () => {
        const method = isFriend ? "DELETE" : "PUT";
        const response = await fetch(`${localhost}/users/${_id}/friends/${friendId}`,
            {
                method: method,
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json"
                }
            });
        const updatedFriends = await response.json();
        dispatch(setFriends({ friends: updatedFriends }))
        //console.log("After adding friend: ", updatedFriends);
    }

    return (
        <FlexBetween>
            <FlexBetween gap="1rem">
                <UserImage image={userPicturePath} size="55px" />
                <Box
                    onClick={() => {
                        navigate(`/user-profile/${friendId}`);
                        navigate(0); //A workaround to get the components re render 
                    }}
                >
                    <Typography
                        color={main}
                        variant="h5"
                        fontWeight="500"
                        sx={{
                            "&:hover": {
                                color: palette.primary.light,
                                cursor: "pointer"
                            }
                        }}
                    >
                        {name}
                    </Typography>
                    <Typography color={medium} fontSize="0.75rem">
                        {subtitle}
                    </Typography>
                </Box>
            </FlexBetween>
            {_id !== friendId &&  (
                <IconButton
                    onClick={() => addRemoveFriend()}
                    sx={{ backgroundColor: primaryLight, p: "0.6rem" }}
                >
                    {isFriend ? (
                        <PersonRemoveOutlined sx={{ color: primaryDark }} />
                    ) : (
                        <PersonAddOutlined sx={{ color: primaryDark }} />
                    )}
                </IconButton>
            )}

        </FlexBetween>
    )
}

export default Friend