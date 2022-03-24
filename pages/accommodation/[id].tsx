import { FC, useEffect } from "react";
import { useAppDispatch } from "store/hooks";
import { addRoomInfo } from "store/roomsSlice";
import { getAccommodationById } from "utils/getAccommodationById";
import { getAllAccommodationsId } from "utils/getAllAccommodationsId";
import RoomInfoHeader from "roomDetail/header/RoomInfoHeader";
import AccommodationTabs from "roomDetail/body/AccommodationTabs";

const AccommodationDetail: FC<{data: AccommodationWithId}> = ({ data }) => {
  const dispatch = useAppDispatch()

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

export const getStaticProps = async({ params }: { params: {id: string}}) => {
  const data = await getAccommodationById(params.id)
  return {
    props: {
      data
    }
  }
}

export default AccommodationDetail