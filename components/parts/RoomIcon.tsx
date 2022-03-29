import { FC } from "react";
import { Typography } from "@mui/material";
import styled from "@emotion/styled";

const icons: {
  [key: string]: string
} = {
  '노래방': "https://dffoxz5he03rp.cloudfront.net/icons/ic_sing_28x28_gray_700.svg",
  '레스토랑': "https://dffoxz5he03rp.cloudfront.net/icons/ic_restaurant_28x28_gray_700.svg",
  '매점/편의점': "https://dffoxz5he03rp.cloudfront.net/icons/ic_store_28x28_gray_700.svg",
  '수영장': "https://dffoxz5he03rp.cloudfront.net/icons/ic_pool_28x28_gray_700.svg",
  '워터파크': "https://dffoxz5he03rp.cloudfront.net/icons/ic_pool_28x28_gray_700.svg",
  '유아시설': "https://dffoxz5he03rp.cloudfront.net/icons/ic_teddybear_28x28_gray_700.svg",
  '키즈플레이룸': "https://dffoxz5he03rp.cloudfront.net/icons/ic_teddybear_28x28_gray_700.svg",
  '카페': "https://dffoxz5he03rp.cloudfront.net/icons/ic_cafe_28x28_gray_700.svg",
  '피트니스': "https://dffoxz5he03rp.cloudfront.net/icons/ic_gym_28x28_gray_700.svg",
  '금연': "https://dffoxz5he03rp.cloudfront.net/icons/ic_nosmoking_28x28_gray_700.svg",
  '라운지': "https://dffoxz5he03rp.cloudfront.net/icons/ic_cocktail_28x28_gray_700.svg",
  '장애인': "https://dffoxz5he03rp.cloudfront.net/icons/ic_wheelchair_28x28_gray_700.svg",
  '짐보관': "https://dffoxz5he03rp.cloudfront.net/icons/ic_baggage_28x28_gray_700.svg",
  'wifi': "https://dffoxz5he03rp.cloudfront.net/icons/ic_wifi_28x28_gray_700.svg",
  '주차가능': "https://dffoxz5he03rp.cloudfront.net/icons/ic_parking_28x28_gray_700.svg",
  '무료주차': "https://dffoxz5he03rp.cloudfront.net/icons/ic_parking_28x28_gray_700.svg",
  '조식서비스': "https://dffoxz5he03rp.cloudfront.net/icons/ic_breakfast_28x28_gray700.svg",
  '루프탑': "https://dffoxz5he03rp.cloudfront.net/icons/ic_rooftop_28x28_gray_700.svg",
  '취사가능': "https://dffoxz5he03rp.cloudfront.net/icons/ic_kitchen_28x28_gray_700.svg",
  '비즈니스센터': "https://dffoxz5he03rp.cloudfront.net/icons/ic_businessbag_28x28_gray_700.svg",
  '세미나실': "https://dffoxz5he03rp.cloudfront.net/icons/ic_seminar_28x28_gray_700.svg",
  '바베큐장': "https://dffoxz5he03rp.cloudfront.net/icons/ic_bbq_28x28_gray_700.svg",
  '마사지': 'https://dffoxz5he03rp.cloudfront.net/icons/ic_massage_28x28_gray_700.svg',
  '사우나': 'https://dffoxz5he03rp.cloudfront.net/icons/ic_sauna_28x28_gray_700.svg',
  '공용스파': 'https://dffoxz5he03rp.cloudfront.net/icons/ic_bathroom_28x28_gray_700.svg',
  '공항 셔틀': 'https://dffoxz5he03rp.cloudfront.net/icons/ic_pickup_28x28_gray_700.svg',
  '스파/월풀': 'https://dffoxz5he03rp.cloudfront.net/icons/ic_bathroom_28x28_gray_700.svg',
}

const RoomIcon: FC<{icon: string}> = ({ icon }) => {
  return (
    <>
      <IconContainer>
        <img alt={icon} src={icons[`${icon}`]} style={{ width: '30px' }} />
        <Typography sx={{ fontSize: '14px' }}>{icon}</Typography>
      </IconContainer>
    </>
  )
}

const IconContainer = styled.div`
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 80px;
  height: 80px;
`

export default RoomIcon