import { GetStaticPaths, GetStaticProps } from "next";
import { FC } from "react";
import { getRestaurantData } from "utils/getRestaurantData";
import { getRestaurantsData } from "utils/getRestaurantsData";

const RestaurantDetail: FC<{data: RestaurantType}> = ({ data }) => {
  return (
    <>
      {data.title}
    </>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = await getRestaurantsData()
  return {
    paths,
    fallback: false
  }
}

export const getStaticProps = async ({ params }:  { params: {id: string} }) => {
  const data = await getRestaurantData(params.id)
  return {
    props: {
      data
    }
  }
}

export default RestaurantDetail