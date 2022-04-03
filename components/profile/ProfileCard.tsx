import { FC, useEffect, useState } from "react";
import styled from "@emotion/styled";
import { Avatar, CardContent, Stack, Typography, useMediaQuery, useTheme } from "@mui/material";
import { doc, onSnapshot } from "firebase/firestore";
import { dbService } from "fireBaseApp/fBase";
import { useAppDispatch, useAppSelector } from "store/hooks";
import { setIsMyProfile } from "store/slices/profileSlice";
import defaultImg from "public/imgs/profileImg.png"
import FollowButton from "components/feeds/FollowButton";
import FollowList from "components/layout/FollowList";

const ProfileCard: FC = () => {
  const [followersCount, setFollowersCount] = useState(0)
  const [followingsCount, setFollowingsCount] = useState(0)
  const [followOpened, setFollowOpened] = useState(false)
  const [followType, setFollowType] = useState<"followers" | "followings">("followers")
  
  const theme = useTheme()
  const downMd = useMediaQuery(theme.breakpoints.down('md'))
  const dispatch = useAppDispatch()
  const myInfo = useAppSelector(state => state.users.myInfo)
  const { userData, isMyProfile } = useAppSelector(state => state.profile)

  const { uid, email, name, nickname, profileImg, feeds } = userData!

  const onClickFollowList = (e: React.MouseEvent<HTMLDivElement>) => {
    if ((e.currentTarget.firstElementChild as HTMLElement).innerText === '팔로워') {
      setFollowType('followers')
    } else {
      setFollowType('followings')
    }
    setFollowOpened(true)
  }

  useEffect(() => {
    if (myInfo && myInfo.uid === uid) // 내 정보와 프로필 유저가 같다면 isMyProfile 을 true
      dispatch(setIsMyProfile(true))
    else 
      dispatch(setIsMyProfile(false)) // 내 정보와 프로필 유저가 다르다면 isMyProfile 을 false
  }, [dispatch, myInfo, uid])

  useEffect(() => { // 실시간으로 사용자 정보를 받아옴
    const userDocRef = doc(dbService, `users/${uid}`)
    let unsub = onSnapshot(userDocRef, (doc) => {
      setFollowersCount((doc.data() as UserType).followersCount)
      setFollowingsCount((doc.data() as UserType).followingsCount)
    })
    return () => unsub()
  }, [uid])

  return (
    <Stack direction={downMd ? "column" : "row"}>
      <CardContent>
        <Avatar 
          alt={nickname} 
          src={profileImg ? profileImg : defaultImg.src} 
          sx={{ width: 200, height: 200, m: '0 auto' }} 
        />
      </CardContent>
      <ProfileContent>
        <ProfileHeader>
          <div>
            <Typography sx={{ fontFamily: 'Katuri', fontSize: 22 }}>{nickname} ({name})</Typography>
            <Typography>{email}</Typography>
          </div>
          {myInfo && myInfo.uid !== uid && <FollowButton userUid={uid} sx={{ position: 'absolute', top: 0, right: 0 }} />}
        </ProfileHeader>
        <CountContainer direction="row">
          <div>
            <Typography>게시글</Typography>
            <Typography>{feeds.length}</Typography>
          </div>
          <div onClick={onClickFollowList}>
            <Typography>팔로워</Typography>
            <Typography>{isMyProfile ? myInfo?.followersCount : followersCount}</Typography>
          </div>
          <div onClick={onClickFollowList}>
            <Typography>팔로잉</Typography>
            <Typography>{isMyProfile ? myInfo?.followingsCount : followingsCount}</Typography>
          </div>
        </CountContainer>
        {followOpened &&  <FollowList open={followOpened} setFollowOpened={setFollowOpened} followType={followType} />}
      </ProfileContent>
    </Stack>
  )
}

const ProfileHeader = styled.div`
  position: relative;
`
const ProfileContent = styled(CardContent)`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`
const CountContainer = styled(Stack)`
  text-align: center;
  margin-top: 8px;
  border-top: 1px solid #e5e5e5;
  & > div {
    flex-grow: 1;
    cursor: pointer;
    padding: 16px 0;
    border-right: 1px solid #e5e5e5;
  }
  & > div:last-child {
    border-right: none;
  }
`

export default ProfileCard