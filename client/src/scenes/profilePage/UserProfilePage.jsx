import React, { useState, useEffect } from 'react'
import Navbar from 'scenes/navbar/Navbar'
import { Box, Typography, useMediaQuery, useTheme, Button, Dialog, DialogActions, DialogContent, DialogTitle, DialogContentText, TextField, InputLabel, Select, MenuItem, IconButton } from '@mui/material'
import WidgetWrapper from 'components/WidgetWrapper'
import FriendListWidget from 'scenes/widgets/FriendListWidget'
import PostsWidget from 'scenes/widgets/PostsWidget'
import { useSelector, useDispatch } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import UserImage from 'components/UserImage';
import FlexBetween from 'components/FlexBetween';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PeopleIcon from '@mui/icons-material/People';
import EmailIcon from '@mui/icons-material/Email';
import CakeIcon from '@mui/icons-material/Cake';
import WorkIcon from '@mui/icons-material/Work';
import FavoriteIcon from '@mui/icons-material/Favorite';
import EditIcon from '@mui/icons-material/Edit';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import { showToast } from 'components/Toast'
import { localhost } from 'utils/Api_Route'
import { setLogin } from 'state'


const UserProfilePage = () => {
    const [user, setUser] = useState(null);
    const [open, setOpen] = useState(false);
    const [showForm, setShowForm] = useState(false);
    const [showDeleteAlert, setShowDeleteAlert] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { id } = useParams();
    console.log("Profile UserID: ", id);
    const token = useSelector((state) => state.token);
    const isNonMobileScreens = useMediaQuery("(min-width:1000px)");
    const viewerId = useSelector((state) => state.user._id);
    const friends = useSelector((state) => state.user.friends);
    console.log(friends)
    const { palette } = useTheme();
    const medium = palette.neutral.medium;
    const loggedInUserId = useSelector((state) => state.user._id);
    const loggedInUserFriends = useSelector((state) => state.user.friends);
    console.log(loggedInUserFriends)
    const [imageDialogOpen, setImageDialogOpen] = useState(false);
    const [newImage, setNewImage] = useState(null);
    const [previewUrl, setPreviewUrl] = useState("");

    // local states for fields of user
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [picture, setPicture] = useState("");
    const [location, setLocation] = useState("");
    const [occupation, setOccupation] = useState("");
    const [bio, setBio] = useState("");
    const [relationshipStatus, setRelationshipStatus] = useState("");
    const [dob, setDob] = useState(null);

    const getUser = async () => {
        const response = await fetch(`${localhost}/users/${id}`, {
            method: "GET",
            headers: { Authorization: `Bearer ${token}` },
        });
        const data = await response.json();
        setUser(data);
        setFirstName(data.firstName);
        setLastName(data.lastName);
        setEmail(data.email);
        setPassword(data.password);
        setPicture(data.picturePath);
        setLocation(data.location);
        setOccupation(data.occupation);
        setBio(data.bio);
        setRelationshipStatus(data.relationshipStatus);
        setDob(data.dob ? dayjs(data.dob) : null);

        if (viewerId !== id) {
            incrementProfileView(viewerId, id);
        }
    };

    const incrementProfileView = async (viewerId, profileUserId) => {
        try {
            const response = await fetch(`${localhost}/users/increment-profile-view`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify({ viewerId, profileUserId })
            });
            const data = await response.json();
            console.log("Profile View:", data.message);
        } catch (error) {
            console.error(`Error incrementing profile view: ${error}`);
        }
    }

    const handleEditUser = async (e) => {
        e.preventDefault();
        try {
            const updatedUserData = {
                firstName: firstName,
                lastName: lastName,
                email: email,
                location: location,
                occupation: occupation,
                bio: bio,
                relationshipStatus: relationshipStatus,
                dob: dob ? dob.format() : null // Assuming dob is stored in a specific format expected by your backend
            };

            const response = await fetch(`${localhost}/users/${id}`, {
                method: "PUT", // Use PATCH or PUT for updating existing data
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify(updatedUserData)
            });

            if (response.ok) {
                showToast("Your profile was edited!", "success");
                // Refresh user data to reflect the changes
                getUser();
            } else {
                const errorMessage = await response.text();
                console.error(errorMessage);
                showToast(errorMessage, "error");
            }
        } catch (error) {
            console.error(error.message);
            showToast(error.message, "error");
        }
        setOpen(false);
        setShowForm(false);
    }

    const handleDeleteUser = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`${localhost}/users/${id}`, {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${token}`
                },
            });

            // Check if the deletion was successful
            if (response.ok) {
                const { message } = await response.json();
                // Handle success message if needed
                //console.log(message);
            } else {
                // Handle non-200 status codes (e.g., 400, 404, etc.)
                const errorMessage = await response.json();
                console.error(errorMessage.message);
                showToast(errorMessage.message, "error");
            }
        } catch (error) {
            console.error(error.message);
            showToast(error.message, "error");
        }

        // Navigate after successful deletion
        navigate("/visit-again");
    }


    const handleClickOpen = () => {
        setShowForm(true);
        setOpen(true);
    }

    const handleClose = () => {
        setOpen(false);
        setShowForm(false);
    }

    const handleDeleteOpen = () => {
        setShowDeleteAlert(true);
    }

    const handleDeleteClose = () => {
        setShowDeleteAlert(false);
    }

    const handleImageDialogOpen = () => {
        setImageDialogOpen(true);
    };

    const handleImageDialogClose = () => {
        setImageDialogOpen(false);
        setNewImage(null);
        setPreviewUrl("");
    };

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setNewImage(file);
            setPreviewUrl(URL.createObjectURL(file));
        }
    };
    //console.log("New Image", newImage)
    //console.log("Preview URL: ", previewUrl);
    const handleImageUpload = async () => {
        if (!newImage) {
            showToast("Please select an image to upload.", "error");
            return;
        }

        const formData = new FormData();
        formData.append('image', newImage);
        console.log("New Image:", newImage);

        try {
            const response = await fetch(`${localhost}/users/${id}/update-image`, {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${token}`
                },
                body: formData
            });

            if (response.ok) {
                const data = await response.json();
                showToast("Profile picture updated successfully!", "success");
                // Update the user data to reflect the new picture
                dispatch(setLogin({ user: { ...user, picturePath: data.picturePath }, token }));
            } else {
                const { message } = await response.json();
                showToast(message, "error");
            }
        } catch (error) {
            console.error("Error uploading image:", error);
            showToast("Failed to update profile picture.", "error");
        }

        handleImageDialogClose();
    };

    useEffect(() => {
        getUser();
    }, [id, token])


    if (!user) {
        return null;
    }

    console.log(user)
    return (
        <Box>
            <Navbar />
            <Box
                width="100%"
                padding="2rem 6%"
                display="flex"
                flexDirection="column"
                alignItems="center"
                gap="1rem"
                height="auto"
                mt="5rem"
            >

                <WidgetWrapper
                    width={isNonMobileScreens ? "60%" : "100%"}
                >
                    <Box>
                        <Box
                            display="flex"
                            flexDirection={isNonMobileScreens ? "row" : "column"}
                            alignItems={isNonMobileScreens ? "flex-start" : "center"}
                            justifyContent="space-around"
                            gap={isNonMobileScreens ? "" : "3rem"}
                            marginTop="2rem"
                        >
                            <Box
                                borderRadius="50%" // This makes the box circular
                                boxShadow="0px 0px 10px 5px rgba(0, 213, 250, 0.5)"
                                position="relative"
                            >
                                <UserImage image={user && user.picturePath} size="200px" />
                                {loggedInUserId === id && (
                                    <IconButton
                                        onClick={handleImageDialogOpen}
                                        sx={{
                                            position: "absolute",
                                            backgroundColor: palette.neutral.medium,
                                            bottom: "2px",
                                            right: "12px"
                                        }}
                                    >
                                        <EditIcon color="primary" />
                                    </IconButton>
                                )}

                            </Box>

                            <Box
                                display="flex"
                                flexDirection="column"
                                justifyContent="center"
                                gap="1.5rem"
                            >

                                <Typography variant={isNonMobileScreens ? "h1" : "h2"}
                                    letterSpacing="0.1rem"
                                >
                                    {user.firstName}{" "}{user.lastName}
                                </Typography>
                                <Box
                                    display="flex"
                                    flexDirection="column"
                                    alignItems="flex-start"
                                    gap="1rem"
                                >
                                    <Typography variant="h6">{user.bio}</Typography>
                                    <Box
                                        display="flex"
                                        flexDirection="column"
                                        alignItems="flex-start"
                                        gap="0.5rem"

                                    >
                                        <FlexBetween
                                            gap="2rem"
                                        >
                                            <LocationOnIcon color="primary" />
                                            <Typography variant="h5" color={medium}>
                                                {user.location}
                                            </Typography>
                                        </FlexBetween>
                                        <FlexBetween
                                            gap="2rem"
                                        >
                                            <PeopleIcon color="primary" />
                                            <Typography variant="h5" color={medium}>
                                                {user.friends.length}{" "}friends
                                            </Typography>
                                        </FlexBetween>
                                        <FlexBetween
                                            gap="2rem"
                                        >
                                            <WorkIcon color="primary" />
                                            <Typography variant="h5" color={medium}>
                                                {user.occupation}
                                            </Typography>
                                        </FlexBetween>
                                        <FlexBetween
                                            gap="2rem"
                                        >
                                            <EmailIcon color="primary" />
                                            <Typography variant="h5" color={medium}>
                                                {user.email}
                                            </Typography>
                                        </FlexBetween>
                                        <FlexBetween
                                            gap="2rem"
                                        >
                                            <CakeIcon color="primary" />
                                            <Typography variant="h5" color={medium}>
                                                {new Date(user.dob).toLocaleDateString('en-GB')}
                                            </Typography>
                                        </FlexBetween>
                                        <FlexBetween
                                            gap="2rem"
                                        >
                                            <FavoriteIcon color="primary" />
                                            <Typography variant="h5" color={medium}>
                                                {user.relationshipStatus}
                                            </Typography>
                                        </FlexBetween>
                                    </Box>

                                </Box>
                                {id === loggedInUserId && (
                                    <Box
                                        display="flex"
                                        flexDirection={isNonMobileScreens ? "row" : "column"}
                                        gap="1rem"
                                    >
                                        <Button variant="contained" sx={{ color: "white" }}
                                            onClick={handleClickOpen}
                                        >
                                            Edit Profile
                                        </Button>
                                        <Button variant="contained" sx={{ color: "white" }} color="error"
                                            onClick={handleDeleteOpen}
                                        >
                                            Delete Account
                                        </Button>
                                    </Box>
                                )}

                            </Box>
                        </Box>
                    </Box>
                </WidgetWrapper>
                <WidgetWrapper
                    width={isNonMobileScreens ? "60%" : "100%"}
                >
                    <Typography variant="h2" textAlign="center">{user.firstName}'s Friends</Typography>
                </WidgetWrapper>
                <Box
                    width={isNonMobileScreens ? "60%" : "100%"}
                >
                    <FriendListWidget userId={user._id} isProfilePage={true} />
                </Box>
                <WidgetWrapper
                    width={isNonMobileScreens ? "60%" : "100%"}
                >
                    <Typography variant="h2" textAlign="center">{user.firstName}'s Posts</Typography>
                </WidgetWrapper>
                <Box
                    width={isNonMobileScreens ? "60%" : "100%"}
                    marginTop="-2rem"
                >
                    <PostsWidget userId={user._id} isProfile="true" />
                </Box>
            </Box>

            {/* Dialog box for updating image */}
            <Dialog open={imageDialogOpen} onClose={handleImageDialogClose}
                fullWidth
            >
                <DialogTitle
                >
                    <Typography variant="h4" textAlign="center">Update Image</Typography>
                </DialogTitle>
                <DialogContent

                >
                    <input
                        accept="image/*"
                        id="contained-button-file"
                        type="file"
                        onChange={handleFileChange}
                        style={{ display: 'none' }}
                    />
                    <label htmlFor="contained-button-file">
                        <Button
                            variant="contained"
                            component="span"
                        >
                            Choose Image
                        </Button>
                    </label>
                    {previewUrl && (
                        <Box
                            mt={2}
                            display="flex"
                            justifyContent="center"
                        >
                            <Box
                                position="relative"
                                width="200px"
                                height="200px"
                            >
                                <img
                                    src={previewUrl}
                                    alt="Profile Preview"
                                    style={{
                                        objectFit: "cover",
                                        borderRadius: "50%",
                                        width: "100%",
                                        height: "100%"
                                    }}
                                />
                            </Box>
                        </Box>
                    )}

                </DialogContent>
                <DialogActions>
                    <Button onClick={handleImageDialogClose}>Cancel</Button>
                    <Button onClick={handleImageUpload} variant="contained" color="primary">Update</Button>
                </DialogActions>
            </Dialog>


            {/* Dialog box for edit profile */}
            {showForm && (
                <React.Fragment
                >
                    <Dialog
                        open={open}
                        onClose={handleClose}
                        fullWidth
                        PaperProps={{
                            component: 'form',
                            onSubmit: handleEditUser
                        }}

                    >
                        <DialogTitle
                        >
                            <Typography variant="h2" textAlign="center">Edit Profile</Typography>
                        </DialogTitle>
                        <DialogContent
                            className='custom-scrollbar'
                        >
                            <Box
                                display="flex"
                                flexDirection="column"
                                gap="1rem"
                            >

                                <Box>
                                    <InputLabel>Enter your first name: </InputLabel>
                                    <TextField
                                        value={firstName}
                                        fullWidth
                                        onChange={(e) => setFirstName(e.target.value)}
                                    />
                                </Box>
                                <Box>
                                    <InputLabel>Enter your last name: </InputLabel>
                                    <TextField
                                        value={lastName}
                                        fullWidth
                                        onChange={(e) => setLastName(e.target.value)}
                                    />
                                </Box>
                                <Box>
                                    <InputLabel>Enter your email:</InputLabel>
                                    <TextField
                                        value={email}
                                        fullWidth
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                </Box>
                                {/* <Box>
                                    <InputLabel>Enter your password:</InputLabel>
                                    <TextField
                                        type="password"
                                        value={password}
                                        fullWidth
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                </Box> */}
                                {/* <Box>
                                    <InputLabel>Enter your picture URL:</InputLabel>
                                    <TextField
                                        value={picture}
                                        fullWidth
                                        onChange={(e) => setPicture(e.target.value)}
                                    />
                                </Box> */}
                                <Box>
                                    <InputLabel>Enter your location:</InputLabel>
                                    <TextField
                                        value={location}
                                        fullWidth
                                        onChange={(e) => setLocation(e.target.value)}
                                    />
                                </Box>
                                <Box>
                                    <InputLabel>Enter your occupation:</InputLabel>
                                    <TextField
                                        value={occupation}
                                        fullWidth
                                        onChange={(e) => setOccupation(e.target.value)}
                                    />
                                </Box>
                                <Box>
                                    <InputLabel>Enter your bio:</InputLabel>
                                    <TextField
                                        value={bio}
                                        fullWidth
                                        onChange={(e) => setBio(e.target.value)}
                                    />
                                </Box>
                                <Box>
                                    <InputLabel>Enter your relationship status:</InputLabel>
                                    <Select
                                        value={relationshipStatus}
                                        name="relationshipStatus"
                                        fullWidth
                                        onChange={(e) => setRelationshipStatus(e.target.value)}
                                    >

                                        <MenuItem
                                            value="Single"
                                        >
                                            Single
                                        </MenuItem>
                                        <MenuItem
                                            value="Married"
                                        >
                                            Married
                                        </MenuItem>
                                        <MenuItem
                                            value="It's complicated"
                                        >
                                            It's complicated
                                        </MenuItem>
                                        <MenuItem
                                            value="Friends With Benefits"
                                        >
                                            Friends With Benefits
                                        </MenuItem>
                                    </Select>
                                </Box>
                                <Box>
                                    <InputLabel>Enter your date of birth:</InputLabel>
                                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                                        <DatePicker
                                            onChange={(date) => setDob(date)}
                                            value={dob}

                                        />
                                    </LocalizationProvider>
                                </Box>
                            </Box>
                        </DialogContent>
                        <DialogActions>
                            <Button variant="contained" sx={{ color: "white", margin: "1rem", width: "100%" }} color="primary" type="submit">SUBMIT</Button>
                        </DialogActions>
                    </Dialog>
                </React.Fragment>
            )}
            {showDeleteAlert && (
                <React.Fragment>
                    <Dialog
                        open={showDeleteAlert}
                        onClose={handleDeleteClose}
                        fullWidth
                        PaperProps={{
                            component: 'form',
                            onSubmit: handleDeleteUser
                        }}
                    >
                        <DialogTitle>
                            Delete Your Account
                        </DialogTitle>
                        <DialogContent>
                            <DialogContentText>
                                Are you sure you want to delete your account?
                            </DialogContentText>
                            <DialogActions>
                                <Button type="submit">Yes</Button>
                                <Button onClick={() => setShowDeleteAlert(false)}>No</Button>
                            </DialogActions>
                        </DialogContent>
                    </Dialog>
                </React.Fragment>
            )}
        </Box>
    )
}

export default UserProfilePage