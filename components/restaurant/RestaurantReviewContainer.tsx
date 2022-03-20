import { FC } from "react";
import RestaurantReviewForm from "components/restaurant/RestaurantReviewForm";
import RestaurantReviews from "./RestaurantReviews";
import { Card, Divider, Grid } from "@mui/material";

const RestaurantReviewContainer: FC<{ data: RestaurantWithId }> = ({
  data,
}) => {
  return (
    <Card raised>
      <Grid container >
        <Grid item xs={12} sx={{ width: '300px', maxWidth: '720px' }}>
          <RestaurantReviewForm restaurantId={data.id} />
        </Grid>
        <Grid item xs={12} sx={{ width: '300px', maxWidth: '720px' }}>
          <Divider />
          <RestaurantReviews />
        </Grid>
      </Grid>
    </Card>
  );
};

export default RestaurantReviewContainer;
