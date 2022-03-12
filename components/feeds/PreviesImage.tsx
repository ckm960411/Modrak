import { Dispatch, FC, SetStateAction, useCallback } from "react";
import Image from "next/image";
import CloseIcon from '@mui/icons-material/Close';
import { IconButton } from "@mui/material";
import styled from "@emotion/styled";

const ImageWrapper = styled.div`
  height: 150px;
  width: 150px;
  background-color: #e9e9e9;
  border-radius: 20px 0 20px 0;
  position: relative;
  & span {
    height: inherit !important;
    width: inherit !important;
    position: relative !important;
  }
  & > button {
    position: absolute;
    top: 0;
    right: 0;
  }
  & > div {
    position: absolute;
    bottom: 0; left: 0;
    width: 30px;
    height: 30px;
    background-color: #008F71;
    color: #fff;
    font-size: 20px;
    font-weight: 700;
    text-align: center;
  }
`
type PreviewImageProps = {
  image: string;
  setImages: Dispatch<SetStateAction<string[]>>;
  order: number;
}
const PreviewImage: FC<PreviewImageProps> = ({ image, setImages, order }) => {

  const clearImage = useCallback(() => {
    setImages(prev => prev.filter(v => v !== image))
  }, [setImages, image])

  return (
    <ImageWrapper>
      <Image
        src={image} alt="image" 
        layout="fill"
        objectFit="contain"
      />
      <IconButton onClick={clearImage}>
        <CloseIcon />
      </IconButton>
      <div>{order + 1}</div>
    </ImageWrapper>
  );
};

export default PreviewImage;
