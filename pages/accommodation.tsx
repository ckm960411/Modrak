import { NextPage } from "next";
import Head from "next/head";
import { Stack, useMediaQuery, useTheme } from "@mui/material";
import CategoryBar from "components/accommodations/CategoryBar";
import ImageBanner from "components/accommodations/ImageBanner";
import AccommodationContainer from "components/accommodations/AccommodationContainer";
import AccommodationTagbar from "components/accommodations/AccommodationTagbar";
import bgimg from "public/imgs/accommodation-bgimg.png"
import { Container, HeaderBg } from "./restaurant";

const Accommodation: NextPage = () => {
  const theme = useTheme()
  const downMd = useMediaQuery(theme.breakpoints.down('md'))

  return (
    <>
      <Head>
        <title>Accommodation | Modrak</title>
      </Head>
      <HeaderBg downMd={downMd} src={bgimg.src} />
      <Container spacing={2} downMd={downMd}>
        <CategoryBar />
        <ImageBanner />
        <AccommodationTagbar />
        <AccommodationContainer />
      </Container>
    </>
  )
}

export default Accommodation