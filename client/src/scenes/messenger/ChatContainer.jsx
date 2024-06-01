import React, { useState, useEffect } from 'react';
import WidgetWrapper from 'components/WidgetWrapper';
import { Box, Typography, useTheme } from '@mui/material';
import ChatInput from './ChatInput';
import { localhost } from 'utils/Api_Route';
import { useSelector } from 'react-redux';
import UserImage from 'components/UserImage';

const ChatContainer = ({ currentChat }) => {
  const [messages, setMessages] = useState([]);
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const user = useSelector((state) => state.user);
  const theme = useTheme();
  const neutralLight = theme.palette.neutral.light;

  const fetchMessages = async () => {
    if (currentChat) {
      try {
        const response = await fetch(`${localhost}/messages/get-msg`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            from: user._id,
            to: currentChat._id,
          }),
        });

        if (response.ok) {
          const result = await response.json();
          setMessages(result); // Ensure messages is an array
        } else {
          console.error('Failed to fetch messages');
        }
      } catch (error) {
        console.error('Error fetching messages:', error);
      }
    }
  };

  const handleSendMessage = async (message) => {
    try {
      const response = await fetch(`${localhost}/messages/add-msg`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          from: user._id,
          to: currentChat._id,
          message: message,
        }),
      });

      if (response.ok) {
        setMessages((prevMessages) => [...prevMessages, { fromSelf: true, message }]);
      } else {
        console.error('Failed to send message');
      }
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  useEffect(() => {
    if (arrivalMessage) {
      setMessages((prevMessages) => [...prevMessages, arrivalMessage]);
    }
  }, [arrivalMessage]);

  useEffect(() => {
    fetchMessages();
  }, [currentChat]);

  if (!currentChat) {
    return <div>Loading...</div>; // Or any loading indicator
  }

  return (
    <WidgetWrapper>
      <Box
        height="70vh"
        display="flex"
        flexDirection="column"
      >
        <Box
          display="flex"
          alignItems="center"
          justifyContent="flex-start"
          gap="1rem"
          borderBottom={`0.5px groove ${neutralLight}`}
          paddingBottom="0.7rem"
        >
          <UserImage image={currentChat.picturePath} size="30px" />
          <Typography variant="h4">{currentChat.firstName} {currentChat.lastName}</Typography>
        </Box>

        <Box height="60vh" overflow="auto">
          {messages.map((message, index) => (
            <Box
              key={index}
              display="flex"
              justifyContent={message.fromSelf ? 'flex-end' : 'flex-start'}
              alignItems="baseline"
              padding="1rem"
            >
              {message.fromSelf ? (
                <>
                  <Box
                    bgcolor="primary.main"
                    color="white"
                    p={1}
                    borderRadius={1}
                    m={1}
                    maxWidth="60%"
                  >
                    <Typography>{message.message}</Typography>
                  </Box>
                  <UserImage image={user.picturePath} size="20px" />
                </>
              ) : (
                <>
                  <UserImage image={currentChat.picturePath} size="20px" />
                  <Box
                    bgcolor="secondary.main"
                    color="white"
                    p={1}
                    borderRadius={1}
                    m={1}
                    maxWidth="60%"
                  >
                    <Typography>{message.message}</Typography>
                  </Box>
                </>
              )}
            </Box>
          ))}
        </Box>
        <ChatInput handleSendMsg={handleSendMessage} />
      </Box>
    </WidgetWrapper>
  );
};

export default ChatContainer;
