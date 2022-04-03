import { FC } from "react";
import { Avatar, CardContent } from "@mui/material";
import { useAppSelector } from "store/hooks";
import defaultImg from "public/imgs/profileImg.png"

const ProfileImg: FC = () => {
  const { userData } = useAppSelector(state => state.profile)
  const { nickname, profileImg } = userData!

  return (
    <CardContent>
      <Avatar
        alt={nickname} 
        src={profileImg ? profileImg : defaultImg.src} 
        sx={{ width: 200, height: 200, m: '0 auto' }} 
      />
    </CardContent>
  )
}

export default ProfileImg