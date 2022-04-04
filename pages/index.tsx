import type { NextPage } from 'next'
import Head from 'next/head'
import styled from '@emotion/styled'
import MainBanner from 'components/home/MainBanner'
import HomeRestaurantCards from 'components/home/HomeRestaurantCards'
import HomeAccommodationCards from 'components/home/HomeAccommodationCards'


const Home: NextPage = () => {


  return (
    <>
      <Head>
        <title>모드락 Modrak</title>
      </Head>
      <Section>
        <MainBanner />
        <HomeRestaurantCards />
        <HomeAccommodationCards />
      </Section>
    </>
  )
}

const Section = styled.section`
  min-width: 340px;
  max-width: 920px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 32px;
  margin-bottom: 32px;
`

export default Home
