import React, { useState } from 'react'
import { TextField, Box, Button, IconButton, useMediaQuery } from '@mui/material'
import SendIcon from '@mui/icons-material/Send';
import Picker from "emoji-picker-react";
import SentimentSatisfiedAltIcon from '@mui/icons-material/SentimentSatisfiedAlt';
import { useSelector } from 'react-redux';

const ChatInput = ({ handleSendMsg }) => {
    const [message, setMessage] = useState("");
    const [showEmojiPicker, setShowEmojiPicker] = useState(false);
    const mode = useSelector((state) => state.mode);
    const isMobileScreens = useMediaQuery("(max-width:999px)");

    const handleEmojiPickerHideShow = () => {
        setShowEmojiPicker(!showEmojiPicker);
    }

    const handleEmojiClick = (emoji, event) => {
        setMessage((prevMessage) => prevMessage + emoji.emoji);
    };

    const handleSendChat = async (e) => {
        e.preventDefault();
        if (message.length > 0) {
            handleSendMsg(message);
            setMessage("");
        }
    }

    return (
        <Box
            width="100%"
            display="flex"
            alignItems="center"
            justifyContent="center"
            position="relative"
        >
            <IconButton
                color="primary"
                onClick={handleEmojiPickerHideShow}
            >
                <SentimentSatisfiedAltIcon />
            </IconButton>
            {showEmojiPicker && (
                <Box
                    position="absolute"
                    zIndex="10"
                    bottom="5rem"
                    left="0"
                >
                    <Picker
                        onEmojiClick={handleEmojiClick}
                        theme={mode}
                    />
                </Box>
            )}
            <TextField
                placeholder="Type your message here"
                fullWidth
                multiline
                value={message}
                onChange={(e) => setMessage(e.target.value)}
            />
            <Button
                onClick={handleSendChat}
            >
                <SendIcon />
            </Button>
        </Box>
    );
}

export default ChatInput;
