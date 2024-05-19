import React, { useEffect, useState } from 'react';
import { Box, Typography, useTheme } from '@mui/material';
import UserImage from 'components/UserImage';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';


const Comment = ({ commentsByPostId }) => {
  const { palette } = useTheme();
  const main = palette.neutral.main;
  const medium = palette.neutral.medium;
  const navigate = useNavigate();

  console.log(commentsByPostId)

  return (
    <div>
      {commentsByPostId.map((comment) => (
        <Box key={comment._id}
          marginBottom="1rem"
        >
          {/* Render comment */}
          <Box
            display="flex"
            alignItems="flex-start"
            justifyContent="flex-start"
            gap="1rem"
          >
            <UserImage
              image={comment.userId.picturePath}
              size="40px"
              onClick={() => navigate(`/profile/${comment.userId._id}`)}
            />
            <Box
              display="flex"
              flexDirection="column"
              alignItems="flex-start"
            >
              <Typography
                color={medium}
                fontSize="0.75rem"
                onClick={() => navigate(`/profile/${comment.userId._id}`)}
                sx={{
                  "&:hover": {
                    color: palette.primary.light,
                    cursor: "pointer"
                  }
                }}
              >{comment.userId.firstName} {" "} {comment.userId.lastName}</Typography>
              <Typography
                color={main}
                variant="h5"
                fontWeight="500"
              >{comment.content}</Typography>
            </Box>
          </Box>

        </Box>
      ))}
    </div>
  );
};

export default Comment;
