import { FC, useState } from "react";
import { Button, CardContent, Chip, Stack, Typography, useMediaQuery, useTheme } from "@mui/material";
import styled from "@emotion/styled";
import { useAppSelector } from "store/hooks";
import RoomCardDetail from "@reservation/RoomCardDetail";
import ReserveModal from "@reservation/ReserveModal";

const RoomReservation: FC = () => {
  const [cardOpened, setCardOpened] = useState(false)
  const [cardId, setCardId] = useState('')
  const [isReserving, setIsReserving] = useState(false)

  const roomData = useAppSelector(state => state.rooms.roomData)
  const { rooms, checkin } = roomData!

  const theme = useTheme()
  const downMd = useMediaQuery(theme.breakpoints.down('sm'))

  const onOpenCard = (e: React.MouseEvent<HTMLDivElement>) => {
    setCardOpened(true)
    setCardId(e.currentTarget.id)
  }

  const handleReserve = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation()
    setCardId(e.currentTarget.id)
    setIsReserving(true)
  }

  return (
    <>
      <Stack spacing={2} sx={{ mt: 2 }}>
        {rooms.map((room, i) => (
          <RoomCard key={i} id={room.roomName} downMd={downMd} onClick={onOpenCard}>
            <img alt={room.roomName} src={room.images[0]} />
            <CardContent>
              <div>
                <Typography sx={{ fontSize: '18px', fontWeight: 600 }}>{`[${checkin} 체크인] ${room.roomName}`}</Typography>
                <Typography variant="subtitle2" sx={{ color: '#555' }}>{room.people}</Typography>
                <Typography variant="subtitle2" sx={{ color: '#555' }}>{room.bed}</Typography>
                <div>
                  {room.equipment.map((value, i) => <Chip key={i} label={value} size="small" />)}
                </div>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <div>
                  <Typography variant="caption">1박 기준</Typography>
                  <Typography>{room.price}</Typography>
                </div>
                <Button id={room.roomName} variant="contained" onClick={handleReserve}>예약하기</Button>
              </div>
            </CardContent>
          </RoomCard>
        ))}
      </Stack>
      {isReserving && <ReserveModal open={isReserving} setIsReserving={setIsReserving} cardId={cardId} />}
      {cardOpened && <RoomCardDetail open={cardOpened} setCardOpened={setCardOpened} cardId={cardId} />}
    </>
  )
}

const RoomCard = styled.div<{downMd: boolean}>`
  display: flex;
  flex-direction: ${props => props.downMd ? 'column' : 'row'};
  border: 1px solid #e5e5e5;
  border-radius: 4px;
  overflow: hidden;
  cursor: pointer;
  transition: all .2s;
  &:hover {
    z-Index: 1;
    box-shadow: 0px 5px 5px -3px rgb(0 0 0 / 20%), 0px 8px 10px 1px rgb(0 0 0 / 14%), 0px 3px 14px 2px rgb(0 0 0 / 12%);
    transform: translateY(-4px);
  }
  & > img {
    width: ${props => props.downMd ? '100%' : '40%'};
    min-height: 180px;
    max-height: 240px;
    object-fit: cover;
    height: ${props => props.downMd && '240px'}
  }
  & > div.css-46bh2p-MuiCardContent-root {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 100%;
  }
`

export default RoomReservation