import React, { useState, useEffect, useRef } from 'react'
import { localhost } from 'utils/Api_Route'
import Contacts from './Contacts'
import Welcome from './Welcome'
import Navbar from 'scenes/navbar/Navbar'
import ChatContainer from './ChatContainer'
import { Box, useMediaQuery, IconButton, CssBaseline } from '@mui/material'
import { io } from 'socket.io-client'
import { useSelector } from 'react-redux'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const Message = () => {
    const socket = useRef(null);
    const isNonMobileScreens = useMediaQuery("(min-width:1000px)");
    const isMobileScreens = useMediaQuery("(max-width:999px)");
    const [currentChat, setCurrentChat] = useState(undefined);
    const user = useSelector((state) => state.user);
    const [onlineUsers, setOnlineUsers] = useState([]);

    const handleChangeChat = (chat) => {
        setCurrentChat(chat);
    }

    const handleGoBack = () => {
        setCurrentChat(undefined);
    }

    useEffect(() => {
        if (user && !socket.current) {
            socket.current = io(localhost, { autoConnect: false });

            socket.current.on('connect', () => {
                //console.log('Socket connected:', socket.current.id);
                socket.current.emit("add-user", user._id);
            });

            socket.current.on('connect_error', (err) => {
                console.error('Connection Error:', err);
            });

            socket.current.on('disconnect', () => {
                //console.log('Socket disconnected');
            });

            socket.current.on('online-users', (onlineUsersList) => {
                setOnlineUsers(onlineUsersList);
            });

            socket.current.connect();
        }

        return () => {
            if (socket.current) {
                socket.current.disconnect();
                socket.current = null;
            }
        };
    }, [user]);

    return (
        <Box
        overflow="hidden"
        >
            <CssBaseline /> 
            <Navbar />
            <Box
                width="100%"
                padding="2rem 6%"
                display={isNonMobileScreens ? "flex" : "block"}
                gap="0.5rem"
                justifyContent="space-between"
                mt="5rem"
            >
                {isNonMobileScreens && (
                    <>
                        <Box flexBasis="25%">
                            <Contacts changeChat={handleChangeChat} onlineUsers={onlineUsers} />
                        </Box>
                        <Box flexBasis="72%">
                            {currentChat === undefined ? (
                                <Welcome />
                            ) : (
                                <ChatContainer currentChat={currentChat} socket={socket} onlineUsers={onlineUsers} />
                            )}
                        </Box>
                    </>
                )}

                {isMobileScreens && (
                    <Box width="100%">
                        {currentChat === undefined ? (
                            <Contacts changeChat={handleChangeChat} onlineUsers={onlineUsers} />
                        ) : (
                            <>
                                <IconButton onClick={handleGoBack}>
                                    <ArrowBackIcon />
                                </IconButton>
                                <ChatContainer currentChat={currentChat} socket={socket} onlineUsers={onlineUsers} />
                            </>
                        )}
                    </Box>
                )}
            </Box>
        </Box>
    )
}

export default Message;
