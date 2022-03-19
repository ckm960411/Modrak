import { FC } from "react";
import { Card, CardContent, Rating, Stack, Typography } from "@mui/material";
import ThumbUpOutlinedIcon from '@mui/icons-material/ThumbUpOutlined';
import BookmarkBorderOutlinedIcon from '@mui/icons-material/BookmarkBorderOutlined';
import MyCarousel from "components/parts/MyCarousel";
import styled from "@emotion/styled";

const DescContainer = styled(Stack)`
  margin-top: 8px;
  margin-bottom: 16px;
`
const DescHeader = styled(Typography)`
  font-weight: 600;
`
const Description = styled(Typography)`
  font-size: 14px;
`

const RestaurantInfo: FC<{data: RestaurantType}> = ({ data }) => {
  const { name, subtitle, images, division, detailDivision, address, description, menu, rating, phoneNumber, workHours, breaktime, holiday, recommend, bookmark, category, detailCategory, tags } = data

  return (
    <Card raised>
      <CardContent>
        <Stack spacing={2}>
          <div>
            <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
              <Typography variant="h5" component="span" sx={{ fontFamily: 'Katuri' }}>{name}</Typography>
              <Rating name={name} defaultValue={rating} precision={0.1} readOnly />
              <Typography component="span">{data.rating}</Typography>
            </Stack>
            <Typography sx={{ color: '#555', mt: 1 }}>{subtitle}</Typography>
            <Stack direction="row" spacing={1}>
              <ThumbUpOutlinedIcon fontSize="small" sx={{ color: '#555' }} />
              <Typography variant="subtitle2" sx={{ color: '#555' }}>{recommend}</Typography>
              <BookmarkBorderOutlinedIcon fontSize="small" sx={{ color: '#555' }} />
              <Typography variant="subtitle2" sx={{ color: '#555' }}>{bookmark}</Typography>
            </Stack>
          </div>
          <MyCarousel imgsArray={images} autoplay={false} />
        </Stack>
        <div>
          <DescContainer spacing={0.5}>
            <DescHeader>지역</DescHeader>
            <Description>{division} &gt; {detailDivision}</Description>
          </DescContainer>
          <DescContainer spacing={0.5}>
            <DescHeader>업종</DescHeader>
            <Description>{category} &gt; {detailCategory}</Description>
          </DescContainer>
          <DescContainer spacing={0.5}>
            <DescHeader>주요메뉴</DescHeader>
            <Stack direction="row" spacing={1}>
              {menu.map((v, i) => <Description key={i}>{v}</Description>)}
            </Stack>
          </DescContainer>
          <DescContainer spacing={0.5}>
            <DescHeader>매장소개</DescHeader>
            <Description>{description}</Description>
          </DescContainer>
          <DescContainer spacing={0.5}>
            <DescHeader>전화번호</DescHeader>
            <Description>{phoneNumber}</Description>
          </DescContainer>
          <DescContainer spacing={0.5}>
            <DescHeader>주소</DescHeader>
            <Description>{address}</Description>
          </DescContainer>
          <DescContainer spacing={0.5}>
            <DescHeader>영업시간</DescHeader>
            <Description>{workHours}</Description>
            {breaktime && <Description>브레이크타임 {breaktime}</Description>}
          </DescContainer>
          <DescContainer spacing={0.5}>
            <DescHeader>휴무일</DescHeader>
            <Description>{holiday}</Description>
          </DescContainer>
        </div>
      </CardContent>
    </Card>
  )
}

export default RestaurantInfo