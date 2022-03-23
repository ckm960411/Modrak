import { FC, useEffect, useState } from "react";
import { Card, CardContent, Chip, Stack, Typography } from "@mui/material";
import { useAppDispatch } from "store/hooks";
import { setTagFilter } from "store/restaurantsSlice";

const FoodTagbar: FC = () => {
  const [allTag, setAllTag] = useState(true)
  const [localTag, setLocalTag] = useState(false)
  const [dateTag, setDateTag] = useState(false)
  const [familyTag, setFamilyTag] = useState(false)
  const [meetingTag, setMeetingTag] = useState(false)
  const [soloTag, setSoloTag] = useState(false)

  const dispatch = useAppDispatch()

  const clearAllTag = () => {
    setAllTag(false)
    setLocalTag(false)
    setDateTag(false)
    setFamilyTag(false)
    setMeetingTag(false)
    setSoloTag(false)
  }

  const handleTags = (e: React.MouseEvent<HTMLElement>) => {
    const { innerText } = e.target as HTMLElement
    clearAllTag()
    if (innerText === '전체') {
      setAllTag(true)
    } else if (innerText === '로컬맛집') {
      setLocalTag(true)
    } else if (innerText === '데이트') {
      setDateTag(true)
    } else if (innerText === '가족식사') {
      setFamilyTag(true)
    } else if (innerText === '모임') {
      setMeetingTag(true)
    } else if (innerText === '혼밥/혼술') {
      setSoloTag(true)
    }
    dispatch(setTagFilter({ tag: innerText }))
  }

  return (
    <Card raised>
      <CardContent>
        <Typography sx={{ fontFamily: 'Katuri' }}>에디터 픽 추천태그!</Typography>
        <Stack direction="row" spacing={1} sx={{ flexWrap: 'wrap', mt: 1 }}>
          <Chip id="filter-tag" onClick={handleTags} label="전체" variant={allTag ? "filled" : "outlined"} />
          <Chip id="filter-tag" onClick={handleTags} label="로컬맛집" variant={localTag ? "filled" : "outlined"} />
          <Chip id="filter-tag" onClick={handleTags} label="데이트" variant={dateTag ? "filled" : "outlined"} />
          <Chip id="filter-tag" onClick={handleTags} label="가족식사" variant={familyTag ? "filled" : "outlined"} />
          <Chip id="filter-tag" onClick={handleTags} label="모임" variant={meetingTag ? "filled" : "outlined"} />
          <Chip id="filter-tag" onClick={handleTags} label="혼밥/혼술" variant={soloTag ? "filled" : "outlined"} />
        </Stack>
      </CardContent>
    </Card>
  )
}

export default FoodTagbar