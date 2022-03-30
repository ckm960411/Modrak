import { Dispatch, FC, SetStateAction, useEffect, useState } from "react";
import styled from "@emotion/styled";
import { Avatar, CardContent, Stack, Typography, useMediaQuery, useTheme } from "@mui/material";
import { doc, onSnapshot } from "firebase/firestore";
import { dbService } from "fireBaseApp/fBase";
import defaultImg from "public/imgs/profileImg.png"
import FollowButton from "components/feeds/FollowButton";

interface ProfileCardProps {
  myInfo: UserType | null
  userData: UserType
  isMyProfile: boolean
  setIsMyProfile: Dispatch<SetStateAction<boolean>>
}
const ProfileCard: FC<ProfileCardProps> = ({ myInfo, userData, isMyProfile, setIsMyProfile }) => {
  const [followersCount, setFollowersCount] = useState(0)
  const [followingsCount, setFollowingsCount] = useState(0)
  const theme = useTheme()
  const downMd = useMediaQuery(theme.breakpoints.down('md'))
  const { uid, email, name, nickname, profileImg, feeds } = userData

  useEffect(() => {
    if (!myInfo || myInfo.uid !== userData.uid) return setIsMyProfile(false)
    setIsMyProfile(true)
  }, [myInfo, userData, setIsMyProfile])

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
          <div>
            <Typography>팔로워</Typography>
            <Typography>{isMyProfile ? myInfo?.followersCount : followersCount}</Typography>
          </div>
          <div>
            <Typography>팔로잉</Typography>
            <Typography>{isMyProfile ? myInfo?.followingsCount : followingsCount}</Typography>
          </div>
        </CountContainer>
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