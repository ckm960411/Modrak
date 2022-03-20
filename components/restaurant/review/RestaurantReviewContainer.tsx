import { FC } from "react";
import { Card, Divider, Grid } from "@mui/material";
import RestaurantReviewForm from "components/restaurant/review/RestaurantReviewForm";
import RestaurantReviews from "components/restaurant/review/RestaurantReviews";

const RestaurantReviewContainer: FC<{ data: RestaurantWithId }> = ({ data }) => {
  return (
    <Card raised>
      <Grid container >
        <Grid item xs={12} sx={{ width: '300px', maxWidth: '720px' }}>
          <RestaurantReviewForm restaurantId={data.id} />
        </Grid>
        <Grid item xs={12} sx={{ width: '300px', maxWidth: '720px' }}>
          <Divider />
          <RestaurantReviews restaurantId={data.id} />
        </Grid>
      </Grid>
    </Card>
  );
};

export default RestaurantReviewContainer;
