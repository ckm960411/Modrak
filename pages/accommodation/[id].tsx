import { FC } from "react";
import { getAccommodationById } from "utils/getAccommodationById";
import { getAllAccommodationsId } from "utils/getAllAccommodationsId";

const AccommodationDetail: FC<{data: AccommodationWithId}> = ({ data }) => {
  return (
    <div>
      {data.name}
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