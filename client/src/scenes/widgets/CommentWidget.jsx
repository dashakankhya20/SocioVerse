import { useState } from 'react';
import { InputBase, Box, Button, useTheme } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import WidgetWrapper from 'components/WidgetWrapper';
import UserImage from 'components/UserImage';
import Comment from './Comment';
import { setComments } from 'state';

const CommentWidget = ({ postId }) => {
    const { palette } = useTheme();
    const [comment, setComment] = useState('');
    const user = useSelector((state) => state.user);
    const token = useSelector((state) => state.token);
    const dispatch = useDispatch();
    const comments = useSelector((state) => state.comments);

    const postComment = async () => {
        try {
            const response = await fetch(`http://localhost:3001/comments`, {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ postId: postId, userId: user._id, content: comment })
            });

            const comments = await response.json();
            dispatch(setComments({ comments }));
            console.log(comments);
        } catch (error) {
            console.error('Error posting comment:', error);
        }
    };

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
            {comments ? (
                <Comment postId={postId} />
            ) : (
                "No comments yet!"
            )}

        </WidgetWrapper>
    );
};

export default CommentWidget;
