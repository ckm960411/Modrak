import { FC } from "react";
import { Box, Chip, Rating, Stack, Typography, useMediaQuery, useTheme } from "@mui/material";
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import { useAppSelector } from "store/hooks";
import { mainColor } from "styles/GlobalStyles";
import MyCarousel from "components/parts/MyCarousel";

const RoomInfoHeader: FC = () => {
  const theme = useTheme()
  const downMd = useMediaQuery(theme.breakpoints.down(1000))
  const roomData: AccommodationWithId = useAppSelector(state => state.rooms.roomData)

  if(!roomData) return <div>Loading...</div>

  const { name, tags, rating, address, images } = roomData

  return (
    <Stack direction={downMd ? "column" : "row"} spacing={2}>
      <div style={{ flexGrow: 1, maxWidth: downMd ? '100%' : '50%' }}>
        <MyCarousel imgsArray={images} />
      </div>
      <div style={{ flexGrow: 1 }}>
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
          </div>
          <Box sx={{ mt: 1, mb: 2 }}>
            {tags.map((tag, i) => <Chip id="filter-tag" key={i} label={tag} variant="filled" sx={{ mr: 1 }} />)}
          </Box>
        </Stack>
      </div>
    </Stack>
  )
}

export default RoomInfoHeader