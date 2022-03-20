import { Stack } from "@mui/material";
import FoodBanner from "components/restaurant/FoodBanner";
import FoodListContainer from "components/restaurant/FoodListContainer";
import CategoryBar from "components/restaurant/CategoryBar";
import FoodTagbar from "components/restaurant/FoodTagbar";
import { NextPage } from "next";
import Head from "next/head";
import { getAllRestaurantsData } from "utils/getAllRestaurantsData";

const Restaurant: NextPage<{ restaurantsData: RestaurantWithId[] }> = ({ restaurantsData }) => {
  console.log(restaurantsData)

  return (
    <>
      <Head>
        <title>Restaurant | Modrak</title>
      </Head>
      <Stack spacing={2} sx={{ minWidth: '300px', maxWidth: '920px', m: '0 auto' }}>
        <CategoryBar />
        <FoodBanner />
        <FoodTagbar />
        <FoodListContainer restaurantsData={restaurantsData} />
      </Stack>
    </>
  )
}

export const getStaticProps = async () => {
  const restaurantsData = await getAllRestaurantsData()
  return {
    props: { restaurantsData }
  }
}

export default Restaurant