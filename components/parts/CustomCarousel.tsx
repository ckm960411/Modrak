import { FC } from "react";
import Carousel from "react-material-ui-carousel";

type CustomCarouselProps = {
  [key: string]: any
}

const CustomCarousel: FC<CustomCarouselProps> = ({ children, ...props }) => {
  return (
    <Carousel
      autoPlay={false}
      fullHeightHover={false}
      navButtonsProps={{
        style: {
          backgroundColor: "#009e5d",
          borderRadius: 10,
        },
      }}
      indicatorContainerProps={{
        style: {
          position: 'absolute',
          bottom: 0,
          left: 0,
          zIndex: 10,
        }
      }}
      indicatorIconButtonProps={{
        style: {
          color: '#e9e9e9',
        }
      }}
      activeIndicatorIconButtonProps={{
        style: {
          color: '#009e5d',
        }
      }}
      {...props}
    >
      {children}
    </Carousel>
  );
};

export default CustomCarousel;
