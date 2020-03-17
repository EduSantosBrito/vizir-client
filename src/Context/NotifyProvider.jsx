import MuiAlert from '@material-ui/lab/Alert';
import React, { createContext, useContext, useState, useCallback } from 'react';
import { Snackbar } from '@material-ui/core';

const NotifyContext = createContext({
    open: false,
    showError: () => {},
});

export function useNotify() {
    return useContext(NotifyContext);
}

function Alert(props) {
    return <MuiAlert elevation={6} variant='filled' {...props} />;
}

const NotifyProvider = ({ children }) => {
    const [open, setOpen] = useState(false);
    const [message, setMessage] = useState('');

    const showError = useCallback(messageNotification => {
        setMessage(messageNotification);
        setOpen(true);
    }, []);

    const handleClose = useCallback((event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    }, []);

    return (
        <NotifyContext.Provider value={{ open, showError }}>
            <Snackbar
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                }}
                open={open}
                autoHideDuration={6000}
                onClose={handleClose}
            >
                <Alert onClose={handleClose} severity='error'>
                    {message}
                </Alert>
            </Snackbar>
            {children}
        </NotifyContext.Provider>
    );
};

export default NotifyProvider;
