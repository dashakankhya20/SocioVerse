import React from 'react'
import WidgetWrapper from 'components/WidgetWrapper'
import { InputBase, useTheme } from '@mui/material'
import MessageWrapper from 'components/MessageWrapper';

const ChatSectionWidget = () => {
  const { palette } = useTheme();
  return (
    <WidgetWrapper
      width="70%"
      minHeight="70vh"
      height="80vh"
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent:"flex-end",
        gap:"2rem"
        
      }}
    >
      <MessageWrapper />
      <InputBase
        placeholder="Type a message"
        multiline
        sx={{
          width: "80%",
          backgroundColor: palette.neutral.light,
          borderRadius: "2rem",
          padding: "1rem 2rem"
        }}
      />
    </WidgetWrapper>
  )
}

export default ChatSectionWidget