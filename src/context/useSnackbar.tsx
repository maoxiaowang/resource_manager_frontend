import React, { createContext, ReactNode, useCallback, useContext, useEffect, useRef, useState } from 'react';
import { Slide, Snackbar } from "@mui/material";
import Alert from "@mui/material/Alert";

interface SnackbarContextType {
    openSnackbar: (message: string, severity: string) => void;
    closeSnackbar: () => void;
}

const SnackbarContext = createContext<SnackbarContextType | undefined>(undefined);

export const SnackbarProvider = ({ children }: { children: ReactNode }) => {
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [snackbarSeverity, setSnackbarSeverity] = useState('info');
    const timerRef = useRef<NodeJS.Timeout | null>(null); // Ref to store timer reference

    const openSnackbar = useCallback((message: string, severity: string) => {
        setSnackbarMessage(message);
        setSnackbarSeverity(severity)
        setSnackbarOpen(true);
    }, []);

    const closeSnackbar = useCallback(() => {
        setSnackbarOpen(false);
        setSnackbarMessage(''); // Clear message immediately
    }, []);

    useEffect(() => {
        // Clear timer when component unmounts
        const timer = timerRef.current;
        return () => {
            if (timer) {
                clearTimeout(timer);
            }
        };
    }, []);

    const value: SnackbarContextType = {
            openSnackbar,
            closeSnackbar
    }

    return (
        <SnackbarContext.Provider value={value}>
            {children}
            <Snackbar
                open={snackbarOpen}
                autoHideDuration={5000}
                onClose={closeSnackbar}
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                TransitionComponent={Slide}
            >
                <Alert onClose={closeSnackbar} severity={snackbarSeverity as "info" | "success" | "warning" | "error"} variant="filled">
                    {snackbarMessage}
                </Alert>
            </Snackbar>
        </SnackbarContext.Provider>
    );
}

export const useSnackbar = () => {
    // const context = useContext(SnackbarContext);
    // if (!context) {
    //     throw new Error('useSnackbar must be used within a SnackbarProvider');
    // }
    // return context;
    return useContext(SnackbarContext) as SnackbarContextType;
};