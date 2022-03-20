import { FC } from "react";
import { Card, CardContent, ImageList, ImageListItem, ImageListItemBar, Rating, Stack, Typography, useMediaQuery, useTheme } from "@mui/material";
import ThumbUpOutlinedIcon from '@mui/icons-material/ThumbUpOutlined';
import BookmarkBorderOutlinedIcon from '@mui/icons-material/BookmarkBorderOutlined';
import Link from "next/link";
import { mainColor } from "styles/GlobalStyles";

const FoodListContainer: FC<{restaurantsData: RestaurantWithId[]}> = ({ restaurantsData }) => {
  const theme = useTheme()
  const downMd = useMediaQuery(theme.breakpoints.down('md'))
  const downSm = useMediaQuery(theme.breakpoints.down('sm'))

  return (
    <>
      <ImageList cols={downSm ? 1 : downMd ? 2 : 3} gap={16}>
        {restaurantsData.map(item => (
          <Link key={item.id} href={`/restaurant/${item.id}`}>
            <a>
              <Card key={item.images[0]} raised>
                <CardContent>
                  <ImageListItem>
                    <img
                      src={`${item.images[0]}?w=560&h=448&c=Y`}
                      srcSet={`${item.images[0]}?w=560&h=448&c=Y 2x`}
                      alt={item.name}
                      loading="lazy"
                      style={{ height: '200px' }}
                    />
                    <ImageListItemBar
                      title={(
                        <div>
                          <Rating name={item.name} defaultValue={item.rating} precision={0.1} size="large" readOnly />
                          <Typography sx={{ fontFamily: 'katuri', fontSize: '20px', color: mainColor  }}>{item.name}</Typography>
                        </div>
                      )}
                      subtitle={(
                        <div>
                          <Typography variant="subtitle2" sx={{ color: '#555' }}>{item.division}</Typography>
                          <Stack direction="row" sx={{ height: '50px', flexWrap: 'wrap' }}>
                            {item.menu.map((v, i) => 
                              <Typography key={i} variant="subtitle2" sx={{ mr: 1, color: '#555' }}>{v}</Typography>
                            )}
                          </Stack>
                          <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
                            <ThumbUpOutlinedIcon fontSize="small" />
                            <Typography variant="subtitle2">{item.recommend}</Typography>
                            <BookmarkBorderOutlinedIcon fontSize="small" />
                            <Typography variant="subtitle2">{item.bookmark}</Typography>
                          </Stack>
                        </div>
                      )}
                      position="below"
                    />
                  </ImageListItem>
                </CardContent>
              </Card>
            </a>
          </Link>
        ))}
      </ImageList>
    </>
  )
}

export default FoodListContainer