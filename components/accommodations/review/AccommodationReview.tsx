import { FC, useState } from "react";
import Image from "next/image";
import { Avatar, CardContent, CardHeader, Divider, Rating, Stack, Typography } from "@mui/material";
import styled from "@emotion/styled";
import { useAppDispatch } from "store/hooks";
import { showAlert } from "store/slices/appSlice";
import { onDeleteRoomReview } from "store/asyncFunctions";
import useSetTimeDistance from "utils/hooks/useSetTimeDistance";
import defaultImg from "public/imgs/profileImg.png"
import EditMenu from "components/parts/EditMenu";
import AccommodationEditReviewForm from "components/accommodations/review/AccommodationEditReviewForm";

const AccommodationReview: FC<{reviewData: RoomReviewWithUserInfo}> = ({ reviewData }) => {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null)
  const [editing, setEditing] = useState(false)

  const dispatch = useAppDispatch()
  const { accommodationId, reviewId, reviewText, reviewImages, rating, createdAt, modifiedAt, userUid, nickname, profileImg } = reviewData
  const { date, timeAgo } = useSetTimeDistance(createdAt, modifiedAt)

  const handleClick = (event: React.MouseEvent<HTMLElement>) => setAnchorEl(event.currentTarget);
  const handleClose = () =>  setAnchorEl(null);

  const handleEditReview = () => {
    setEditing(true)
    handleClose()
  }

  const handleDeleteReview = async () => {
    const ok = window.confirm('이 리뷰를 정말 삭제하시겠습니까?')
    if (!ok) return handleClose()
    dispatch(onDeleteRoomReview({ accommodationId, reviewId }))
      .then(() => dispatch(showAlert({ isShown: true, message: "리뷰가 정상적으로 삭제되었습니다!" })))
    handleClose()
  }

  return (
    <ReviewCard>
      {editing && <AccommodationEditReviewForm reviewData={reviewData} editing={editing} setEditing={setEditing} />}
      <ReviewCardHeader 
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
            onEditContent={handleEditReview}
            onDeleteContent={handleDeleteReview}
          />
        }
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
const ReviewCardHeader = styled(CardHeader)`
  padding-left: 0;
  padding-right: 0;
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