import { FC, useState } from "react";
import { Avatar, CardContent, CardHeader, Divider, Rating, Stack, Typography } from "@mui/material";
import defaultImg from "public/imgs/profileImg.png"
import EditMenu from "components/parts/EditMenu";
import styled from "@emotion/styled";
import Image from "next/image";

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

const AccommodationReview: FC = () => {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null)

  const handleClick = (event: React.MouseEvent<HTMLElement>) => setAnchorEl(event.currentTarget);
  const handleClose = () =>  setAnchorEl(null);

  const onEditReview = () => {}

  const onDeleteReview = async () => {}

  return (
    <ReviewCard>
      <CardHeader 
        id="accommodation-review-header"
        avatar={<Avatar alt="닉네임" src={defaultImg.src} />}
        title={<NicknameTypo>닉네임</NicknameTypo>}
        subheader={<Typography variant="caption">2022년 3월 26일 06시 44분 (0초 전)</Typography>}
        action={
          <EditMenu
            userUid="유저uid"
            anchorEl={anchorEl}
            handleClick={handleClick}
            handleClose={handleClose}
            onEditContent={onEditReview}
            onDeleteContent={onDeleteReview}
          />
        }
        sx={{ px: 0 }}
      />
      <CardContent sx={{ pt: 0, px: 0 }}>
        <Stack direction="row" spacing={1} sx={{ overflowX: 'scroll' }}>
          {images.map((img, i) => (
            <ImageWrapper key={i}>
              <Image alt="사진" src={img} layout="fill" objectFit="contain" />
            </ImageWrapper>
          ))}
        </Stack>
        {images[0] && <div style={{ height: '8px' }}></div>}
        <Stack direction="row" spacing={0.5} sx={{ alignItems: 'center' }}>
          <Rating value={5} precision={0.1} readOnly />
          <span>({5})</span>
        </Stack>
        <Typography variant="body2" sx={{ color: '#000' }}>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorem porro a consequuntur quos laudantium rerum, veritatis reiciendis debitis ipsam accusamus.
        </Typography>
      </CardContent>
      <Divider />
    </ReviewCard>
  )
}

const ReviewCard = styled.div`
  margin-top: 8px;
`
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

export default AccommodationReview