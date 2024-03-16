import React, { useEffect } from 'react';
import { ChatBubbleOutlineOutlined } from '@mui/icons-material';
import { IconButton, Typography, useTheme } from "@mui/material";
import { ShareOutlined } from '@mui/icons-material';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownOffAltIcon from '@mui/icons-material/ThumbDownOffAlt';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import FlexBetween from 'components/FlexBetween';
import Friend from 'components/Friend';
import WidgetWrapper from 'components/WidgetWrapper';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setPost } from 'state';
import CommentWidget from './CommentWidget';

const PostWidget = ({ postData }) => {
  console.log("PostWidget", postData.picturePath);
  const [postUserData, setPostUserData] = useState([]);
  const [display, setDisplay] = useState(false);
  const dispatch = useDispatch();
  const token = useSelector((state) => state.token);
  const loggedInUserId = useSelector((state) => state.user._id);
  const postId = postData._id;
  const isLiked = Boolean(postData.likes.includes(loggedInUserId));
  const isDisliked = Boolean(postData.dislikes.includes(loggedInUserId));
  const { palette } = useTheme();
  const main = palette.neutral.main;
  const primary = palette.primary.main;
  const dark = palette.neutral.dark;
  console.log("Liked: ", isLiked);
  console.log("Dislike: ", isDisliked);

  const patchLike = async () => {
    const response = await fetch(`http://localhost:3001/posts/${postId}/like/${loggedInUserId}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json"
      },
    });
    const updatedPost = await response.json();
    dispatch(setPost({ post: updatedPost }));
  }
  const patchDislike = async () => {
    const response = await fetch(`http://localhost:3001/posts/${postId}/dislike/${loggedInUserId}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json"
      },
    });
    const updatedPost = await response.json();
    dispatch(setPost({ post: updatedPost }));
  }
  const getUserDetails = async () => {
    const response = await fetch(`http://localhost:3001/users/${postData.userId}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      }
    })
    const data = await response.json();
    setPostUserData(data);
  }
  console.log("Post User Data", postUserData);
  useEffect(() => {

    getUserDetails();
  }, []) //eslint-disable-line react-hooks/exhaustive-deps
  const fullName = postUserData && postUserData.firstName + " " + postUserData.lastName;
  console.log("PostUserData ", postUserData);
  console.log("Post Widget", postData)

  const showComments = () => {
    setDisplay(prevDisplay => !prevDisplay);
  }
  return (
    <WidgetWrapper m="2rem 0">
      {postUserData &&
        <Friend
          friendId={postUserData._id}
          name={fullName}
          subtitle={postUserData.location}
          userPicturePath={postUserData.picturePath}
        />
      }

      <Typography color={main} sx={{ mt: "1rem" }}>
        {postData.content}
      </Typography>
      {postData.picturePath && (

        <img
          width="100%"
          height="auto"
          alt={postData.picturePath}
          style={{ borderRadius: "0.75rem", marginTop: "0.75rem" }}
          src={`http://localhost:3001/assets/${postData.picturePath}`}
        />
      )}
      <FlexBetween mt="0.25rem">
        <FlexBetween gap="1rem">
          <FlexBetween gap="0.3rem">
            <IconButton onClick={patchLike}>
              {isLiked ? (
                <ThumbUpIcon sx={{ color: primary }} />
              ) : (
                <ThumbUpOffAltIcon />
              )}
            </IconButton>
            <Typography>
              {postData.likes.length} likes
            </Typography>
          </FlexBetween>
          <FlexBetween gap="0.3rem">
            <IconButton onClick={patchDislike}>
              {isDisliked ? (
                <ThumbDownIcon sx={{ color: primary }} />
              ) : (
                <ThumbDownOffAltIcon />
              )}
            </IconButton>
            <Typography>
              {postData.dislikes.length} dislikes
            </Typography>
          </FlexBetween>
          <FlexBetween gap="0.3rem">
            <IconButton onClick={showComments}>
              <ChatBubbleOutlineOutlined />
            </IconButton>
            <Typography>
              {postData.comments.length}
            </Typography>

          </FlexBetween>
        </FlexBetween>
        <IconButton>
          <ShareOutlined />
        </IconButton>
      </FlexBetween>
      {display && <CommentWidget postId={postData._id} commentData={postData.comments} />}
    </WidgetWrapper>
  )
}

export default PostWidget