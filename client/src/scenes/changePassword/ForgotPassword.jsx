import React, { useState } from 'react';
import { Box, Button, TextField, Typography, useMediaQuery, useTheme } from '@mui/material';
import WidgetWrapper from 'components/WidgetWrapper';
import { localhost } from 'utils/Api_Route';
import { showToast } from 'components/Toast';
import { useNavigate } from 'react-router-dom';

const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [otp, setOtp] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [emailSent, setEmailSent] = useState(false);
    const [otpSent, setOtpSent] = useState(false);
    const [navigateToLogin, setNavigateToLogin] = useState(false);
    const isNonMobileScreens = useMediaQuery("(min-width:1000px)");
    const navigate = useNavigate();
    const { palette } = useTheme();

    const handleSendOtp = async () => {
        try {
            const response = await fetch(`${localhost}/password/send-otp`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email })
            });

            if (response.ok) {
                showToast('OTP sent to your email', 'success');
                setEmailSent(true);
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
                body: JSON.stringify({ email, otp })
            });

            if (response.ok) {
                showToast('OTP verified. You can now update your password.', 'info');
                setOtpSent(true);
            } else {
                const { message } = await response.json();
                showToast(message, "error");
            }
        } catch (error) {
            console.error('Error verifying OTP:', error);
        }
    };

    const handleUpdatePassword = async () => {
        try {
            const response = await fetch(`${localhost}/password/update-password`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, otp, newPassword })
            });

            if (response.ok) {
                showToast('Password updated successfully', 'success');
                setNavigateToLogin(true);
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
                    <Typography variant="h2" textAlign="center">Forgot Password</Typography>
                </WidgetWrapper>
                <WidgetWrapper width={isNonMobileScreens ? "60%" : "100%"}>
                    <Box
                        display="flex"
                        flexDirection="column"
                        alignItems="center"
                        justifyContent="center"
                        gap="1rem"
                    >
                        {!emailSent && (
                            <>
                                <TextField
                                    placeholder='Email'
                                    label="Enter Email"
                                    value={email}
                                    fullWidth
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                                <Button variant="contained" onClick={handleSendOtp}>Send OTP</Button>
                            </>
                        )}
                        {emailSent && !otpSent && (
                            <>
                                <TextField
                                    placeholder='4 digit OTP'
                                    label="Enter OTP"
                                    value={otp}
                                    onChange={(e) => setOtp(e.target.value)}
                                    inputProps={{ maxLength: 4 }}
                                />
                                <Button variant="contained" onClick={handleVerifyOtp}>Verify OTP</Button>
                            </>
                        )}
                        {otpSent && (
                            <>
                                <TextField
                                    placeholder='New Password'
                                    label="Enter New Password"
                                    type="password"
                                    value={newPassword}
                                    onChange={(e) => setNewPassword(e.target.value)}
                                />
                                <Button variant="contained" onClick={handleUpdatePassword}>Update Password</Button>
                            </>
                        )}

                        {navigateToLogin && (
                            <>
                                <Button
                                    variant="outlined"
                                    onClick={() => navigate("/")}
                                >
                                    Click To Login
                                </Button>
                            </>
                        )}

                    </Box>
                </WidgetWrapper>
            </Box>
        </>
    );
};

export default ForgotPassword;
