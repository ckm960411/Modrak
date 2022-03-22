import { NextPage } from "next";
import Head from "next/head";
import { Stack } from "@mui/material";
import CategoryBar from "components/accommodations/CategoryBar";
import ImageBanner from "components/accommodations/ImageBanner";
import AccommodationContainer from "components/accommodations/AccommodationContainer";

const Accommodation: NextPage = () => {
  return (
    <>
      <Head>
        <title>Accommodation | Modrak</title>
      </Head>
      <Stack spacing={2} sx={{ minWidth: '300px', maxWidth: '920px', m: '0 auto' }}>
        <CategoryBar />
        <ImageBanner />
        <AccommodationContainer />
      </Stack>
    </>
  )
}

export default Accommodation