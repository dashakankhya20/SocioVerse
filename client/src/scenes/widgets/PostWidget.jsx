import React, { useEffect, useState } from 'react';
import { ChatBubbleOutlineOutlined } from '@mui/icons-material';
import { IconButton, Typography, useTheme, Dialog, DialogActions, DialogContent, DialogTitle, DialogContentText, Button, useMediaQuery } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownOffAltIcon from '@mui/icons-material/ThumbDownOffAlt';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import FlexBetween from 'components/FlexBetween';
import Friend from 'components/Friend';
import WidgetWrapper from 'components/WidgetWrapper';
import Loading from 'scenes/progress/Loading';
import { useDispatch, useSelector } from 'react-redux';
import { removePost, setPost } from 'state';
import CommentWidget from './CommentWidget';
import { showToast } from 'components/Toast';
import { localhost } from 'utils/Api_Route';


const PostWidget = ({ postData }) => {
  const [postUserData, setPostUserData] = useState(null);
  const [display, setDisplay] = useState(false);
  const [likes, setLikes] = useState(postData.likes || []);
  const [dislikes, setDislikes] = useState(postData.dislikes || []);
  const [showDeleteAlert, setShowDeleteAlert] = useState(false);
  const isNonMobileScreens = useMediaQuery("(min-width:1000px)");

  const dispatch = useDispatch();
  const token = useSelector((state) => state.token);
  const loggedInUserId = useSelector((state) => state.user._id);
  const postId = postData._id;
  const [isLiked, setIsLiked] = useState(Boolean(postData.likes && postData.likes.includes(loggedInUserId)));
  const [isDisliked, setIsDisliked] = useState(Boolean(postData.dislikes && postData.dislikes.includes(loggedInUserId)));
  const { palette } = useTheme();
  const main = palette.neutral.main;
  const primary = palette.primary.main;

  useEffect(() => {
    if (postData.userId) {
      getUserDetails(postData.userId);
    }
  }, [postData.userId]);

  const getUserDetails = async (userId) => {
    try {
      const response = await fetch(`${localhost}/users/${userId}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        }
      });
      const data = await response.json();
      setPostUserData(data);
    } catch (error) {
      console.error("Error fetching user details:", error);
    }
  };

  const patchLike = async () => {
    try {
      const response = await fetch(`${localhost}/posts/${postId}/like/${loggedInUserId}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json"
        },
      });
      const updatedLikes = await response.json();
      const updatedPost = { ...postData, likes: updatedLikes };
      setLikes(updatedLikes);
      setIsLiked(true);
      setIsDisliked(false);

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
      const response = await fetch(`${localhost}/posts/${postId}/dislike/${loggedInUserId}`, {
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

  const showComments = () => {
    setDisplay(prevDisplay => !prevDisplay);
  }

  const handleDeletePost = async (e, postId) => {
    e.preventDefault();
    try {
      const response = await fetch(`${localhost}/posts/${postId}`, {
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

  if (!postUserData && !postData) {
    return <Loading />;
  }

  const fullName = postUserData && postUserData.firstName + " " + postUserData.lastName;

  return (
    <WidgetWrapper m="2rem 0">
      <Friend
        friendId={postUserData && postUserData._id}
        name={fullName}
        subtitle={postUserData && postUserData.location}
        userPicturePath={postUserData && postUserData.picturePath}
      />
      <Typography color={main} sx={{ mt: "1rem" }}>
        {postData.content}
      </Typography>
      {postData.picturePath && (
        <img
          width="100%"
          height="auto"
          alt={postData.picturePath}
          style={{ borderRadius: "0.75rem", marginTop: "0.75rem" }}
          src={postData.picturePath}
        />
      )}
      <FlexBetween mt="0.25rem">
        <FlexBetween gap={isNonMobileScreens ? "1rem" : "0.2rem"}> 
          <FlexBetween gap="0.3rem">
            <IconButton onClick={patchLike}>
              {isLiked ? (
                <ThumbUpIcon sx={{ color: primary }} />
              ) : (
                <ThumbUpOffAltIcon />
              )}
            </IconButton>
            <Typography>{likes.length} likes</Typography>
          </FlexBetween>
          <FlexBetween gap="0.3rem">
            <IconButton onClick={patchDislike}>
              {isDisliked ? (
                <ThumbDownIcon sx={{ color: "red" }} />
              ) : (
                <ThumbDownOffAltIcon />
              )}
            </IconButton>
            <Typography>{dislikes.length} dislikes</Typography>
          </FlexBetween>
          <FlexBetween gap="0.3rem">
            <IconButton onClick={showComments}>
              <ChatBubbleOutlineOutlined />
            </IconButton>
            <Typography>{postData.comments.length}</Typography>
          </FlexBetween>
        </FlexBetween>
        {postUserData && postUserData._id === loggedInUserId && (
          <IconButton onClick={handleDeleteOpen}>
            <DeleteIcon />
          </IconButton>
        )}
      </FlexBetween>
      {display && <CommentWidget postId={postData && postData._id} postData={postData} />}
      {showDeleteAlert && (
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
            Delete Post
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
      )}
    </WidgetWrapper>
  );
};

export default PostWidget;
