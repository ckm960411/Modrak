import { FC } from "react";
import { CardMedia } from "@mui/material";
import Image from "next/image";
import styled from "@emotion/styled";
import CustomCarousel from "components/parts/CustomCarousel";

const ImageWrapper = styled.div`
  max-height: 500px;
  min-height: 400px;
  height: 100%;
  width: 100%;
  background-color: #e0e0e0;
  position: relative;
  & span {
    height: inherit !important;
  }
`

const FeedImages: FC<{images: string[]}> = ({ images }) => {
  return (
    <>
      {images[0] && (
        <CardMedia>
          <CustomCarousel>
            {images.map((img, i) => (
              <ImageWrapper key={i}>
                <Image
                  src={img}
                  alt="image"
                  layout="fill"
                  objectFit="contain"
                />
              </ImageWrapper>
            ))}
          </CustomCarousel>
        </CardMedia>
      )}
    </>
  );
};

export default FeedImages;
