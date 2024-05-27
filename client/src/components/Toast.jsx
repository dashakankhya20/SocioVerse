import React from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import 'react-toastify/dist/ReactToastify.css';

const Toast = () => {
    const mode = useSelector((state) => state.mode);
    return (
        <ToastContainer
            position="top-right"
            autoClose={3000}
            pauseOnHover
            draggable
            theme={mode}
        />
    );
};

// Function to show toast message
export const showToast = (message, type = 'default') => {
    toast(message, { type });
};

export default Toast;
