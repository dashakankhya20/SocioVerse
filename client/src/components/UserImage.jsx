import React from 'react';
import { Box } from '@mui/material';
import { localhost } from 'utils/Api_Route';

const UserImage = ({ image, size = "60px", isOnline = false }) => {
  return (
    <Box position="relative" width={size} height={size}>
      <img 
        style={{
          objectFit: "cover",
          borderRadius: "50%"
        }}
        width={size}
        height={size}
        alt="user"
        src={`${localhost}/assets/${image}`}
      />
      {isOnline && (
        <Box
          position="absolute"
          bottom="2px"
          right="1px"
          width="8px"
          height="8px"
          bgcolor="green"
          borderRadius="50%"
          border="1px solid white"
        />
      )}
    </Box>
  );
}

export default UserImage;
