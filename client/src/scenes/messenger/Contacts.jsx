import React, {useState} from 'react'
import { Box, TextField, useTheme, InputAdornment, Typography, Divider } from '@mui/material'
import WidgetWrapper from 'components/WidgetWrapper'
import SearchIcon from '@mui/icons-material/Search';
import { useSelector } from 'react-redux';
import Loading from 'scenes/progress/Loading';
import UserImage from 'components/UserImage';


const Contacts = ({ changeChat }) => {
  const [currentChatSelected, setCurrentChatSelected] = useState(undefined);
  const theme = useTheme();
  const neutralLight = theme.palette.neutral.light;
  const friends = useSelector((state) => state.user.friends);
  //console.log(friends);

  //console.log(currentChatSelected);
  const changeCurrentChat = (index, contact) => {
    setCurrentChatSelected(index);
    changeChat(contact);
  }
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
          placeholder='Search for chats'
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
        {friends.length > 0 ? (
          friends.map((friend, index) => (
              <Box
                display="flex"
                alignItems="flex-start"
                justifyContent="flex-start"
                gap="1rem"
                width="100%"
                borderBottom={`0.5px groove ${neutralLight}`}
                paddingBottom="0.5rem"
                onClick={() => {changeCurrentChat(index, friend)}}
              >
                <UserImage image={friend.picturePath} size="50px" />
                <Typography variant="h5">{friend.firstName}{" "}{friend.lastName}</Typography>
              </Box>
          ))

        ) : (
          <Typography>Make friends to start chatting with them!</Typography>
        )}

      </Box>
    </WidgetWrapper>
  )
}

export default Contacts