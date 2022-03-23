import { FC } from "react";
import { Typography } from "@mui/material";
import MyCarousel from "components/parts/MyCarousel";

const banners = [
  'https://firebasestorage.googleapis.com/v0/b/modrak-c7468.appspot.com/o/OqIL4ckT2qc9t3hpxutUk3QQ9Rp2%2Ff8bbf477-9e64-4902-b47c-fc82d10ac357?alt=media&token=af528d99-91ee-477d-b7cf-97687260c3e1',
  'https://firebasestorage.googleapis.com/v0/b/modrak-c7468.appspot.com/o/OqIL4ckT2qc9t3hpxutUk3QQ9Rp2%2Ff8bbf477-9e64-4902-b47c-fc82d10ac357?alt=media&token=af528d99-91ee-477d-b7cf-97687260c3e1',
  'https://firebasestorage.googleapis.com/v0/b/modrak-c7468.appspot.com/o/OqIL4ckT2qc9t3hpxutUk3QQ9Rp2%2Ff8bbf477-9e64-4902-b47c-fc82d10ac357?alt=media&token=af528d99-91ee-477d-b7cf-97687260c3e1',
]

const FoodBanner: FC = () => {
  return (
    <div>
      <Typography sx={{ fontFamily: 'Katuri', mb: 1 }}>요즘 뜨는 제주 맛집!</Typography>
      <MyCarousel imgsArray={banners} />
    </div>
  )
}

export default FoodBanner