import { FC, useEffect, useState } from "react";
import styled from "@emotion/styled";
import { Card, CardContent, CardHeader, Chip, IconButton, Rating, Stack, Typography } from "@mui/material";
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbUpOutlinedIcon from '@mui/icons-material/ThumbUpOutlined';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import BookmarkBorderOutlinedIcon from '@mui/icons-material/BookmarkBorderOutlined';
import { useAppDispatch, useAppSelector } from "store/hooks";
import { mainColor } from "styles/GlobalStyles";
import { onAddRecommendRestaurant } from "store/asyncFunctions/user/addRecommendRestaurant";
import { onAddBookmarkRestaurant, onRemoveBookmarkRestaurant, onRemoveRecommendRestaurant } from "store/asyncFunctions";
import MyCarousel from "components/parts/MyCarousel";
import Map from "components/parts/Map";

const RestaurantInfo: FC<{data: RestaurantWithId}> = ({ data }) => {
  const { id: restaurantId, name, subtitle, images, division, detailDivision, address, description, menu, rating, phoneNumber, workHours, breaktime, holiday, recommend, bookmark, category, detailCategory, tags } = data
  const [recommendCount, setRecommendCount] = useState(recommend)
  const [isRecommended, setIsRecommended] = useState(false)
  const [bookmarkCount, setBookmarkCount] = useState(bookmark)
  const [isBookmarked, setIsBookmarked] = useState(false)

  const dispatch = useAppDispatch()
  const myInfo = useAppSelector(state => state.users.myInfo)

  const toggleRecommendRestaurants = async () => {
    if (!myInfo) return
    if (!isRecommended) { // 추천하기
      dispatch(onAddRecommendRestaurant({ restaurantId, uid: myInfo.uid }))
      setRecommendCount(prev => prev +1)
      setIsRecommended(true)
    } else { // 추천 취소하기
      dispatch(onRemoveRecommendRestaurant({ restaurantId, uid: myInfo.uid }))
      setRecommendCount(prev => prev -1)
      setIsRecommended(false)
    }
  }

  const toggleBookmarkRestaurants = async () => {
    if (!myInfo) return
    if (!isBookmarked) { // 찜(북마크) 하기
      dispatch(onAddBookmarkRestaurant({ restaurantId, uid: myInfo.uid }))
      setBookmarkCount(prev => prev +1)
      setIsBookmarked(true)
    } else { // 찜(북마크) 취소하기
      dispatch(onRemoveBookmarkRestaurant({ restaurantId, uid: myInfo.uid }))
      setBookmarkCount(prev => prev -1)
      setIsBookmarked(false)
    }
  }

  useEffect(() => {
    if (!myInfo) return
    if (myInfo.recommendRestaurants.includes(restaurantId)) {
      setIsRecommended(true)
    } else {
      setIsRecommended(false)
    }
    if (myInfo.bookmarkRestaurants.includes(restaurantId)) {
      setIsBookmarked(true)
    } else {
      setIsBookmarked(false)
    }
  }, [myInfo, restaurantId])

  return (
    <Card raised>
      <CardHeader 
        title={<Typography variant="h5" component="span" sx={{ fontFamily: 'Katuri', color: mainColor }}>{name}</Typography>}
        subheader={
          <div>
            <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
              <Rating name={name} defaultValue={rating} precision={0.1} readOnly />
              <Typography component="span">{data.rating}</Typography>
            </Stack>
            <Typography sx={{ color: '#555', mt: 1 }}>{subtitle}</Typography>
            <Stack direction="row" spacing={1}>
              {tags.map((tag, i) => <Chip key={i} label={tag} id="restaurant-tag" />)}
            </Stack>
          </div>
        }
        action={
          <Stack direction="row" sx={{ mr: 1, alignItems: 'center' }}>
            <IconButton onClick={toggleRecommendRestaurants}>
              {isRecommended ? <ThumbUpIcon sx={{ color: mainColor }} /> : <ThumbUpOutlinedIcon sx={{ color: '#555' }} />}
            </IconButton>
            <Typography sx={{ color: '#555' }}>{recommendCount}</Typography>
            <IconButton onClick={toggleBookmarkRestaurants}>
              {isBookmarked ? <BookmarkIcon sx={{ color: mainColor }} /> : <BookmarkBorderOutlinedIcon sx={{ color: '#555' }} />}
            </IconButton>
            <Typography sx={{ color: '#555' }}>{bookmarkCount}</Typography>
          </Stack>
        }
        sx={{ pb: 0 }}
      />
      <CardContent>
        <MyCarousel imgsArray={images} autoplay={false} />
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
            <DescHeader>영업시간</DescHeader>
            <Description>{workHours}</Description>
            {breaktime && <Description>브레이크타임 {breaktime}</Description>}
          </DescContainer>
          <DescContainer spacing={0.5}>
            <DescHeader>휴무일</DescHeader>
            <Description>{holiday}</Description>
          </DescContainer>
          <DescContainer spacing={0.5}>
            <DescHeader>주소</DescHeader>
            <Description>{address}</Description>
          </DescContainer>
        </div>
        <Map address={address} />
      </CardContent>
    </Card>
  )
}

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

export default RestaurantInfo