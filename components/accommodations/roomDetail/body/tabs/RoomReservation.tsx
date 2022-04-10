import { FC, useState } from "react";
import { Stack } from "@mui/material";
import { useAppSelector } from "store/hooks";
import RoomCard from "@reservation/RoomCard";
import RoomCardDetail from "@reservation/RoomCardDetail";
import ReserveModal from "@reservation/ReserveModal";

const RoomReservation: FC = () => {
  const [cardOpened, setCardOpened] = useState(false)
  const [cardId, setCardId] = useState('')
  const [isReserving, setIsReserving] = useState(false)

  const roomData = useAppSelector(state => state.rooms.roomData)
  const { rooms, checkin } = roomData!

  const onOpenCard = (roomId: string) => () => {
    setCardOpened(true)
    setCardId(roomId)
  }

  const handleReserve = (roomId: string) => (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation()
    setCardId(roomId)
    setIsReserving(true)
  }

  return (
    <>
      <Stack spacing={2} sx={{ mt: 2, mb: 10 }}>
        {rooms.map((room, i) => (
          <RoomCard 
            key={room.roomId} 
            room={room} 
            checkin={checkin} 
            onOpenCard={onOpenCard}
            handleReserve={handleReserve}
          />
        ))}
      </Stack>
      {isReserving && <ReserveModal open={isReserving} setIsReserving={setIsReserving} cardId={cardId} />}
      {cardOpened && <RoomCardDetail open={cardOpened} setCardOpened={setCardOpened} cardId={cardId} />}
    </>
  )
}



export default RoomReservation