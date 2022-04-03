import { FC } from "react";
import { CardMedia } from "@mui/material";
import MyCarousel from "components/parts/MyCarousel";

const FeedImages: FC<{images: string[]}> = ({ images }) => {
  return (
    <>
      {images[0] && (
        <CardMedia>
          <MyCarousel imgsArray={images} autoplay={false} />
        </CardMedia>
      )}
    </>
  );
};

export default FeedImages;
