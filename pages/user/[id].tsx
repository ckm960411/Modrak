import { FC, useEffect } from "react";
import styled from "@emotion/styled";
import { useAppDispatch } from "store/hooks";
import wrapper from "store/configureStore";
import { setUserData } from "store/slices/profileSlice";
import getAllUsersId from "utils/SSRFunctions/getAllUsersId";
import getUserInfoById from "utils/SSRFunctions/getUserInfoById";
import useLoadingUserInfo from "utils/hooks/useLoadingUserInfo";
import ProfileCard from "components/profile/ProfileCard";
import ProfileTabs from "components/profile/ProfileTabs";
import { clearFeeds } from "store/slices/feedsSlice";

const Profile: FC<{userData: UserType}> = ({ userData }) => {
  const dispatch = useAppDispatch()
  useLoadingUserInfo() // 로그인시 로그인상태 유지

  useEffect(() => {
    dispatch(setUserData(userData))
    return () => {
      dispatch(clearFeeds())
    }
  }, [dispatch, userData])

  return (
    <Section>
      <ProfileCard />
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

export const getStaticProps = wrapper.getStaticProps((store) => async ({ params }) => {
  const userData = await getUserInfoById(params!.id as string)
  store.dispatch(setUserData(userData))
  return {
    props: { userData }
  }
})

export default Profile