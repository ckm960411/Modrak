import { FC, useEffect } from "react";
import styled from "@emotion/styled";
import { browserSessionPersistence, onAuthStateChanged, setPersistence } from "firebase/auth";
import { authService } from "fireBaseApp/fBase";
import { useAppDispatch } from "store/hooks";
import wrapper from "store/configureStore";
import { setUserData } from "store/slices/profileSlice";
import { loadMyInfoData } from "store/slices/usersSlice";
import searchFirestoreDoc from "utils/functions/searchFirestoreDoc";
import getAllUsersId from "utils/SSRFunctions/getAllUsersId";
import getUserInfoById from "utils/SSRFunctions/getUserInfoById";
import ProfileCard from "components/profile/ProfileCard";
import ProfileTabs from "components/profile/ProfileTabs";

const Profile: FC<{userData: UserType}> = ({ userData }) => {
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(setUserData(userData))
  }, [dispatch, userData])

  const onLoadUserData = async (uid: string) => {
    const { searchedData: userData } = await searchFirestoreDoc(`users/${uid}`)
    dispatch(loadMyInfoData(userData))
  }

  useEffect(() => {
    setPersistence(authService, browserSessionPersistence)
    onAuthStateChanged(authService, user => {
      if (user) return onLoadUserData(user.uid)
      else return
    })
  }, [])

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