import { FC, useEffect, useState } from "react";
import Image from "next/image";
import styled from "@emotion/styled";
import { Avatar, Card, CardContent, CardHeader, Divider, Stack, Typography } from "@mui/material";
import defaultImg from "public/imgs/profileImg.png"
import EditMenu from "components/parts/EditMenu";
import formatDistanceToNowKo from "utils/formatDistanceToNowKo";
import { format } from "date-fns";

const images = [
  "https://img.siksinhot.com/place/1453703909205496.jpg?w=540&h=436&c=X",
  "https://img.siksinhot.com/place/1453703956080502.jpg?w=307&h=300&c=Y",
  "https://img.siksinhot.com/place/1453703984518506.jpg?w=307&h=300&c=Y",
  "https://img.siksinhot.com/place/1453703909204495.jpg?w=307&h=300&c=Y",
  "https://img.siksinhot.com/place/1453703956080502.jpg?w=307&h=300&c=Y",
  "https://img.siksinhot.com/place/1453703984518506.jpg?w=307&h=300&c=Y",
  "https://img.siksinhot.com/place/1453703909204495.jpg?w=307&h=300&c=Y",
  "https://img.siksinhot.com/place/1453703956080502.jpg?w=307&h=300&c=Y",
  "https://img.siksinhot.com/place/1453703984518506.jpg?w=307&h=300&c=Y",
  "https://img.siksinhot.com/place/1453703909204495.jpg?w=307&h=300&c=Y",
  "https://img.siksinhot.com/place/1453703956080502.jpg?w=307&h=300&c=Y",
]

const ImageWrapper = styled.div`
  height: 150px;
  width: 150px;
  background-color: #e9e9e9;
  & span {
    height: inherit !important;
    width: inherit !important;
    position: relative !important;
  }
`
const NicknameTypo = styled(Typography)`
  font-family: 'Katuri';
  color: #353535;
`

const RestaurantReview: FC<{reviewData: ReviewWithUserInfo}> = ({ reviewData }) => {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null)
  const [timeAgo, setTimeAgo] = useState<string>("0");
  const [date, setDate] = useState<string>('')
  
  const { reviewText, reviewImages, createdAt, modifiedAt, userUid, nickname, profileImg } = reviewData

  const handleClick = (event: React.MouseEvent<HTMLElement>) => setAnchorEl(event.currentTarget);
  const handleClose = () =>  setAnchorEl(null);

  const onEditComment = () => {}

  const onDeleteComment = async () => {}

  useEffect(() => {
    if (createdAt === modifiedAt) {
      setTimeAgo(`${formatDistanceToNowKo(createdAt)} 전`);
      setDate(format(createdAt, 'yyyy년 MM월 d일 H시 m분'))
    } else {
      setTimeAgo(`${formatDistanceToNowKo(modifiedAt)} 전 수정됨`);
      setDate(format(modifiedAt, 'yyyy년 MM월 d일 H시 m분'))
    }
  }, [createdAt, modifiedAt, setTimeAgo]);

  return (
    <>
      <Card sx={{ boxShadow: 'none' }}>
        <CardHeader 
          id="review-header"
          avatar={<Avatar alt={nickname} src={profileImg ? profileImg : defaultImg.src} />}
          title={<NicknameTypo>{nickname}</NicknameTypo>}
          subheader={<Typography variant="caption">{`${date} (${timeAgo})`}</Typography>}
          action={
            <EditMenu
              userUid={userUid}
              anchorEl={anchorEl}
              handleClick={handleClick}
              handleClose={handleClose}
              onEditContent={onEditComment}
              onDeleteContent={onDeleteComment}
            />
          }
        />
      </Card>
      <CardContent sx={{ pt: 0 }}>
        <Stack direction="row" spacing={1} sx={{ overflowX: 'scroll' }}>
          {reviewImages.map((img, i) => (
            <ImageWrapper key={i}>
              <Image alt="사진" src={img} layout="fill" objectFit="contain" />
            </ImageWrapper>
          ))}
        </Stack>
        {reviewImages[0] && <div style={{ height: '8px' }}></div>}
        <Typography variant="body2" sx={{ color: '#000' }}>
          {reviewText}
        </Typography>
      </CardContent>
      <Divider />
    </>
  )
}

export default RestaurantReview