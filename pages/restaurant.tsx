import { NextPage } from "next";
import Head from "next/head";
import { Stack, useTheme, useMediaQuery } from "@mui/material";
import FoodBanner from "components/restaurant/FoodBanner";
import FoodListContainer from "components/restaurant/FoodListContainer";
import CategoryBar from "components/restaurant/CategoryBar";
import FoodTagbar from "components/restaurant/FoodTagbar";
import bgimg from 'public/imgs/restaurant-bgimg.png'
import styled from "@emotion/styled";

const Restaurant: NextPage = () => {
  const theme = useTheme()
  const downMd = useMediaQuery(theme.breakpoints.down('md'))

  return (
    <>
      <Head>
        <title>Restaurant | Modrak</title>
      </Head>
      <HeaderBg downMd={downMd} src={bgimg.src}>
        <div />
      </HeaderBg>
      <Container spacing={2} downMd={downMd}>
        <CategoryBar />
        <FoodBanner />
        <FoodTagbar />
        <FoodListContainer />
      </Container>
    </>
  )
}

export const HeaderBg = styled.div<{downMd: boolean, src: string}>`
width: 100%;
height: ${props => props.downMd ? "300px" : "400px"};
  position: absolute;
  top: 0; left: 0;
  background-image: ${props => `url(${props.src})`};
  background-position: center;
  background-repeat: no-repeat;
  background-size: 100%;
  & > div {
    width: 100%;
    height: 100%;
    background-color: #000;
    opacity: .2;
  }
`
export const Container = styled(Stack)<{downMd: boolean}>`
  min-width: 300px;
  max-width: 920px;
  margin: 0 auto;
  margin-top: ${props => props.downMd ? "150px" : "240px"};
`

export default Restaurant