import { useState, useEffect } from 'react';
import { InputBase, Box, Button, useTheme, Typography } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import WidgetWrapper from 'components/WidgetWrapper';
import UserImage from 'components/UserImage';
import Comment from './Comment';
import { setPost } from 'state';
import { localhost } from 'utils/Api_Route';

const CommentWidget = ({ postId, postData }) => {
    const { palette } = useTheme();
    const medium = palette.neutral.medium;
    const [comment, setComment] = useState('');
    const [commentsByPostId, setCommentsByPostId] = useState([]);
    const user = useSelector((state) => state.user);
    const token = useSelector((state) => state.token);
    
    const dispatch = useDispatch();
    const comments = useSelector((state) => state.comments);
    //console.log(comments)

    const getCommentsByPostId = async () => {
        try {
          const response = await fetch(`${localhost}/comments/post/${postId}`, {
            method: 'GET',
            headers: { Authorization: `Bearer ${token}` }
          });
          const comments = await response.json();
          setCommentsByPostId(comments);

        } catch (error) {
          console.error('Error fetching comments:', error);
        }
      };
    
      useEffect(() => {
        // Fetch comments only when postId changes
        getCommentsByPostId();
      }, [postId]); // Only re-run the effect if postId changes
      

    const postComment = async () => {
        try {
            const response = await fetch(`${localhost}/comments`, {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ postId: postId, userId: user._id, content: comment })
            });

            const userIds = await response.json();

            // Create a new post object with the updated comments array (user IDs)
            const updatedPost = {
                ...postData,
                comments: userIds,
            };

            // Dispatch the setPost action with the updated post
            dispatch(setPost({ post: updatedPost }));
             // Fetch the latest comments by post ID
            getCommentsByPostId();
            setComment("");
        } catch (error) {
            console.error('Error posting comment:', error);
        }
    };
    //console.log("Post after comment: ",postData)
    const handleCancel = () => {
        setComment('');
    };

    return (
        <WidgetWrapper>
            <Box
                display="flex"
                alignItems="flex-start"
                justifyContent="space-around"
                gap="1rem"
            >
                <UserImage image={user.picturePath} size="40px" />
                <Box
                    display="flex"
                    flexDirection="column"
                    width="25rem"
                >
                    <InputBase
                        placeholder=" Add a comment"
                        value={comment}
                        multiline
                        onChange={(e) => setComment(e.target.value)}
                        sx={{
                            width: "100%",
                            backgroundColor: palette.neutral.light,
                            borderRadius: "2rem",
                            padding: "1rem",

                        }}
                    />
                    <Box
                        display="flex"
                        justifyContent="flex-end"
                    >
                        <Button variant="text" onClick={handleCancel}>CANCEL</Button>
                        <Button variant="text" onClick={postComment}>COMMENT</Button>
                    </Box>
                </Box>
            </Box>
            {commentsByPostId.length > 0 ? (
                <Comment commentsByPostId={commentsByPostId} />
            ) : (
                <Typography 
                color={medium}
                textAlign="center"
                >
                    No comments yet!
                </Typography>
            )}

        </WidgetWrapper>
    );
};

export default CommentWidget;
