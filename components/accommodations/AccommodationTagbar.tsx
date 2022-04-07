import { FC, useState } from "react";
import { Chip, Stack, Typography } from "@mui/material";
import { useAppDispatch } from "store/hooks";
import { setTagFilter } from "store/slices/roomsSlice";

const tags: AccommodationTags[] = ['전체', '오션뷰', '5성급', '독채', '아이와함께', '가성비숙소']

const AccommodationTagbar: FC = () => {
  const [accommodationTag, setAccommodationTag] = useState<AccommodationTags>('전체')
  const dispatch = useAppDispatch()

  const handleTags = (e: React.MouseEvent<HTMLElement>) => {
    const { innerText } = e.target as HTMLElement
    setAccommodationTag(innerText as AccommodationTags)
    dispatch(setTagFilter({ tag: innerText }))
  }

  return (
    <div>
      <Typography sx={{ fontFamily: 'Katuri' }}>에디터 픽 추천태그!</Typography>
      <Stack direction="row" spacing={1} sx={{ flexWrap: 'wrap', mt: 1 }}>
        {tags.map(tag => (
          <Chip 
            key={tag} 
            id="filter-tag" 
            label={tag} 
            onClick={handleTags} 
            variant={accommodationTag === tag ? "filled" : "outlined"} 
          />
        ))}
      </Stack>
    </div>
  )
}

export default AccommodationTagbar