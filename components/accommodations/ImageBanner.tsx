import { FC } from "react";
import { Card, CardContent } from "@mui/material";
import bannerImage from "public/imgs/modrak-banner-img.png"
import MyCarousel from "components/parts/MyCarousel";

const imagsArray = [ bannerImage.src, bannerImage.src, bannerImage.src ]

const ImageBanner: FC = () => {
  return (
    <Card raised>
      <CardContent>
        <MyCarousel imgsArray={imagsArray} />
      </CardContent>
    </Card>
  )
}

export default ImageBanner