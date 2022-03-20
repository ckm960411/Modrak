import { FC } from "react";
import { Button, CardContent } from "@mui/material";
import useLoadingReviews from "utils/useLoadingReviews";
import RestaurantReview from "components/restaurant/review/RestaurantReview";

const RestaurantReviews: FC<{restaurantId: string}> = ({ restaurantId }) => {
  const { reviews, setLoadMore, hasMore } = useLoadingReviews(restaurantId)

  // 리뷰 3개 더 불러오기
  const onLoadMoreReviews = () => {
    setLoadMore(prev => prev +1)
  }
  // 첫리뷰 3개만 표시하기
  const onFoldReviews = () => {
    setLoadMore(1)
  }

  return (
    <CardContent>
      <div>
        {reviews.map(reviewData => <RestaurantReview key={reviewData.reviewId} reviewData={reviewData} />)}
      </div>
      <div style={{ textAlign: 'center' }}>
        {hasMore ? (
          <Button onClick={onLoadMoreReviews}>더보기</Button>
        ) : (
          <Button onClick={onFoldReviews}>접기</Button>
        )}
      </div>
    </CardContent>
  )
}

export default RestaurantReviews