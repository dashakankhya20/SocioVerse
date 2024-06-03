import React, { useState, useEffect, useRef } from 'react';
import WidgetWrapper from 'components/WidgetWrapper';
import { Box, Typography, useTheme } from '@mui/material';
import ChatInput from './ChatInput';
import { localhost } from 'utils/Api_Route';
import { useSelector } from 'react-redux';
import UserImage from 'components/UserImage';
import { v4 as uuidv4 } from 'uuid';

const ChatContainer = ({ currentChat, socket, onlineUsers }) => {
  const [messages, setMessages] = useState([]);
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const user = useSelector((state) => state.user);
  const theme = useTheme();
  const neutralLight = theme.palette.neutral.light;
  const scrollRef = useRef();
  const isOnline = onlineUsers.includes(currentChat._id);

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
      socket.current.emit("send-msg", {
        to: currentChat._id,
        from: user._id,
        message: message,
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
    if(socket.current){
      socket.current.on("msg-receive", (msg) => {
        setArrivalMessage({ fromSelf: false, message: msg });
    })
    }
  }, [])

  useEffect(() => {
    if (arrivalMessage) {
      setMessages((prevMessages) => [...prevMessages, arrivalMessage]);
    }
  }, [arrivalMessage]);

  useEffect(() => {
    fetchMessages();
  }, [currentChat]);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, currentChat]);


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
          <UserImage image={currentChat.picturePath} size="30px" isOnline={isOnline} />
          <Typography variant="h4">{currentChat.firstName} {currentChat.lastName}</Typography>
        </Box>

        <Box height="60vh" overflow="auto" className="custom-scrollbar">
          {messages.map((message, index) => (
            <Box
              key={uuidv4()}
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
          <div ref={scrollRef} />
        </Box>
        <ChatInput handleSendMsg={handleSendMessage} />
      </Box>
    </WidgetWrapper>
  );
};

export default ChatContainer;
