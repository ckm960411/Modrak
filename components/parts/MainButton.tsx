import { FC } from "react";
import { Button } from "@mui/material";

interface ButtonProps {
  [key: string]: any
}
const MainButton: FC<ButtonProps> = ({ children, ...props }) => {
  return (
    <Button
      variant="contained"
      sx={{ float: 'right', mt: 1 }}
      {...props}
    >
      {children}
    </Button>
  );
};

export default MainButton;