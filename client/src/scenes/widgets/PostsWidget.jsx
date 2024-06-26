import React from "react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPosts } from "state";
import PostWidget from "./PostWidget";
import Loading from "scenes/progress/Loading";
import { Typography, useTheme } from "@mui/material";
import { localhost } from "utils/Api_Route";

const PostsWidget = ({ userId, isProfile = false }) => {
  const dispatch = useDispatch();
  const { palette } = useTheme();
  const posts = useSelector((state) => state.posts);
  const token = useSelector((state) => state.token);
  const medium = palette.neutral.medium;
  const [loading, setLoading] = useState(true);
  //console.log("Token ", token);

  const getPosts = async () => {
    const response = await fetch(`${localhost}/posts`, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await response.json();
    //console.log("Data", data);
    dispatch(setPosts({ posts: data }));
    setLoading(false);
  };
  const getUserPosts = async () => {
    const response = await fetch(`${localhost}/posts/user/${userId}`, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await response.json();
    dispatch(setPosts({ posts: data }));
    setLoading(false);
  };

 // console.log("PostsWidget", posts);
  useEffect(() => {
    if (isProfile) {
      getUserPosts();
    } else {
      getPosts();
    }
  }, [userId, isProfile, token]);

  if (loading) {
    return <Loading />;
  }

  return (
    <>
      {Array.isArray(posts) ? (
        posts.length > 0 ? (
          posts.map((postData) => (
            <PostWidget key={postData._id} postData={postData} />
          ))
        ) : (
          isProfile && (
            <>
              <Typography color={medium} variant="h3" align="center" marginTop="2rem">
                No posts to show
              </Typography>
            </>
          )
        )
      ) : (
        <Loading />
      )}
    </>
  );
};

export default PostsWidget;
