import { FC, useState } from "react";
import Image from "next/image";
import styled from "@emotion/styled";
import { Avatar, Card, CardContent, CardHeader, Divider, Stack, Typography } from "@mui/material";
import defaultImg from "public/imgs/profileImg.png"
import EditMenu from "components/parts/EditMenu";

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

const RestaurantReview: FC = () => {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null)

  const handleClick = (event: React.MouseEvent<HTMLElement>) => setAnchorEl(event.currentTarget);
  const handleClose = () =>  setAnchorEl(null);

  const onEditComment = () => {}

  const onDeleteComment = async () => {}

  return (
    <>
      <Card sx={{ boxShadow: 'none' }}>
        <CardHeader 
          id="review-header"
          avatar={<Avatar alt="닉네임" src={defaultImg.src} />}
          title={<NicknameTypo>닉네임</NicknameTypo>}
          subheader={<Typography variant="caption">2022년 3월 20일 11시 51분 (0초 전)</Typography>}
          action={
            <EditMenu
              userUid="유저uid"
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
          {images.map((img, i) => (
            <ImageWrapper key={i}>
              <Image alt="사진" src={img} layout="fill" objectFit="contain" />
            </ImageWrapper>
          ))}
        </Stack>
        <Typography variant="body2" sx={{ color: '#000' }}>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorem porro a consequuntur quos laudantium rerum, veritatis reiciendis debitis ipsam accusamus.
        </Typography>
      </CardContent>
      <Divider />
    </>
  )
}

export default RestaurantReview