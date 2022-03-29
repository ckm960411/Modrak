import { FC, useState } from "react";
import styled from "@emotion/styled";
import { Avatar, Card, CardContent, CardHeader, IconButton, Stack, Typography } from "@mui/material";
import MoreIcon from '@mui/icons-material/MoreVert';
import defaultImg from "public/imgs/profileImg.png"
import FollowList from "./FollowList";

const SidebarProfile: FC<{myInfo: UserType}> = ({ myInfo }) => {
  const [followOpened, setFollowOpened] = useState(false)
  const [followType, setFollowType] = useState<"followers" | "followings">("followers")
  const { email, nickname, profileImg, followersCount, followingsCount } = myInfo

  const onClickFollowList = (e: React.MouseEvent<HTMLDivElement>) => {
    if ((e.currentTarget.firstElementChild as HTMLElement).innerText === '팔로워') {
      setFollowType('followers')
    } else {
      setFollowType('followings')
    }
    setFollowOpened(true)
  }

  return (
    <Card sx={{ margin: 1, padding: "6px", boxShadow: "none" }}>
      <CardHeader 
        avatar={
          <Avatar 
            alt={nickname} 
            src={profileImg ? profileImg : defaultImg.src} 
            sx={{ backgroundColor: '#dbdbdb' }} 
          />
        }
        action={
          <IconButton>
            <MoreIcon />
          </IconButton>
        }
        sx={{ p: 1 }}
      />
      <ProfileContent>
        <Stack>
          <Typography variant="subtitle1" sx={{ color: '#353535', fontFamily: 'Katuri' }}>
            {nickname}
          </Typography>
          <Typography variant="subtitle2">
            {email}
          </Typography>
        </Stack>
      </ProfileContent>
      <ProfileContent>
        <FollowerBox direction="row" spacing={1}>
          <div onClick={onClickFollowList}>
            <Typography variant="subtitle2">팔로워</Typography>
            <Typography variant="subtitle2">{followersCount}</Typography>
          </div>
          <div onClick={onClickFollowList}>
            <Typography variant="subtitle2">팔로잉</Typography>
            <Typography variant="subtitle2">{followingsCount}</Typography>
          </div>
        </FollowerBox>
      </ProfileContent>
      {followOpened && (
        <FollowList open={followOpened} setFollowOpened={setFollowOpened} followType={followType} />
      )}
    </Card>
  );
};

const ProfileContent = styled(CardContent)`
  padding: 8px !important;
`
const FollowerBox = styled(Stack)`
  text-align: center;
  & > div {
    flex-grow: 1;
    cursor: pointer;
  }
`

export default SidebarProfile;
