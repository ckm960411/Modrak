import { FC } from "react";
import RestaurantReviewForm from "components/restaurant/RestaurantReviewForm";

const RestaurantReview: FC<{data: RestaurantWithId}> = ({ data }) => {

  return (
    <>
      <RestaurantReviewForm restaurantId={data.id} />
    </>
  )
}

export default RestaurantReview