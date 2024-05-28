import React from 'react'
import { Box, Typography, useTheme, Divider } from '@mui/material'
import FlexBetween from 'components/FlexBetween'
import { useSelector } from 'react-redux'
import UserImage from 'components/UserImage'


const UserMessageWidget = ({ messages }) => {
    const friends = useSelector((state) => state.user.friends);
    const user = useSelector((state) => state.user);
    console.log(user);
    const { palette } = useTheme();
    const dark = palette.neutral.dark;
    console.log(friends);
    return (
        <div>
            {friends ? (
                friends.map((friend) => (
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "column"
                        }}
                    >
                        <Box
                            gap="2rem"
                            sx={{
                                display: "flex",
                                justifyContent: "flex-start",
                                alignItems: "center",
                                padding: "1rem",

                            }}
                        >
                            <UserImage image={friend.picturePath} size="40px" />
                            <Typography
                                variant="h4"
                                color={dark}
                                fontWeight="500"
                                sx={{
                                    "&:hover": {
                                        color: palette.primary.light,
                                        cursor: "pointer",
                                    },
                                }}
                            >
                                {friend.firstName} {friend.lastName}
                            </Typography>
                        </Box>
                        <Divider />
                    </Box>
                ))

            ) : (
                <p>Start a conversation? Make friends! </p>
            )}
        </div>
    )
}

export default UserMessageWidget