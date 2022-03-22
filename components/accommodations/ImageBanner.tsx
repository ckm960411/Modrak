import { FC } from "react";
import { Card, CardContent } from "@mui/material";
import bannerImage from "public/imgs/accommodation-banner.png"
import MyCarousel from "components/parts/MyCarousel";

const imagsArray = [ bannerImage.src ]

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