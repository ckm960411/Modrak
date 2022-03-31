import { FC } from "react";
import Link from "next/link";
import styled from "@emotion/styled";
import { ImageListItem, ImageListItemBar, Rating, Stack, Typography } from "@mui/material";
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbUpOutlinedIcon from '@mui/icons-material/ThumbUpOutlined';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import BookmarkBorderOutlinedIcon from '@mui/icons-material/BookmarkBorderOutlined';
import { useAppSelector } from "store/hooks";
import { mainColor } from "styles/GlobalStyles";

const RestaurantCard: FC<{item: RestaurantWithId}> = ({ item }) => {
  const myInfo = useAppSelector(state => state.users.myInfo)

  return (
    <Link key={item.id} passHref href={`/restaurant/${item.id}`}>
      <RestaurantLink>
        <ImageListItem>
          <img
            src={`${item.images[0]}?w=560&h=448&c=Y`}
            srcSet={`${item.images[0]}?w=560&h=448&c=Y 2x`}
            alt={item.name}
            loading="lazy"
            style={{ height: '200px', zIndex: 0 }}
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
            sx={{ p: 1 }}
          />
        </ImageListItem>
      </RestaurantLink>
    </Link>
  )
}

const RestaurantLink = styled('a')`
  border: 1px solid #e5e5e5;
  border-radius: 4px;
  transition: all .2s;
  overflow: hidden;
  &:hover {
    z-index: 1;
    box-shadow: 0px 5px 5px -3px rgb(0 0 0 / 20%), 0px 8px 10px 1px rgb(0 0 0 / 14%), 0px 3px 14px 2px rgb(0 0 0 / 12%);
    transform: translateY(-4px);
  }
`

export default RestaurantCard