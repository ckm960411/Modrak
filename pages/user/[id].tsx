import { FC, useState } from "react";
import styled from "@emotion/styled";
import { useAppSelector } from "store/hooks";
import getAllUsersId from "utils/SSRFunctions/getAllUsersId";
import getUserInfoById from "utils/SSRFunctions/getUserInfoById";
import ProfileCard from "components/profile/ProfileCard";
import ProfileTabs from "components/profile/ProfileTabs";

const Profile: FC<{userData: UserType}> = ({ userData }) => {
  const [isMyProfile, setIsMyProfile] = useState(false)
  const myInfo = useAppSelector(state => state.users.myInfo)
  const { uid, email, name, nickname, profileImg, feeds } = userData

  return (
    <Section>
      <ProfileCard myInfo={myInfo} userData={userData} isMyProfile={isMyProfile} setIsMyProfile={setIsMyProfile} />
      <ProfileTabs />
    </Section>
  )
}

const Section = styled.section`
  max-width: 920px;
  min-width: 340px;
  margin: 0 auto;
`

export const getStaticPaths = async () => {
  const paths = await getAllUsersId()
  return {
    paths,
    fallback: false
  }
}

export const getStaticProps = async ({ params }: { params: { id: string } }) => {
  const userData = await getUserInfoById(params.id)
  return {
    props: {
      userData
    }
  }
}

export default Profile