import { FC, useRef } from "react";
import Link from "next/link";
import { Card, CardContent, ImageList, ImageListItem, ImageListItemBar, Rating, Stack, Typography, useMediaQuery, useTheme } from "@mui/material";
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbUpOutlinedIcon from '@mui/icons-material/ThumbUpOutlined';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import BookmarkBorderOutlinedIcon from '@mui/icons-material/BookmarkBorderOutlined';
import { mainColor } from "styles/GlobalStyles";
import useLoadingRestaurants from "utils/useLoadingRestaurants";
import { useAppSelector } from "store/hooks";

const FoodListContainer: FC = () => {
  const theme = useTheme()
  const downMd = useMediaQuery(theme.breakpoints.down('md'))
  const downSm = useMediaQuery(theme.breakpoints.down('sm'))

  const targetRef = useRef<HTMLDivElement>(null)
  const { restaurants } = useLoadingRestaurants(targetRef)
  const myInfo = useAppSelector(state => state.users.myInfo)

  return (
    <>
      <ImageList cols={downSm ? 1 : downMd ? 2 : 3} gap={16} sx={{ overflow: 'visible' }}>
        {restaurants.map(item => (
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
                            {myInfo && myInfo.recommendRestaurants.includes(item.id) 
                              ? <ThumbUpIcon sx={{ color: mainColor }} fontSize="small" /> 
                              : <ThumbUpOutlinedIcon fontSize="small" />
                            }
                            <Typography variant="subtitle2">{item.recommend}</Typography>
                            {myInfo && myInfo.bookmarkRestaurants.includes(item.id) 
                              ? <BookmarkIcon sx={{ color: mainColor }} fontSize="small" /> 
                              : <BookmarkBorderOutlinedIcon fontSize="small" />
                            }
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
      <div ref={targetRef} style={{ width: '100%', height: '30px', backgroundColor: 'transparent' }}></div>
    </>
  )
}

export default FoodListContainer