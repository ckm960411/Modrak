import { FC, useState } from "react";
import { Card, CardContent, Chip, Stack, Typography } from "@mui/material";

type AccommodationTags = '전체' | '오션뷰' | '5성급' | '독채' | '아이와함께' | '가성비숙소'

const AccommodationContainer: FC = () => {
  const [accommodationTag, setAccommodationTag] = useState<AccommodationTags>('전체')

  const handleTags = (e: React.MouseEvent<HTMLElement>) => {
    const { innerText } = e.target as HTMLElement
    setAccommodationTag(innerText as AccommodationTags)
  }

  return (
    <Card raised>
      <CardContent>
        <Typography sx={{ fontFamily: 'Katuri' }}>에디터 픽 추천태그!</Typography>
        <Stack direction="row" spacing={1} sx={{ flexWrap: 'wrap', mt: 1 }}>
          <Chip id="filter-tag" onClick={handleTags} label="전체" variant={accommodationTag === '전체' ? "filled" : "outlined"} />
          <Chip id="filter-tag" onClick={handleTags} label="오션뷰" variant={accommodationTag === '오션뷰' ? "filled" : "outlined"} />
          <Chip id="filter-tag" onClick={handleTags} label="5성급" variant={accommodationTag === '5성급' ? "filled" : "outlined"} />
          <Chip id="filter-tag" onClick={handleTags} label="독채" variant={accommodationTag === '독채' ? "filled" : "outlined"} />
          <Chip id="filter-tag" onClick={handleTags} label="아이와함께" variant={accommodationTag === '아이와함께' ? "filled" : "outlined"} />
          <Chip id="filter-tag" onClick={handleTags} label="가성비숙소" variant={accommodationTag === '가성비숙소' ? "filled" : "outlined"} />
        </Stack>
      </CardContent>
      <CardContent>
        AccommodationContainer
      </CardContent>
    </Card>
  )
}

export default AccommodationContainer