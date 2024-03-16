import React from 'react'
import { CircularProgress, Box } from '@mui/material'

const Loading = () => {
  return (
    <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
        marginTop="7rem"
    >
        <CircularProgress />
    </Box>
  )
}

export default Loading