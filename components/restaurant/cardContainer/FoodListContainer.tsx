import { FC } from "react";
import { Card, CardContent, Chip, ImageList, ImageListItem, ImageListItemBar, Rating, Stack, Typography, useMediaQuery, useTheme } from "@mui/material";
import ThumbUpOutlinedIcon from '@mui/icons-material/ThumbUpOutlined';
import BookmarkBorderOutlinedIcon from '@mui/icons-material/BookmarkBorderOutlined';
import { mainColor } from "styles/GlobalStyles";

const itemData = [
  {
    img: 'https://images.unsplash.com/photo-1551963831-b3b1ca40c98e',
    title: 'Breakfast',
    author: '@bkristastucchio',
  },
  {
    img: 'https://images.unsplash.com/photo-1551782450-a2132b4ba21d',
    title: 'Burger',
    author: '@rollelflex_graphy726',
  },
  {
    img: 'https://images.unsplash.com/photo-1522770179533-24471fcdba45',
    title: 'Camera',
    author: '@helloimnik',
  },
  {
    img: 'https://images.unsplash.com/photo-1444418776041-9c7e33cc5a9c',
    title: 'Coffee',
    author: '@nolanissac',
  },
  {
    img: 'https://images.unsplash.com/photo-1533827432537-70133748f5c8',
    title: 'Hats',
    author: '@hjrc33',
  },
  {
    img: 'https://images.unsplash.com/photo-1558642452-9d2a7deb7f62',
    title: 'Honey',
    author: '@arwinneil',
  },
  {
    img: 'https://images.unsplash.com/photo-1516802273409-68526ee1bdd6',
    title: 'Basketball',
    author: '@tjdragotta',
  },
  {
    img: 'https://images.unsplash.com/photo-1518756131217-31eb79b20e8f',
    title: 'Fern',
    author: '@katie_wasserman',
  },
  {
    img: 'https://images.unsplash.com/photo-1597645587822-e99fa5d45d25',
    title: 'Mushrooms',
    author: '@silverdalex',
  },
  {
    img: 'https://images.unsplash.com/photo-1567306301408-9b74779a11af',
    title: 'Tomato basil',
    author: '@shelleypauls',
  },
  {
    img: 'https://images.unsplash.com/photo-1471357674240-e1a485acb3e1',
    title: 'Sea star',
    author: '@peterlaster',
  },
  {
    img: 'https://images.unsplash.com/photo-1589118949245-7d38baf380d6',
    title: 'Bike',
    author: '@southside_customs',
  },
];

const FoodListContainer: FC = () => {
  const theme = useTheme()
  const downMd = useMediaQuery(theme.breakpoints.down('md'))
  const downSm = useMediaQuery(theme.breakpoints.down('sm'))

  return (
    <>
      <Card raised>
        <CardContent>
          <Typography sx={{ fontFamily: 'Katuri' }}>에디터 픽 추천태그!</Typography>
          <Stack direction="row" spacing={1} sx={{ flexWrap: 'wrap', mt: 1 }}>
            <Chip label="전체" sx={{ backgroundColor: mainColor, color: '#fff' }} />
            <Chip label="소문난 로컬맛집" sx={{ color: mainColor, border: `1px solid ${mainColor}`, backgroundColor: '#fff' }} />
            <Chip label="데이트" sx={{ color: mainColor, border: `1px solid ${mainColor}`, backgroundColor: '#fff' }} />
            <Chip label="가족식사" sx={{ color: mainColor, border: `1px solid ${mainColor}`, backgroundColor: '#fff' }} />
            <Chip label="모임" sx={{ color: mainColor, border: `1px solid ${mainColor}`, backgroundColor: '#fff' }} />
            <Chip label="혼밥/혼술" sx={{ color: mainColor, border: `1px solid ${mainColor}`, backgroundColor: '#fff' }} />
          </Stack>
        </CardContent>
      </Card>
      <ImageList cols={downSm ? 1 : downMd ? 2 : 3} gap={16}>
        {itemData.map(item => (
          <Card key={item.img} raised>
            <CardContent>
              <ImageListItem>
                <img
                  src={`${item.img}?w=248&fit=crop&auto=format`}
                  srcSet={`${item.img}?w=248&fit=crop&auto=format&dpr=2 2x`}
                  alt={item.title}
                  loading="lazy"
                  style={{ height: '200px' }}
                />
                <ImageListItemBar
                  title={(
                    <>
                      <Rating name="올래국수" defaultValue={4.7} precision={0.1} size="large" readOnly />
                      <Typography sx={{ fontFamily: 'katuri', fontSize: '20px'  }}>올래국수</Typography>
                    </>
                  )}
                  subtitle={(
                    <>
                      <Typography variant="subtitle2" sx={{ mt: 1 }}>제주시</Typography>
                      <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
                        <ThumbUpOutlinedIcon fontSize="small" />
                        <Typography variant="subtitle2">252</Typography>
                        <BookmarkBorderOutlinedIcon fontSize="small" />
                        <Typography variant="subtitle2">220</Typography>
                      </Stack>
                    </>
                  )}
                  position="below"
                />
              </ImageListItem>
            </CardContent>
          </Card>
        ))}
      </ImageList>
    </>
  )
}

export default FoodListContainer