import React, { useState, useEffect, useRef } from 'react'
import { localhost } from 'utils/Api_Route'
import Contacts from './Contacts'
import Welcome from './Welcome'
import Navbar from 'scenes/navbar/Navbar'
import ChatContainer from './ChatContainer'
import { Box, useMediaQuery, useTheme } from '@mui/material'
const Message = () => {
    const isNonMobileScreens = useMediaQuery("(min-width:1000px)");
    const [currentChat, setCurrentChat] = useState(undefined);
    

    const handleChangeChat = (chat) => {
        setCurrentChat(chat);
    }
    return (
        <Box>
            <Navbar />
            <Box
                width="100%"
                padding="2rem 6%"
                display={isNonMobileScreens ? "flex" : "block"}
                gap="0.5rem"
                justifyContent="space-between"
            >
                <Box
                flexBasis={isNonMobileScreens ? "25%" : "100%"}
                >
                    <Contacts changeChat={handleChangeChat} />
                </Box>
                <Box
                flexBasis={isNonMobileScreens ? "72%" : ""}
                >
                    {currentChat === undefined ? <Welcome /> : <ChatContainer currentChat={currentChat} />}
                </Box>
            </Box>
        </Box>
    )
}

export default Message