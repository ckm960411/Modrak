import { FC } from "react";
import AccommodationReview from "components/accommodations/review/AccommodationReview";
import { useAppSelector } from "store/hooks";
import useLoadingRoomReviews from "utils/hooks/useLoadingRoomReviews";
import { Button } from "@mui/material";

const AccommodationReviews: FC = () => {
  const roomData = useAppSelector(state => state.rooms.roomData)
  const roomId = roomData!.id
  const { reviews, setLoadMore, hasMore } = useLoadingRoomReviews(roomId)
  
  // 리뷰 3개 더 불러오기
  const onLoadMoreReviews = () => {
    setLoadMore(prev => prev +1)
  }
  // 첫리뷰 3개만 표시하기
  const onFoldReviews = () => {
    setLoadMore(1)
  }

  return (
    <div>
      <div>
        {reviews.map(reviewData => <AccommodationReview key={reviewData.reviewId} reviewData={reviewData} />)}
      </div>
      <div style={{ textAlign: 'center' }}>
        {hasMore ? (
          <Button onClick={onLoadMoreReviews}>더보기</Button>
        ) : (
          <Button onClick={onFoldReviews}>접기</Button>
        )}
      </div>
    </div>
  )
}

export default AccommodationReviews