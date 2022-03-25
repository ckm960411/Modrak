import { FC, useEffect, useState } from "react";
import Image from "next/image";
import { Avatar, CardContent, CardHeader, Divider, Rating, Stack, Typography } from "@mui/material";
import styled from "@emotion/styled";
import { format } from "date-fns";
import formatDistanceToNowKo from "utils/functions/formatDistanceToNowKo";
import { updateDoc } from "firebase/firestore";
import { useAppDispatch } from "store/hooks";
import { deleteRoomReview } from "store/slices/roomsSlice";
import defaultImg from "public/imgs/profileImg.png"
import EditMenu from "components/parts/EditMenu";
import AccommodationEditReviewForm from "components/accommodations/review/AccommodationEditReviewForm";
import searchFirestoreDoc from "utils/functions/searchFirestoreDoc";

const AccommodationReview: FC<{reviewData: RoomReviewWithUserInfo}> = ({ reviewData }) => {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null)
  const [timeAgo, setTimeAgo] = useState<string>("0");
  const [date, setDate] = useState<string>('')
  const [editing, setEditing] = useState(false)

  const dispatch = useAppDispatch()
  const { roomId, reviewId, reviewText, reviewImages, rating, createdAt, modifiedAt, userUid, nickname, profileImg } = reviewData

  const handleClick = (event: React.MouseEvent<HTMLElement>) => setAnchorEl(event.currentTarget);
  const handleClose = () =>  setAnchorEl(null);

  const onEditReview = () => {
    setEditing(true)
    handleClose()
  }

  const onDeleteReview = async () => {
    const ok = window.confirm('이 리뷰를 정말 삭제하시겠습니까?')
    if (!ok) return handleClose()

    const { searchedDocRef: reviewDocRef, searchedData: reviewData } = await searchFirestoreDoc(`reviews/${roomId}`)
    const reviewsArray = reviewData!.reviews
    const filteredReviews = reviewsArray.filter((review: RoomReviewType) => review.reviewId !== reviewId)

    await updateDoc(reviewDocRef, { reviews: filteredReviews })
    dispatch(deleteRoomReview({ reviewId }))

    handleClose()
  }

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
      {editing && <AccommodationEditReviewForm reviewData={reviewData} editing={editing} setEditing={setEditing} />}
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