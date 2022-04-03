import { FC, useMemo, useState } from "react";
import styled from "@emotion/styled";
import { IconButton, Typography } from "@mui/material";
import SettingsIcon from '@mui/icons-material/Settings';
import FollowButton from "components/feeds/FollowButton";
import { useAppSelector } from "store/hooks";
import EditProfile from "components/profile/card/EditProfile";

const ProfileHeader: FC = () => {
  const [editingProfile, setEditingProfile] = useState(false)

  const myInfo = useAppSelector(state => state.users.myInfo)
  const { userData } = useAppSelector(state => state.profile)
  const { uid, email, name, nickname } = userData!

  const isMyProfile = useMemo(() => { // 내 정보와 프로필 유저가 같다면 isMyProfile 을 true
    if (myInfo && myInfo.uid === uid) return true
    else false
  }, [myInfo, uid])

  const handleEditProfile = () => { 
    if (!isMyProfile) return alert('회원님의 계정이 아니면 수정할 수 없습니다!')
    setEditingProfile(true)
  }

  return (
    <Section>
      <div>
        <ProfileTitle>
          <Typography sx={{ fontFamily: 'Katuri', fontSize: 22 }}>{nickname} ({name})</Typography>
          {isMyProfile && (
            <IconButton onClick={handleEditProfile}>
              <SettingsIcon />
            </IconButton>
          )}
        </ProfileTitle>
        <Typography>{email}</Typography>
      </div>
      {editingProfile && <EditProfile editing={editingProfile} setEditing={setEditingProfile} />}
      {myInfo && myInfo.uid !== uid && <FollowButton userUid={uid} sx={{ position: 'absolute', top: 0, right: 0 }} />}
    </Section>
  )
}

const Section = styled.div`
  position: relative;
`
const ProfileTitle = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`

export default ProfileHeader