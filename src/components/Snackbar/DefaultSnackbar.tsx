import React from 'react';
import { Slide, Snackbar as MuiSnackbar } from "@mui/material";
import Alert from "@mui/material/Alert";

interface SnackbarProps {
  open: boolean;
  message: string;
  severity: "info" | "success" | "warning" | "error";
  onClose: () => void;
}

const DefaultSnackbar: React.FC<SnackbarProps> = ({ open, message, severity, onClose }) => {
  return (
    <MuiSnackbar
      open={open}
      autoHideDuration={5000}
      onClose={onClose}
      anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      TransitionComponent={Slide}
    >
      <Alert onClose={onClose} severity={severity} variant="filled">
        {message}
      </Alert>
    </MuiSnackbar>
  );
};

export default DefaultSnackbar;