import { Stack } from "@mui/material";
import FoodBanner from "components/restaurant/banner/FoodBanner";
import FoodListContainer from "components/restaurant/cardContainer/FoodListContainer";
import CategoryBar from "components/restaurant/category/CategoryBar";
import { NextPage } from "next";
import Head from "next/head";

const Restaurant: NextPage = () => {
  return (
    <>
      <Head>
        <title>Restaurant | Modrak</title>
      </Head>
      <Stack spacing={2} sx={{ minWidth: '300px', maxWidth: '920px', m: '0 auto' }}>
        <CategoryBar />
        <FoodBanner />
        <FoodListContainer />
      </Stack>
    </>
  )
}

export default Restaurant