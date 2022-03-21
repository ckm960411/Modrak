import { FC } from "react";
import { Card, CardContent, Chip, Stack, Typography } from "@mui/material";
import { mainColor } from "styles/GlobalStyles";
import { useAppDispatch } from "store/hooks";
import { setTagFilter } from "store/restaurantsSlice";

const FoodTagbar: FC = () => {
  const dispatch = useAppDispatch()

  const handleTags = (e: React.MouseEvent<HTMLElement>) => {
    const { innerText } = e.target as HTMLElement
    dispatch(setTagFilter({ tag: innerText }))
  }

  return (
    <Card raised>
      <CardContent>
        <Typography sx={{ fontFamily: 'Katuri' }}>에디터 픽 추천태그!</Typography>
        <Stack direction="row" spacing={1} sx={{ flexWrap: 'wrap', mt: 1 }}>
          <Chip onClick={handleTags} label="전체" sx={{ backgroundColor: mainColor, color: '#fff' }} />
          <Chip onClick={handleTags} label="로컬맛집" sx={{ color: mainColor, border: `1px solid ${mainColor}`, backgroundColor: '#fff' }} />
          <Chip onClick={handleTags} label="데이트" sx={{ color: mainColor, border: `1px solid ${mainColor}`, backgroundColor: '#fff' }} />
          <Chip onClick={handleTags} label="가족식사" sx={{ color: mainColor, border: `1px solid ${mainColor}`, backgroundColor: '#fff' }} />
          <Chip onClick={handleTags} label="모임" sx={{ color: mainColor, border: `1px solid ${mainColor}`, backgroundColor: '#fff' }} />
          <Chip onClick={handleTags} label="혼밥/혼술" sx={{ color: mainColor, border: `1px solid ${mainColor}`, backgroundColor: '#fff' }} />
        </Stack>
      </CardContent>
    </Card>
  )
}

export default FoodTagbar