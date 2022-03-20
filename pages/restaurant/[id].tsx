import { FC } from "react";
import { GetStaticPaths } from "next";
import { Stack } from "@mui/material";
import { getRestaurantDataById } from "utils/getRestaurantDataById";
import { getAllRestaurantsId } from "utils/getAllRestaurantsId";
import RestaurantInfo from "components/restaurant/RestaurantInfo";
import RestaurantReview from "components/restaurant/RestaurantReview";

const RestaurantDetail: FC<{data: RestaurantType}> = ({ data }) => {

  return (
    <Stack spacing={2} sx={{ minWidth: '340px', maxWidth: '920px', m: '0 auto', pb: 6 }}>
      <RestaurantInfo data={data} />
      <RestaurantReview />
    </Stack>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = await getAllRestaurantsId()
  return {
    paths,
    fallback: false
  }
}

export const getStaticProps = async ({ params }:  { params: {id: string} }) => {
  const data = await getRestaurantDataById(params.id)
  return {
    props: {
      data
    }
  }
}

export default RestaurantDetail