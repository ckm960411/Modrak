import { forwardRef, SyntheticEvent } from "react";
import MuiAlert, { AlertProps } from "@mui/material/Alert";
import { Snackbar } from "@mui/material";

interface SideAlertProps extends AlertProps {
  open: boolean
  onClose: (event?: Event | SyntheticEvent<Element, Event> | undefined, reason?: string | undefined) => void
}

const SideAlert = forwardRef<HTMLDivElement, SideAlertProps>(({
  open, onClose, children, ...props
}, ref) => {
  return (
    <Snackbar open={open} autoHideDuration={2000} onClose={onClose}>
      <MuiAlert 
        elevation={6} 
        ref={ref} 
        variant="filled"
        severity="success"
        sx={{ width: '100%' }}
        {...props} 
      >
        {children}
      </MuiAlert>
    </Snackbar>
  );
});

SideAlert.displayName = "SideAlert";

export default SideAlert;
