import React from 'react'
import WidgetWrapper from 'components/WidgetWrapper'
import { Box, Typography, useTheme } from '@mui/material'
import { useSelector } from 'react-redux'
import UserImage from 'components/UserImage'
import GirlWithLaptop from '../../images/Welcome_Chat-1.png'

const Welcome = () => {
  const user = useSelector((state) => state.user);
  const { palette } = useTheme();
  const medium = palette.neutral.medium;
  return (
    <WidgetWrapper>
      <Box
        height="75vh"
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="flex-start"
      >
        <Box
          width="30rem"
          height="20rem"
        >
          <img src={GirlWithLaptop}
            style={{
              height: "100%",
              width: "100%",
              objectFit: "contain"
            }}
          />
        </Box>
        <Typography variant="h2" marginBottom="1rem">
          Welcome, {user.firstName} {" "} {user.lastName}
        </Typography>
        <Typography variant="h6" color={medium}>
          Let's start chatting!
        </Typography>
      </Box>
    </WidgetWrapper>
  )
}

export default Welcome