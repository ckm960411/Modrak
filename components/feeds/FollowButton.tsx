import { FC } from "react";
import { Button } from "@mui/material";

const FollowButton: FC = () => {
  return (
    <Button 
      variant="outlined" 
      size="small" 
      sx={{ mr: 1 }}
    >
      팔로우
    </Button>
  )
}

export default FollowButton