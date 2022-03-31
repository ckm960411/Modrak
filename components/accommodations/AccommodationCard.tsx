import { FC, useMemo } from "react";
import Link from "next/link";
import styled from "@emotion/styled";
import { CardContent, Rating, Typography, useMediaQuery, useTheme } from "@mui/material";
import BookmarkIcon from '@mui/icons-material/Bookmark';
import BookmarkBorderOutlinedIcon from '@mui/icons-material/BookmarkBorderOutlined';
import { useAppSelector } from "store/hooks";
import { mainColor } from "styles/GlobalStyles";

const AccommodationCard: FC<{accommodation: AccommodationWithId}> = ({ accommodation }) => {
  const myInfo = useAppSelector(state => state.users.myInfo)

  const theme = useTheme()
  const downSm = useMediaQuery(theme.breakpoints.down('sm'))

  const isBookmarked = useMemo(() => {
    return myInfo && myInfo.bookmarkAccommodations.includes(accommodation.id)
  }, [myInfo, accommodation.id])

  return (
    <Link key={accommodation.id} href={`/accommodation/${accommodation.id}`}>
      <a>
        <AccommodationLink downSm={downSm}>
          <img 
            alt={accommodation.name} 
            src={accommodation.images[0]}
          />
          <CardContent id="accommodation-card">
            <div>
              <Typography sx={{ fontFamily: 'Katuri', fontSize: '18px', color: mainColor }}>{accommodation.name}</Typography>
              <Typography variant="subtitle2" sx={{ mt: 1, color: '#555' }}>{accommodation.address}</Typography>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <Rating defaultValue={accommodation.rating} readOnly />
                <span>({accommodation.rating})</span>
              </div>
            </div>
            <div>
              <Typography variant="caption">
                1박 기준
              </Typography>
              <Typography>
                {accommodation.rooms[accommodation.rooms.length-1].price}
              </Typography>
            </div>
            <Icon>
              {isBookmarked
                ? <BookmarkIcon color="primary" fontSize="large" />
                : <BookmarkBorderOutlinedIcon color="primary" fontSize="large" />
              }
            </Icon>
          </CardContent>
        </AccommodationLink>
      </a>
    </Link>
  )
}

const AccommodationLink = styled.div<{downSm: boolean}>`
  display: flex;
  border: 1px solid #e5e5e5;
  border-radius: 4px;
  flex-direction: ${props => props.downSm ? 'column' : 'row'};
  transition: all .2s;
  overflow: hidden;
  cursor: pointer;
  &:hover {
    z-index: 1;
    box-shadow: 0px 5px 5px -3px rgb(0 0 0 / 20%), 0px 8px 10px 1px rgb(0 0 0 / 14%), 0px 3px 14px 2px rgb(0 0 0 / 12%);
    transform: translateY(-4px);
  }
  & > img {
    width: ${props => props.downSm ? '100%' : '260px'};
    height: ${props => props.downSm ? '240px' : '200px'};
    object-fit: cover;
  }
  & > div#accommodation-card {
    position: relative;
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    & > div:last-child {
      margin-top: 10px;
    }
  }
`
const Icon = styled.div`
  position: absolute;
  top: 0;
  right: 0;
`

export default AccommodationCard