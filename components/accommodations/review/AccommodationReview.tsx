import { FC, useEffect, useState } from "react";
import Image from "next/image";
import { Avatar, CardContent, CardHeader, Divider, Rating, Stack, Typography } from "@mui/material";
import styled from "@emotion/styled";
import { format } from "date-fns";
import formatDistanceToNowKo from "utils/functions/formatDistanceToNowKo";
import defaultImg from "public/imgs/profileImg.png"
import EditMenu from "components/parts/EditMenu";

const AccommodationReview: FC<{reviewData: RoomReviewWithUserInfo}> = ({ reviewData }) => {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null)
  const [timeAgo, setTimeAgo] = useState<string>("0");
  const [date, setDate] = useState<string>('')

  const { reviewText, reviewImages, rating, createdAt, modifiedAt, userUid, nickname, profileImg } = reviewData

  const handleClick = (event: React.MouseEvent<HTMLElement>) => setAnchorEl(event.currentTarget);
  const handleClose = () =>  setAnchorEl(null);

  const onEditReview = () => {}

  const onDeleteReview = async () => {}

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
    <ReviewCard>
      <CardHeader 
        id="accommodation-review-header"
        avatar={<Avatar alt={nickname} src={profileImg ? profileImg : defaultImg.src} />}
        title={<NicknameTypo>{nickname}</NicknameTypo>}
        subheader={<Typography variant="caption">{`${date} (${timeAgo})`}</Typography>}
        action={
          <EditMenu
            userUid={userUid}
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
          {reviewImages.map((img, i) => (
            <ImageWrapper key={i}>
              <Image alt="사진" src={img} layout="fill" objectFit="contain" />
            </ImageWrapper>
          ))}
        </Stack>
        {reviewImages[0] && <div style={{ height: '8px' }}></div>}
        <Stack direction="row" spacing={0.5} sx={{ alignItems: 'center' }}>
          <Rating value={rating} precision={0.1} readOnly />
          <span>({rating})</span>
        </Stack>
        <Typography variant="body2" sx={{ color: '#000' }}>
          {reviewText}
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