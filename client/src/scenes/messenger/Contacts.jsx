import React, { useState } from 'react';
import { Box, TextField, useTheme, InputAdornment, Typography, useMediaQuery } from '@mui/material';
import WidgetWrapper from 'components/WidgetWrapper';
import SearchIcon from '@mui/icons-material/Search';
import { useSelector } from 'react-redux';
import UserImage from 'components/UserImage';

const Contacts = ({ changeChat, onlineUsers }) => {
  const [currentChatSelected, setCurrentChatSelected] = useState(undefined);
  const [searchTerm, setSearchTerm] = useState('');
  const theme = useTheme();
  const neutralLight = theme.palette.neutral.light;
  const friends = useSelector((state) => state.user.friends);

  const filteredFriends = friends.filter(friend =>
    `${friend.firstName} ${friend.lastName}`.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const changeCurrentChat = (index, contact) => {
    setCurrentChatSelected(index);
    changeChat(contact);
  };

  return (
    <WidgetWrapper>
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        gap="2rem"
        height="100%"
      >
        <TextField
          placeholder='Search for friends'
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          sx={{
            backgroundColor: neutralLight,
            width: "100%"
          }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            )
          }}
        />
        {filteredFriends.length > 0 ? (
          filteredFriends.map((friend, index) => {
            const isOnline = onlineUsers.includes(friend._id);
            return (
              <Box
                key={friend._id}
                display="flex"
                alignItems="flex-start"
                justifyContent="flex-start"
                gap="1rem"
                width="100%"
                borderBottom={`0.5px groove ${neutralLight}`}
                paddingBottom="0.5rem"
                onClick={() => { changeCurrentChat(index, friend); }}
                sx={{
                  cursor: "pointer"
                }}
              >
                <UserImage image={friend.picturePath} size="50px" isOnline={isOnline} />
                <Typography variant="h5">{friend.firstName}{" "}{friend.lastName}</Typography>
              </Box>
            );
          })
        ) : (
          <Typography>Make friends to start chatting with them!</Typography>
        )}
      </Box>
    </WidgetWrapper>
  );
}

export default Contacts;
