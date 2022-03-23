import { FC } from "react";
import { Typography } from "@mui/material";
import bannerImage from "public/imgs/modrak-banner-img.png"
import MyCarousel from "components/parts/MyCarousel";

const imagsArray = [ bannerImage.src, bannerImage.src, bannerImage.src ]

const ImageBanner: FC = () => {
  return (
    <div>
      <Typography sx={{ fontFamily: 'Katuri', mt: 2, mb: 1 }}>제주 여행은 모드락에서!</Typography>
      <MyCarousel imgsArray={imagsArray} />
    </div>
  )
}

export default ImageBanner