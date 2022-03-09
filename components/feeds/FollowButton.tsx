import { FC } from "react";
import { Button } from "@mui/material";
import { useAppSelector } from "store/hooks";

const FollowButton: FC = () => {
  const myInfo = useAppSelector(state => state.users.myInfo)

  return (
    <Button 
      variant="outlined" 
      size="small" 
    >
      팔로우
    </Button>
  )
}

export default FollowButton