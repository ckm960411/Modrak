import { FC } from "react";
import styled from "@emotion/styled";
import { IconButton, Typography } from "@mui/material";
import SettingsIcon from '@mui/icons-material/Settings';
import FollowButton from "components/feeds/FollowButton";
import { useAppSelector } from "store/hooks";

const ProfileHeader: FC = () => {
  const myInfo = useAppSelector(state => state.users.myInfo)
  const { userData } = useAppSelector(state => state.profile)
  const { uid, email, name, nickname } = userData!

  return (
    <Section>
      <div>
        <ProfileTitle>
          <Typography sx={{ fontFamily: 'Katuri', fontSize: 22 }}>{nickname} ({name})</Typography>
          <IconButton>
            <SettingsIcon />
          </IconButton>
        </ProfileTitle>
        <Typography>{email}</Typography>
      </div>
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