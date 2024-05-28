import React, { useEffect } from 'react';
import { ChatBubbleOutlineOutlined } from '@mui/icons-material';
import { IconButton, Typography, useTheme, Dialog, DialogActions, DialogContent, DialogTitle, DialogContentText, Button } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownOffAltIcon from '@mui/icons-material/ThumbDownOffAlt';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import FlexBetween from 'components/FlexBetween';
import Friend from 'components/Friend';
import WidgetWrapper from 'components/WidgetWrapper';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { removePost, setPost } from 'state';
import CommentWidget from './CommentWidget';
import { showToast } from 'components/Toast';

const PostWidget = ({ postData }) => {
  // console.log("PostWidget", postData.picturePath);
  //console.log(postData)
  const [postUserData, setPostUserData] = useState([]);
  const [display, setDisplay] = useState(false);
  const [likes, setLikes] = useState(postData.likes);
  const [dislikes, setDislikes] = useState(postData.dislikes);
  const [showDeleteAlert, setShowDeleteAlert] = useState(false);
  //console.log(likes)
  const dispatch = useDispatch();
  const token = useSelector((state) => state.token);
  const loggedInUserId = useSelector((state) => state.user._id);
  //console.log(typeof loggedInUserId)
  const postId = postData._id;
  const [isLiked, setIsLiked] = useState(Boolean(postData.likes.includes(loggedInUserId)));
  const [isDisliked, setIsDisliked] = useState(Boolean(postData.dislikes.includes(loggedInUserId)));
  const { palette } = useTheme();
  const main = palette.neutral.main;
  const primary = palette.primary.main;
  //const dark = palette.neutral.dark;
  // console.log("Liked: ", isLiked);
  // console.log("Dislike: ", isDisliked);

  const patchLike = async () => {
    try {
      const response = await fetch(`http://localhost:3001/posts/${postId}/like/${loggedInUserId}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json"
        },
      });
      const updatedLikes = await response.json();
      console.log("Updated Likes: ", updatedLikes)
      const updatedPost = { ...postData, likes: updatedLikes };
      setLikes(updatedLikes);
      setIsLiked(true);
      setIsDisliked(false);
      // If the post was previously disliked, remove the dislike
      if (isDisliked) {
        const updatedDislikes = postData.dislikes.filter(id => id !== loggedInUserId);
        updatedPost.dislikes = updatedDislikes;
        setDislikes(updatedDislikes);
      }
      dispatch(setPost({ post: updatedPost }));
    } catch (error) {
      console.error("Error updating likes:", error);
    }
  };

  const patchDislike = async () => {
    try {
      const response = await fetch(`http://localhost:3001/posts/${postId}/dislike/${loggedInUserId}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json"
        },
      });
      const updatedDislikes = await response.json();
      const updatedPost = { ...postData, dislikes: updatedDislikes };
      setDislikes(updatedDislikes);
      setIsDisliked(true);
      setIsLiked(false);
      // If the post was previously liked, remove the like
      if (isLiked) {
        const updatedLikes = postData.likes.filter(id => id !== loggedInUserId);
        updatedPost.likes = updatedLikes;
        setLikes(updatedLikes);
      }
      dispatch(setPost({ post: updatedPost }));
    } catch (error) {
      console.error("Error updating dislikes:", error);
    }
  };

  //console.log(postData)
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
  // console.log("Post User Data", postUserData);
  useEffect(() => {

    getUserDetails();
  }, []) //eslint-disable-line react-hooks/exhaustive-deps
  const fullName = postUserData && postUserData.firstName + " " + postUserData.lastName;
  // console.log("PostUserData ", postUserData);
  // console.log("Post Widget", postData)

  const showComments = () => {
    setDisplay(prevDisplay => !prevDisplay);
  }

  const handleDeletePost = async (e, postId) => {
    e.preventDefault();
    try {
      console.log("Frontend ID: ", postId);
      const response = await fetch(`http://localhost:3001/posts/${postId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        }
      });

      if (response.ok) {
        const result = await response.json();
        showToast(result.message, "success");
        dispatch(removePost(postId));
      } else {
        const errorResult = await response.json();
        showToast(errorResult.message, "error");
      }
    } catch (error) {
      console.error(error.message);
      showToast(error.message, "error");
    }
    setShowDeleteAlert(false);
  };


  const handleDeleteOpen = () => {
    setShowDeleteAlert(true);
  }
  const handleDeleteClose = () => {
    setShowDeleteAlert(false);
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
              {likes.length} likes
            </Typography>
          </FlexBetween>
          <FlexBetween gap="0.3rem">
            <IconButton onClick={patchDislike}>
              {isDisliked ? (
                <ThumbDownIcon sx={{ color: "red" }} />
              ) : (
                <ThumbDownOffAltIcon />
              )}
            </IconButton>
            <Typography>
              {dislikes.length} dislikes
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
        {postUserData._id === loggedInUserId && (
          <IconButton onClick={handleDeleteOpen}>
            <DeleteIcon />
          </IconButton>
        )}
      </FlexBetween>
      {display && <CommentWidget postId={postData._id} postData={postData} />}
      {showDeleteAlert && (
        <React.Fragment>
          <Dialog
            open={showDeleteAlert}
            onClose={handleDeleteClose}
            fullWidth
            PaperProps={{
              component: 'form',
              onSubmit: (e) => handleDeletePost(e, postId)
            }}
          >
            <DialogTitle>
              Delete Your Account
            </DialogTitle>
            <DialogContent>
              <DialogContentText>
                Are you sure you want to delete this post?
              </DialogContentText>
              <DialogActions>
                <Button type="submit">Yes</Button>
                <Button onClick={() => setShowDeleteAlert(false)}>No</Button>
              </DialogActions>
            </DialogContent>
          </Dialog>
        </React.Fragment>
      )}
    </WidgetWrapper>
  )
}

export default PostWidget