import { FC } from "react";
import { Card, CardContent, ImageList, ImageListItem, ImageListItemBar, Rating, Stack, Typography, useMediaQuery, useTheme } from "@mui/material";
import ThumbUpOutlinedIcon from '@mui/icons-material/ThumbUpOutlined';
import BookmarkBorderOutlinedIcon from '@mui/icons-material/BookmarkBorderOutlined';
import { itemData } from "dummyData/itemData";

const FoodListContainer: FC = () => {
  const theme = useTheme()
  const downMd = useMediaQuery(theme.breakpoints.down('md'))
  const downSm = useMediaQuery(theme.breakpoints.down('sm'))

  return (
    <>
      <ImageList cols={downSm ? 1 : downMd ? 2 : 3} gap={16}>
        {itemData.map(item => (
          <Card key={item.img} raised>
            <CardContent>
              <ImageListItem>
                <img
                  src={`${item.img}?w=560&h=448&c=Y`}
                  srcSet={`${item.img}?w=560&h=448&c=Y 2x`}
                  alt={item.title}
                  loading="lazy"
                  style={{ height: '200px' }}
                />
                <ImageListItemBar
                  title={(
                    <>
                      <Rating name={item.title} defaultValue={item.rating} precision={0.1} size="large" readOnly />
                      <Typography sx={{ fontFamily: 'katuri', fontSize: '20px'  }}>{item.title}</Typography>
                    </>
                  )}
                  subtitle={(
                    <>
                      <Typography variant="subtitle2">{item.address}</Typography>
                      <Stack direction="row" sx={{ height: '50px', flexWrap: 'wrap' }}>
                        {item.menu.map((v, i) => 
                          <Typography key={i} variant="subtitle2" sx={{ mr: 1 }}>{v}</Typography>
                        )}
                      </Stack>
                      <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
                        <ThumbUpOutlinedIcon fontSize="small" />
                        <Typography variant="subtitle2">{item.recommend}</Typography>
                        <BookmarkBorderOutlinedIcon fontSize="small" />
                        <Typography variant="subtitle2">{item.bookmark}</Typography>
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