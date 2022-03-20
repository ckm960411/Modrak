import { FC } from "react";
import { CardContent } from "@mui/material";
import RestaurantReview from "components/restaurant/RestaurantReview";

const RestaurantReviews: FC = () => {
  return (
    <CardContent>
      <RestaurantReview />
    </CardContent>
  )
}

export default RestaurantReviews