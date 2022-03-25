import { FC } from "react";
import { Divider, Grid } from "@mui/material";
import AccommodationReviewForm from "components/accommodations/review/AccommodationReviewForm";
import AccommodationReviews from "components/accommodations/review/AccommodationReviews";

const RoomReviews: FC = () => {
  return (
    <Grid container>
      <Grid item xs={12} sx={{ width: "300px", maxWidth: "720px" }}>
        <AccommodationReviewForm />
      </Grid>
      <Grid item xs={12} sx={{ width: "300px", maxWidth: "720px" }}>
        <Divider />
        <AccommodationReviews />
      </Grid>
    </Grid>
  );
};

export default RoomReviews;
