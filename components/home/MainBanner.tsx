import { FC } from "react";
import Link from "next/link";
import { Typography, useMediaQuery, useTheme } from "@mui/material";
import MyCarousel from "components/parts/MyCarousel";

const largeImages = [
  'https://d2ur7st6jjikze.cloudfront.net/cms/1552_original_1648794881.jpg?1648794881',
  'https://d2ur7st6jjikze.cloudfront.net/cms/1552_original_1648794881.jpg?1648794881',
  'https://d2ur7st6jjikze.cloudfront.net/cms/1552_original_1648794881.jpg?1648794881',
]
const smallImages = [
  'https://d2ur7st6jjikze.cloudfront.net/cms/1553_original_1648794882.jpg?1648794882',
  'https://d2ur7st6jjikze.cloudfront.net/cms/1553_original_1648794882.jpg?1648794882',
  'https://d2ur7st6jjikze.cloudfront.net/cms/1553_original_1648794882.jpg?1648794882',
]


const MainBanner: FC = () => {
  const theme = useTheme()
  const downMd = useMediaQuery(theme.breakpoints.down('md'))

  return (
    <div>
      <Typography sx={{ fontFamily: "Katuri", fontSize: 18, mb: 1 }}>
        현재 진행 중인 이벤트!
      </Typography>
      <Link href="/accommodation">
        <a>
          <MyCarousel imgsArray={downMd ? smallImages : largeImages} />
        </a>
      </Link>
    </div>
  );
};

export default MainBanner;
