import React from "react";
import ModeEditOutlineOutlinedIcon from "@mui/icons-material/ModeEditOutlineOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import AttachmentOutlinedIcon from "@mui/icons-material/AttachmentOutlined";
import GifBoxOutlinedIcon from "@mui/icons-material/GifBoxOutlined";
import ImageOutlinedIcon from "@mui/icons-material/ImageOutlined";
import MicOutlinedIcon from "@mui/icons-material/MicOutlined";
import MoreHorizOutlinedIcon from "@mui/icons-material/MoreHorizOutlined";

import {
    Box,
    Divider,
    Typography,
    InputBase,
    useTheme,
    Button,
    IconButton,
    useMediaQuery,
    CircularProgress
} from '@mui/material';
import FlexBetween from "components/FlexBetween";
import Dropzone from "react-dropzone";
import UserImage from "components/UserImage";
import WidgetWrapper from "components/WidgetWrapper";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPosts } from "state";
const MyPostWidget = ({ picturePath }) => {
    const dispatch = useDispatch();
    const [isImage, setIsImage] = useState(null);
    const [image, setImage] = useState("");
    const [post, setPost] = useState("");
    const { palette } = useTheme();
    const { _id } = useSelector((state) => state.user);
    const token = useSelector((state) => state.token);
    const isNonMobileScreens = useMediaQuery("(min-width:1000px)");
    const mediumMain = palette.neutral.mediumMain;
    const medium = palette.neutral.medium;
    //console.log("Image",image)
    const handlePost = async () => {
        const formData = new FormData();
        formData.append("userId", _id);
        formData.append("content", post);
        if (image) {
           // formData.append("picturePath", image);
           console.log("Image was appended!");
            formData.append("picture", image);
            formData.append("picturePath", image.name);
        }else{
            console.log("Image was not uploaded!");
        }
        const response = await fetch(`http://localhost:3001/posts`, {
            method: "POST",
            headers: { Authorization: `Bearer ${token}` },
            body: formData
        });
        const posts = await response.json();
        dispatch(setPosts({ posts }));
        console.log(posts);
        setImage(null);
        setPost("");
    };

    return (
        <WidgetWrapper>
            <FlexBetween gap="1.5rem">
                <UserImage image={picturePath} />
                <InputBase
                    placeholder="What's on your mind..."
                    onChange={(e) => setPost(e.target.value)}
                    value={post}
                    sx={{
                        width: "100%",
                        backgroundColor: palette.neutral.light,
                        borderRadius: "2rem",
                        padding: "1rem 2rem"
                    }}
                />
            </FlexBetween>
            {isImage && (
                <Box
                    border={`1px solid ${medium}`}
                    borderRadius="5px"
                    mt="1rem"
                    p="1rem"
                >
                    <Dropzone
                        acceptedFiles=".jpg,.jpeg,.png"
                        multiple={false}
                        onDrop={(acceptedFiles) => setImage(acceptedFiles[0])}
                    >


                        {({ getRootProps, getInputProps }) => (
                            <FlexBetween>
                                <Box
                                    {...getRootProps()}
                                    border={`2px dashed ${palette.primary.main}`}
                                    p="1rem"
                                    width="100%"
                                    sx={{
                                        "&:hover": { cursor: "pointer" }
                                    }}
                                >
                                    <input
                                        {...getInputProps()}
                                    />
                                    {!image ? (
                                        <p>Add Image Here</p>
                                    ) : (
                                        <FlexBetween>
                                            <Typography>{image.name}</Typography>
                                            <ModeEditOutlineOutlinedIcon />
                                        </FlexBetween>
                                    )}
                                </Box>
                                {image && (
                                    <IconButton
                                        onClick={() => setImage(null)}
                                        sx={{ width: "15%" }}
                                    >
                                        <DeleteOutlineOutlinedIcon />
                                    </IconButton>
                                )}

                            </FlexBetween>

                        )}
                    </Dropzone>
                </Box>
            )}


            <Divider sx={{ margin: "1.25rem 0" }} />
            <FlexBetween>
                <FlexBetween gap="0.25rem" onClick={() => setIsImage(!isImage)}>
                    <ImageOutlinedIcon sx={{ color: mediumMain }} />
                    <Typography
                        color={mediumMain}
                        sx={{
                            "&:hover": {
                                cursor: "pointer",
                                color: medium
                            }
                        }}
                    >
                        Image
                    </Typography>
                </FlexBetween>
                {isNonMobileScreens ? (
                    <>
                        <FlexBetween gap="0.25rem">
                            <GifBoxOutlinedIcon sx={{ color: mediumMain }} />
                            <Typography color={mediumMain}>
                                Clip
                            </Typography>
                        </FlexBetween>
                        <FlexBetween gap="0.25rem">
                            <AttachmentOutlinedIcon sx={{ color: mediumMain }} />
                            <Typography color={mediumMain}>
                                Attachment
                            </Typography>
                        </FlexBetween>
                        <FlexBetween gap="0.25rem">
                            <MicOutlinedIcon sx={{ color: mediumMain }} />
                            <Typography color={mediumMain}>
                                Audio
                            </Typography>
                        </FlexBetween>
                    </>
                ) : (
                    <FlexBetween gap="0.25rem">
                    <MoreHorizOutlinedIcon sx={{ color: mediumMain}}/>
                </FlexBetween>
                )}
              <Button
              disabled={!post}
              onClick={handlePost}
              sx={{
                color: palette.background.alt,
                backgroundColor: palette.primary.main,
                borderRadius: "3rem"
              }}
              >
                POST
              </Button>
            </FlexBetween>
        </WidgetWrapper>
    );
};

export default MyPostWidget;
