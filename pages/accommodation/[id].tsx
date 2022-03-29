import { FC, useEffect } from "react";
import { browserSessionPersistence, onAuthStateChanged, setPersistence } from "firebase/auth";
import { authService } from "fireBaseApp/fBase";
import { useAppDispatch } from "store/hooks";
import { addRoomInfo } from "store/slices/roomsSlice";
import wrapper from "store/configureStore";
import { loadMyInfoData } from "store/slices/usersSlice";
import searchFirestoreDoc from "utils/functions/searchFirestoreDoc";
import { getAccommodationById } from "utils/SSRFunctions/getAccommodationById";
import { getAllAccommodationsId } from "utils/SSRFunctions/getAllAccommodationsId";
import RoomInfoHeader from "@roomDetail/header/RoomInfoHeader";
import AccommodationTabs from "@roomDetail/body/AccommodationTabs";

const AccommodationDetail: FC<{data: AccommodationWithId}> = ({ data }) => {
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(addRoomInfo(data))
  }, [data, dispatch])

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
    <div style={{ minWidth: '300px', maxWidth: '920px', margin: '0 auto' }}>
      <RoomInfoHeader />
      <AccommodationTabs />
    </div>
  )
}

export const getStaticPaths = async () => {
  const paths = await getAllAccommodationsId()
  return {
    paths,
    fallback: false
  }
}

export const getStaticProps = wrapper.getStaticProps((store) => async ({ params }) => {
  const data = await getAccommodationById(params!.id as string)
  store.dispatch(addRoomInfo(data))
  return { props: { data }}
})

export default AccommodationDetail