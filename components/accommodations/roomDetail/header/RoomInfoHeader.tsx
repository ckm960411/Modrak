import { FC, useMemo } from "react";
import styled from "@emotion/styled";
import { Box, Chip, IconButton, Rating, Stack, Typography, useMediaQuery, useTheme } from "@mui/material";
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import BookmarkBorderOutlinedIcon from '@mui/icons-material/BookmarkBorderOutlined';
import { useAppDispatch, useAppSelector } from "store/hooks";
import { onAddBookmarkAccommodation, onRemoveBookmarkAccommodation } from "store/asyncFunctions";
import { mainColor } from "styles/GlobalStyles";
import MyCarousel from "components/parts/MyCarousel";

const RoomInfoHeader: FC = () => {
  const theme = useTheme()
  const downMd = useMediaQuery(theme.breakpoints.down(1000))
  const dispatch = useAppDispatch()
  const myInfo = useAppSelector(state => state.users.myInfo)
  const roomData: AccommodationWithId = useAppSelector(state => state.rooms.roomData!)

  const { id: accommodationId, name, tags, rating, address, images } = roomData

  const isBookmarked = useMemo(() => {
    return myInfo && myInfo.bookmarkAccommodations.includes(accommodationId)
  }, [myInfo, accommodationId])

  const toggleBookmarkAccommodation = async () => {
    if (!myInfo) return
    if (!isBookmarked) { // 찜(북마크)하기
      dispatch(onAddBookmarkAccommodation({ accommodationId, uid: myInfo.uid }))
    } else { // 찜(북마크) 취소하기
      dispatch(onRemoveBookmarkAccommodation({ accommodationId, uid: myInfo.uid }))
    }
  }

  return (
    <Stack direction={downMd ? "column" : "row"} spacing={2}>
      <div style={{ flexGrow: 1, maxWidth: downMd ? '100%' : '50%' }}>
        <MyCarousel imgsArray={images} />
      </div>
      <div style={{ flexGrow: 1, position: 'relative' }}>
        <Stack sx={{ height: '100%', justifyContent: 'space-between' }}>
          <div>
            <Typography variant="h5" sx={{ fontFamily: 'katuri', color: mainColor }}>
              {name}
            </Typography>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <Rating defaultValue={rating} />
              <span>({rating})</span>
            </div>
            <Typography sx={{ display: 'flex', color: '#555', mt: 2 }}>
              <LocationOnOutlinedIcon fontSize="small" />
              <span>{address}</span>
            </Typography>
            <Icon onClick={toggleBookmarkAccommodation}>
              {isBookmarked
                ? <BookmarkIcon color="primary" fontSize="large" />
                : <BookmarkBorderOutlinedIcon color="primary" fontSize="large" />
              }
            </Icon>
          </div>
          <Box sx={{ mt: 1, mb: 2 }}>
            {tags.map((tag, i) => <Chip id="filter-tag" key={i} label={tag} variant="filled" sx={{ mr: 1 }} />)}
          </Box>
        </Stack>
      </div>
    </Stack>
  )
}

const Icon = styled(IconButton)`
  position: absolute;
  top: 0;
  right: 0;
`

export default RoomInfoHeader