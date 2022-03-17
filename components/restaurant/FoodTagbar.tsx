import { Card, CardContent, Chip, Stack, Typography } from "@mui/material";
import { FC } from "react";
import { mainColor } from "styles/GlobalStyles";

const FoodTagbar: FC = () => {
  return (
    <Card raised>
      <CardContent>
        <Typography sx={{ fontFamily: 'Katuri' }}>에디터 픽 추천태그!</Typography>
        <Stack direction="row" spacing={1} sx={{ flexWrap: 'wrap', mt: 1 }}>
          <Chip label="전체" sx={{ backgroundColor: mainColor, color: '#fff' }} />
          <Chip label="로컬맛집" sx={{ color: mainColor, border: `1px solid ${mainColor}`, backgroundColor: '#fff' }} />
          <Chip label="데이트" sx={{ color: mainColor, border: `1px solid ${mainColor}`, backgroundColor: '#fff' }} />
          <Chip label="가족식사" sx={{ color: mainColor, border: `1px solid ${mainColor}`, backgroundColor: '#fff' }} />
          <Chip label="모임" sx={{ color: mainColor, border: `1px solid ${mainColor}`, backgroundColor: '#fff' }} />
          <Chip label="혼밥/혼술" sx={{ color: mainColor, border: `1px solid ${mainColor}`, backgroundColor: '#fff' }} />
        </Stack>
      </CardContent>
    </Card>
  )
}

export default FoodTagbar