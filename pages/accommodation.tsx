import { NextPage } from "next";
import Head from "next/head";
import { useMediaQuery, useTheme } from "@mui/material";
import CategoryBar from "components/accommodations/CategoryBar";
import ImageBanner from "components/accommodations/ImageBanner";
import AccommodationContainer from "components/accommodations/AccommodationContainer";
import AccommodationTagbar from "components/accommodations/AccommodationTagbar";
import bgimg from "public/imgs/accommodation-bgimg.png"
import styled from "@emotion/styled";

const Accommodation: NextPage = () => {
  const theme = useTheme()
  const downMd = useMediaQuery(theme.breakpoints.down('md'))

  return (
    <>
      <Head>
        <title>Accommodation | Modrak</title>
      </Head>
      <HeaderBg downMd={downMd} src={bgimg.src} />
      <Container downMd={downMd}>
        <CategoryBar />
        <ImageBanner />
        <AccommodationTagbar />
        <AccommodationContainer />
      </Container>
    </>
  )
}

const HeaderBg = styled.div<{downMd: boolean, src: string}>`
  width: 100%;
  height: ${props => props.downMd ? "300px" : "400px"};
  position: absolute;
  top: 0; left: 0;
  background-image: ${props => `url(${props.src})`};
  background-position: center;
  background-repeat: no-repeat;
  background-size: 100%;
`
const Container = styled.div<{downMd: boolean}>`
  display: flex;
  flex-direction: column;
  gap: 16px;
  min-width: 300px;
  max-width: 920px;
  margin: 0 auto;
  margin-top: ${props => props.downMd ? "150px" : "240px"};
`

export default Accommodation