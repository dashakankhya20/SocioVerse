import React, { useState } from 'react'
import { TextField, Box, Button } from '@mui/material'
import SendIcon from '@mui/icons-material/Send';


const ChatInput = ({ handleSendMsg }) => {
    const [message, setMessage] = useState("");

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
        >
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
                <SendIcon
                    sx={{
                        fontSize: "2rem"
                    }}
                />
            </Button>
        </Box>
    )
}

export default ChatInput