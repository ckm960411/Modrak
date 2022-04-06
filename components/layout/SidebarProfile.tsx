import { FC, useState } from "react";
import { useRouter } from "next/router";
import { authService } from "fireBaseApp/fBase";
import styled from "@emotion/styled";
import { Avatar, Card, CardContent, CardHeader, Divider, IconButton, Menu, MenuItem, Stack, Typography } from "@mui/material";
import MoreIcon from '@mui/icons-material/MoreVert';
import { removeMyInfoData } from "store/slices/usersSlice";
import { useAppDispatch } from "store/hooks";
import defaultImg from "public/imgs/profileImg.png"
import FollowList from "components/layout/FollowList";

const SidebarProfile: FC<{myInfo: UserType}> = ({ myInfo }) => {
  const [followOpened, setFollowOpened] = useState(false)
  const [followType, setFollowType] = useState<"followers" | "followings">("followers")
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const router = useRouter()
  const dispatch = useAppDispatch()
  const { email, nickname, profileImg, followersCount, followingsCount } = myInfo
  const open = Boolean(anchorEl);

  const handleClickMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (open) return setAnchorEl(null)
    setAnchorEl(event.currentTarget);
  }
  const handleCloseMenu = () => setAnchorEl(null);

  const onLogoutClick = () => {
    const ok = confirm('정말 로그아웃 하시겠습니까?')
    if (!ok) return
    authService.signOut()
    alert('로그아웃이 완료됐습니다!')
    dispatch(removeMyInfoData())
  }

  const onClickFollowList = (e: React.MouseEvent<HTMLDivElement>) => {
    if ((e.currentTarget.firstElementChild as HTMLElement).innerText === '팔로워') {
      setFollowType('followers')
    } else {
      setFollowType('followings')
    }
    setFollowOpened(true)
  }

  return (
    <Card sx={{ margin: 1, padding: "6px", boxShadow: "none !important" }}>
      <CardHeader 
        avatar={
          <Avatar 
            alt={nickname} 
            src={profileImg ? profileImg : defaultImg.src} 
            sx={{ backgroundColor: '#dbdbdb' }} 
          />
        }
        action={
          <IconButton onClick={handleClickMenu}>
            <MoreIcon />
            <Menu anchorEl={anchorEl} open={open} onClose={handleCloseMenu}>
              <MenuItem sx={{ fontSize: '14px' }} onClick={() => router.push(`/user/${myInfo.uid}`)}>
                프로필로 이동하기
              </MenuItem>
              <Divider />
              <MenuItem sx={{ fontSize: '14px' }} onClick={onLogoutClick}>
                로그아웃
              </MenuItem>
            </Menu>
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
        <FollowList 
          userInfo={myInfo}
          open={followOpened} 
          setFollowOpened={setFollowOpened} 
          followType={followType} 
        />
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
