import { Button } from "@mui/material";
import { FC } from "react";

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