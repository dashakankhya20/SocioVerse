import React from 'react'
import { Box } from '@mui/material'
import Navbar from 'scenes/navbar/Navbar'
import FlexBetween from 'components/FlexBetween'
import ChatProfileWidget from 'scenes/widgets/ChatProfileWidget'
import ChatSectionWidget from 'scenes/widgets/ChatSectionWidget'

const Messenger = () => {
  return (
    <Box>
      <Navbar />

      <Box
        display="flex"
        flexDirection="row"
        alignItems="flex-start"
        justifyContent="center"
        gap="2rem"
        padding="2rem 6%"
      >
        <ChatProfileWidget />
        <ChatSectionWidget />
      </Box>
    </Box>
  )
}

export default Messenger