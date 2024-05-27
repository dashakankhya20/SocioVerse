import React, { useState } from 'react';
import WidgetWrapper from 'components/WidgetWrapper';
import ModeEditOutlineOutlinedIcon from "@mui/icons-material/ModeEditOutlineOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import ImageOutlinedIcon from "@mui/icons-material/ImageOutlined";
import { Box, TextField, useMediaQuery, Typography, useTheme, IconButton, Divider, Button } from '@mui/material';
import Navbar from 'scenes/navbar/Navbar';
import Dropzone from "react-dropzone";
import FlexBetween from 'components/FlexBetween';
import { useSelector } from 'react-redux';
import { showToast } from 'components/Toast';
import { useParams } from 'react-router-dom';

const ReportProblem = () => {
    const isNonMobileScreens = useMediaQuery("(min-width:1000px)");
    const [description, setDescription] = useState("");
    const [featureName, setFeatureName] = useState("");
    const { id } = useParams();
    //console.log("UserID", id)
    const token = useSelector((state) => state.token);
    //console.log(token);

    const handleSubmitForm = async () => {
        try {
            if (description.trim() === "") {
                showToast("Problem description is required!", "error");
            }
            if (featureName.trim() === "") {
                showToast("Feature name is required!", "error");
            }

            console.log("Description: ", description)
            console.log("Feature Name: ", featureName)
            if (description.trim() !== "" && featureName.trim() !== "") {
                const response = await fetch(`http://localhost:3001/problems/submitProblem/${id}`, {
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`
                    },
                    body: JSON.stringify({ description, featureName })
                })
                const { message } = await response.json();
                showToast(message, "success");
            }

        } catch (error) {
            showToast(error.message, "error");
            console.error(error.message);
        }
    }


    return (
        <>
            <Navbar />
            <Box
                display={isNonMobileScreens ? "flex" : "block"}
                flexDirection="column"
                alignItems="center"
                justifyContent="center"
                width="100%"
                padding="2rem 6%"
                gap="1rem"
            >
                <WidgetWrapper width={isNonMobileScreens ? "60%" : "100%"}>
                    <Typography variant="h2" textAlign="center">Report Problem</Typography>
                </WidgetWrapper>
                <WidgetWrapper
                    width={isNonMobileScreens ? "60%" : "100%"}
                    display="flex"
                    flexDirection="column"
                    alignItems="center"
                    gap="1rem"
                >
                    <TextField
                        label="Feature Name"
                        placeholder="Write the feature name you encountered the problem"
                        fullWidth
                        required
                        value={featureName}
                        onChange={(e) => setFeatureName(e.target.value)}
                    />

                    <TextField
                        label="Problem Description"
                        placeholder="Briefly explain the problem description"
                        fullWidth
                        required
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        multiline
                    />


                    <Button
                        variant="contained"
                        onClick={handleSubmitForm}
                    >
                        Submit
                    </Button>
                </WidgetWrapper>
            </Box>
        </>
    );
}

export default ReportProblem;
