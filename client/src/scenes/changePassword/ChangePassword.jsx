import React, { useState } from 'react';
import Navbar from 'scenes/navbar/Navbar';
import { Box, Button, TextField, Typography, useMediaQuery, useTheme } from '@mui/material';
import WidgetWrapper from 'components/WidgetWrapper';
import { localhost } from 'utils/Api_Route';
import { useSelector } from 'react-redux';
import { showToast } from 'components/Toast';

const ChangePassword = () => {
    const [otp, setOtp] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [otpVerified, setOtpVerified] = useState(false);
    const isNonMobileScreens = useMediaQuery("(min-width:1000px)");
    const { palette } = useTheme();
    const userEmailID = useSelector((state) => state.user.email);

    const handleSendOtp = async () => {
        try {
            const response = await fetch(`${localhost}/password/send-otp`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email: userEmailID })
            });

            if (response.ok) {
                showToast('OTP sent to your email', 'success');
            } else {
                const { message } = await response.json();
                showToast(message, "error");
            }
        } catch (error) {
            console.error('Error sending OTP:', error);
        }
    };

    const handleVerifyOtp = async () => {
        try {
            const response = await fetch(`${localhost}/password/verify-otp`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email: userEmailID, otp })
            });

            if (response.ok) {
                showToast('OTP verified. You can now update your password.', 'info');
                setOtpVerified(true);
            } else {
                const { message } = await response.json();
                showToast(message, "error");
                setOtpVerified(false);
            }
        } catch (error) {
            console.error('Error verifying OTP:', error);
            setOtpVerified(false);
        }
    };

    const handleUpdatePassword = async () => {
        try {
            const response = await fetch(`${localhost}/password/update-password`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email: userEmailID, otp, newPassword })
            });

            if (response.ok) {
                showToast('Password updated successfully', 'success');
            } else {
                const { message } = await response.json();
                showToast(message, "error");
            }
        } catch (error) {
            console.error('Error updating password:', error);
        }
    };

    return (
        <>
            <Navbar />
            <Box
                display="flex"
                flexDirection="column"
                alignItems="center"
                justifyContent="center"
                mt="5rem"
                width="100%"
                padding="2rem 6%"
                gap="1rem"
            >
                <WidgetWrapper width={isNonMobileScreens ? "60%" : "100%"}>
                    <Typography variant="h2" textAlign="center">Change Password</Typography>
                </WidgetWrapper>
                <WidgetWrapper width={isNonMobileScreens ? "60%" : "100%"}>
                    <Box
                        display="flex"
                        flexDirection="column"
                        alignItems="center"
                        justifyContent="center"
                        gap="1rem"
                    >
                        <Typography color={palette.neutral.medium}>
                            OTP will be sent to your registered email: {userEmailID}
                        </Typography>
                        <Box
                            display="flex"
                            alignItems="center"
                            justifyContent="center"
                            gap="1rem"
                        >
                            <TextField
                                placeholder='4 digit OTP'
                                label="Enter OTP"
                                value={otp}
                                onChange={(e) => setOtp(e.target.value)}
                                inputProps={{ maxLength: 4 }}
                            />
                            <Button variant="outlined" sx={{ color: "white" }} onClick={handleSendOtp}>
                                Send OTP
                            </Button>
                        </Box>
                       
                        {otp.length === 4 && (
                            <Button variant="contained" sx={{ color: "white" }} onClick={handleVerifyOtp}>
                                Submit
                            </Button>
                        )}
                        
                        {otpVerified && (
                            <>
                                <TextField
                                    placeholder='New Password'
                                    label="Enter New Password"
                                    type="password"
                                    value={newPassword}
                                    onChange={(e) => setNewPassword(e.target.value)}
                                />
                                <Button variant="contained" sx={{ color: "white" }} onClick={handleUpdatePassword}>
                                    Update Password
                                </Button>
                            </>
                        )}
                    </Box>
                </WidgetWrapper>
            </Box>
        </>
    );
};

export default ChangePassword;
