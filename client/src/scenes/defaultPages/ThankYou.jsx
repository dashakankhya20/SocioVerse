import React from 'react'
import { Box, Typography, Button } from '@mui/material'
import { useNavigate } from 'react-router-dom'
const ThankYou = () => {
    const navigate = useNavigate();
  return (
    <Box
    display="flex"
    flexDirection="column"
    justifyContent="center"
    alignItems="center"
    height="100vh"
    gap="2rem"
    >
        <Typography variant="h1">
            Thank You For Using SocioVerse! &#128516;
        </Typography>
        <Button
        variant="contained"
        sx={{
            fontSize:"1rem",
            color:"white"
        }}
        onClick={() => navigate("/")}
        >
            Create New Account!
        </Button>
    </Box>
  )
}

export default ThankYou