import { forwardRef } from "react";
import MuiAlert, { AlertProps } from "@mui/material/Alert";
import { Snackbar } from "@mui/material";
import { useAppDispatch, useAppSelector } from "store/hooks";
import { showAlert } from "store/slices/appSlice";

const SideAlert = forwardRef<HTMLDivElement, AlertProps>(({ children, ...props }, ref) => {
  const dispatch = useAppDispatch()
  const { isShown, message, severity } = useAppSelector(state => state.app)

  const onClose = () => {
    dispatch(showAlert({
      isShown: false,
      message: null,
    }))
  }

  return (
    <Snackbar open={isShown} autoHideDuration={3000} onClose={onClose}>
      <MuiAlert 
        elevation={6} 
        ref={ref} 
        variant="filled"
        severity={severity}
        sx={{ width: '100%' }}
        {...props} 
      >
        {message}
      </MuiAlert>
    </Snackbar>
  );
});

SideAlert.displayName = "SideAlert";

export default SideAlert;
