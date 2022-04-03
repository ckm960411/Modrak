import { FC } from "react";
import styled from "@emotion/styled";
import { CardContent, Stack, useMediaQuery, useTheme } from "@mui/material";
import ProfileImg from "components/profile/card/ProfileImg";
import ProfileHeader from "components/profile/card/ProfileHeader";
import CountContainer from "components/profile/card/CountContainer";

const ProfileCard: FC = () => {
  const theme = useTheme()
  const downMd = useMediaQuery(theme.breakpoints.down('md'))

  return (
    <Stack direction={downMd ? "column" : "row"}>
      <ProfileImg />
      <ProfileContent>
        <ProfileHeader />
        <CountContainer />
      </ProfileContent>
    </Stack>
  )
}

const ProfileContent = styled(CardContent)`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`

export default ProfileCard