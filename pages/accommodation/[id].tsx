import { FC, useEffect } from "react";
import { useAppDispatch } from "store/hooks";
import { addRoomInfo } from "store/slices/roomsSlice";
import wrapper from "store/configureStore";
import { getAccommodationById } from "utils/SSRFunctions/getAccommodationById";
import { getAllAccommodationsId } from "utils/SSRFunctions/getAllAccommodationsId";
import useLoadingUserInfo from "utils/hooks/useLoadingUserInfo";
import RoomInfoHeader from "@roomDetail/header/RoomInfoHeader";
import AccommodationTabs from "@roomDetail/body/AccommodationTabs";

const AccommodationDetail: FC<{data: AccommodationWithId}> = ({ data }) => {
  const dispatch = useAppDispatch()
  useLoadingUserInfo() // 로그인시 로그인상태 유지

  useEffect(() => {
    dispatch(addRoomInfo(data))
  }, [data, dispatch])

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