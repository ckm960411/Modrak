import { FC, useState } from "react";
import { Chip, Stack, Typography } from "@mui/material";
import { useAppDispatch } from "store/hooks";
import { setTagFilter } from "store/restaurantsSlice";

type RestaurantTags = "전체" | "로컬맛집" | "데이트" | "가족식사" | "모임" | "혼밥/혼술"

const FoodTagbar: FC = () => {
  const [restaurantTag, setRestaurantTag] = useState<RestaurantTags>('전체')
  const dispatch = useAppDispatch()

  const handleTags = (e: React.MouseEvent<HTMLElement>) => {
    const { innerText } = e.target as HTMLElement
    setRestaurantTag(innerText as RestaurantTags)
    dispatch(setTagFilter({ tag: innerText }))
  }

  return (
    <div>
      <Typography sx={{ fontFamily: 'Katuri' }}>에디터 픽 추천태그!</Typography>
      <Stack direction="row" spacing={1} sx={{ flexWrap: 'wrap', mt: 1 }}>
        <Chip id="filter-tag" onClick={handleTags} label="전체" variant={restaurantTag === '전체' ? "filled" : "outlined"} />
        <Chip id="filter-tag" onClick={handleTags} label="로컬맛집" variant={restaurantTag === '로컬맛집' ? "filled" : "outlined"} />
        <Chip id="filter-tag" onClick={handleTags} label="데이트" variant={restaurantTag === '데이트' ? "filled" : "outlined"} />
        <Chip id="filter-tag" onClick={handleTags} label="가족식사" variant={restaurantTag === '가족식사' ? "filled" : "outlined"} />
        <Chip id="filter-tag" onClick={handleTags} label="모임" variant={restaurantTag === '모임' ? "filled" : "outlined"} />
        <Chip id="filter-tag" onClick={handleTags} label="혼밥/혼술" variant={restaurantTag === '혼밥/혼술' ? "filled" : "outlined"} />
      </Stack>
    </div>
  )
}

export default FoodTagbar