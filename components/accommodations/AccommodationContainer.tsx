import { FC } from "react";
import { CardContent, Rating, Stack, Typography, useMediaQuery, useTheme } from "@mui/material";
import styled from "@emotion/styled";
import { mainColor } from "styles/GlobalStyles";
import Link from "next/link";
import { accommodations } from "dummyData/accommodation";

const AccommodationContainer: FC = () => {
  const theme = useTheme()
  const downSm = useMediaQuery(theme.breakpoints.down('sm'))

  return (
    <Stack spacing={2}>
      {accommodations.map(acc => (
        <Link key={acc.id} href={acc.id}>
          <a>
            <AccommodationCard downSm={downSm}>
              <img 
                alt={acc.name} 
                src={acc.images[0]}
              />
              <CardContent id="accommodation-card">
                <div>
                  <Typography sx={{ fontFamily: 'Katuri', fontSize: '18px', color: mainColor }}>{acc.name}</Typography>
                  <Typography variant="subtitle2" sx={{ mt: 1, color: '#555' }}>{acc.address}</Typography>
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <Rating defaultValue={acc.rating} />
                    <span>({acc.rating})</span>
                  </div>
                </div>
                <div>
                  <Typography variant="caption">
                    1박 기준
                  </Typography>
                  <Typography>
                    {acc.rooms[acc.rooms.length-1].price}
                  </Typography>
                </div>
              </CardContent>
            </AccommodationCard>
          </a>
        </Link>
      ))}
      
    </Stack>
  )
}

const AccommodationCard = styled.div<{downSm: boolean}>`
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
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    & > div:last-child {
      margin-top: 10px;
    }
  }
`

export default AccommodationContainer