import React, { useState } from "react";
import {
  Box,
  IconButton,
  InputBase,
  Typography,
  Select,
  MenuItem,
  FormControl,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import SearchBar from "scenes/searchBar/SearchBar";
//icons to be included.
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import MessageIcon from '@mui/icons-material/Message';
import NotificationsIcon from '@mui/icons-material/Notifications';
import HelpIcon from '@mui/icons-material/Help';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setMode, setLogout } from "state";
import { useNavigate } from "react-router-dom";
import FlexBetween from "components/FlexBetween";

const Navbar = () => {
  const [isMobileMenuToggle, setIsMobileMenuToggle] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  const isNonMobileScreens = useMediaQuery("(min-width:1000px)");
  const loggedInUserId = useSelector((state) => state.user._id);
  const theme = useTheme();
  const neutralLight = theme.palette.neutral.light;
  const dark = theme.palette.neutral.dark;
  const background = theme.palette.background.default;
  const primaryLight = theme.palette.primary.light;
  const alt = theme.palette.background.alt;

  const fullName = `${user.firstName} ${user.lastName}`;

  return <FlexBetween padding="1rem 6%" backgroundColor={alt} position="relative">
    <FlexBetween gap="1.75rem">
      <Typography
        fontWeight="bold"
        fontSize="clamp(1rem, 2rem, 2.25rem)"
        color="primary"
        onClick={() => navigate("/home")}
        sx={{
          "&:hover": {
            color: "primary",
            cursor: "pointer"
          }
        }}
      >
        SocioVerse
      </Typography>
      {/* Not for mobile screens */}
      {isNonMobileScreens && (
        <SearchBar placeholder="Search for people..." width="15rem" />
      )}
    </FlexBetween>

    {/* DESKTOP NAV */}
    {isNonMobileScreens ? (
      <FlexBetween gap="2rem">
        <IconButton onClick={() => dispatch(setMode())}>
          {theme.palette.mode === "dark" ? (
            <DarkModeIcon sx={{ fontSize: "25px" }} />
          ) : (
            <LightModeIcon sx={{ color: dark, fontSize: "25px" }} />
          )}
        </IconButton>

        <IconButton
          onClick={() => navigate(`/message`)}
          sx={{
            color: dark
          }
          }>
          <MessageIcon sx={{ color:dark, fontSize: "25px" }} />
        </IconButton>


        <NotificationsIcon sx={{ fontSize: "25px" }} />
        <IconButton
          onClick={() => navigate(`/report-problem/${loggedInUserId}`)}
          sx={{
            color: dark
          }}
        >
          <HelpIcon sx={{ fontSize: "25px" }} />
        </IconButton>

        <FormControl variant="standard" value={fullName}>
          <Select
            value={fullName}
            sx={{
              backgroundColor: neutralLight,
              width: "150px",
              borderRadius: "0.25rem",
              p: "0.25rem 1rem",
              "& .MuiSvgIcon-root": {
                pr: "0.10rem",
                width: "3rem"
              },
              "& .MuiSelect-select:focus": {
                backgroundColor: neutralLight
              }
            }}
            input={<InputBase />}
          >
            <MenuItem value={fullName}>
              <Typography>
                {fullName}
              </Typography>
            </MenuItem>
            <MenuItem onClick={() => dispatch(setLogout())}>
              Log Out
            </MenuItem>
          </Select>
        </FormControl>
      </FlexBetween>
    ) : (
      // It will pop up when you are on small screens
      <IconButton
        onClick={() => setIsMobileMenuToggle(!isMobileMenuToggle)}
      >
        <MenuIcon />
      </IconButton>
    )}

    {/* MOBILE NAV */}
    {!isNonMobileScreens && isMobileMenuToggle && (
      <Box
        position="fixed"
        right="0"
        bottom="0"
        height="100%"
        zIndex="10"
        maxWidth="500px"
        minWidth="300px"
        backgroundColor={background}
      >
        {/* CLOSE ICON */}
        {/* choosing specific flex for the below  */}
        <Box display="flex" justifyContent="flex-end" p="1rem">
          <IconButton
            onClick={() => setIsMobileMenuToggle(!setIsMobileMenuToggle)}
          >
            <CloseIcon />
          </IconButton>
        </Box>
        {/* MENU ITEMS */}
        <FlexBetween display="flex" flexDirection="column" justifyContent="center" alignItems="center" gap="3rem">
          <IconButton onClick={() => dispatch(setMode())}>
            {theme.palette.mode === "dark" ? (
              <DarkModeIcon sx={{ fontSize: "25px" }} />
            ) : (
              <LightModeIcon sx={{ color: dark, fontSize: "25px" }} />
            )}
          </IconButton>

          {/* <MessageIcon sx={{ fontSize: "25px" }} /> */}
          <NotificationsIcon sx={{ fontSize: "25px" }} />
          <HelpIcon sx={{ fontSize: "25px" }} />
          <FormControl variant="standard" value={fullName}>
            <Select
              value={fullName}
              sx={{
                backgroundColor: neutralLight,
                width: "150px",
                borderRadius: "0.25rem",
                p: "0.25rem 1rem",
                "& .MuiSvgIcon-root": {
                  pr: "0.25rem",
                  width: "3rem"
                },
                "& .MuiSelect-select:focus": {
                  backgroundColor: neutralLight
                }
              }}
              input={<InputBase />}
            >
              <MenuItem value={fullName}>
                <Typography>
                  {fullName}
                </Typography>
              </MenuItem>
              <MenuItem onClick={() => dispatch(setLogout())}>
                Log Out
              </MenuItem>
            </Select>
          </FormControl>
        </FlexBetween>
      </Box>
    )}
  </FlexBetween>
}

export default Navbar;
