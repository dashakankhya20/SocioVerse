import { Box, Avatar, useTheme } from "@mui/material"
import userImage from "../images/girl1.bmp";
import UserImage from "./UserImage";


const MessageWrapper = () => {
    const content = "Hi, had a great weekend!";
    const {palette} = useTheme();
    return (
        <Box
            sx={{
                width: "100%",
                height: "60vh",
            }}
        >
            <Box
            display="flex"
            alignItems="flex-start"
            gap="1rem"
            >
                {/* <UserImage image={userImage} /> */}
                <Box
                sx={{
                    backgroundColor:"#2196f3",
                    color:"white",
                    padding:"0.5rem",
                    borderRadius:"2rem"
                }}
                >
                    {content}
                </Box>
                <Avatar src={userImage}/>
            </Box>
        </Box>
    )
}

export default MessageWrapper