import { FC } from "react";
import { Button } from "@mui/material";
import { useAppSelector } from "store/hooks";

const FollowButton: FC<{userUid: string}> = ({ userUid }) => {
  const myInfo = useAppSelector(state => state.users.myInfo)
  const { followings } = myInfo!

  const onToggleFollow = () => {
    if (followings.includes(userUid)) { // 언팔로우
      console.log('unfollow')
    } else { // 팔로우
      console.log('follow')
    }
  }

  return (
    <Button 
      variant="outlined" 
      size="small" 
      sx={{ mr: 1 }}
      onClick={onToggleFollow}
    >
      {followings.includes(userUid) ? '언팔로우' : '팔로우'}
    </Button>
  )
}

export default FollowButton