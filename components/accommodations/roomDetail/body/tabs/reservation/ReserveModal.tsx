import { Dispatch, FC, SetStateAction, useEffect, useState } from "react";
import { Button, Card, CardContent, CardHeader, Dialog, IconButton, Stack, Typography } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import { updateDoc } from "firebase/firestore";
import { addDays, differenceInDays } from "date-fns";
import { useAppDispatch, useAppSelector } from "store/hooks";
import { addRoomReservation } from "store/slices/roomsSlice";
import searchFirestoreDoc from "utils/functions/searchFirestoreDoc"
import ReserveTimePicker from "@reservation/ReserveTimePicker";

const removeDetailTime = (date: Date) => {
  return date.toString().split(' ').slice(0, 4).join(' ')
}

export type DateRangeType = {
  startDate: Date
  endDate: Date
  key: string
}
type ReserveModalProps = {
  open: boolean
  setIsReserving: Dispatch<SetStateAction<boolean>>
  cardId: string
}
const ReserveModal: FC<ReserveModalProps> = ({ open, setIsReserving, cardId }) => {
  const [data, setData] = useState<RoomType | null>(null)
  const [date, setDate] = useState<DateRangeType>({
    startDate: new Date(),
    endDate: addDays(new Date(), 1),
    key: 'selection'
  })
  const dispatch = useAppDispatch()
  const { rooms, id: accommodationId } = useAppSelector(state => state.rooms.roomData!)

  useEffect(() => {
    const findedData = rooms.find(room => room.roomId === cardId)
    setData(findedData!)
  }, [rooms, cardId])

  const onClose = () => {
    setIsReserving(false)
  }

  if (!data) return (
    <Dialog open={open}>
      <div>Loading...</div>
    </Dialog>
  )

  const { roomName, reservedDates, roomId } = data

  const onReserveRoom = async () => {
    const { startDate, endDate } = date
    if (startDate.toString() === endDate.toString()) return alert('체크인 날짜와 체크아웃 날짜를 확인해주세요!')
    if (reservedDates.includes(removeDetailTime(startDate))) return alert('예약할 수 없는 날짜입니다!')
    if (reservedDates.includes(removeDetailTime(endDate))) return alert('예약할 수 없는 날짜입니다!')
    const ok = window.confirm('이 날짜로 예약하시겠습니까?')
    if (!ok) return
    const diffDays = differenceInDays(endDate, startDate) // 두 날짜간의 차이를 계산
    let datesArray = [removeDetailTime(startDate)]
    for (let i = 0; i < diffDays; i++) {
      let newArray = [...datesArray, removeDetailTime(addDays(startDate, i+1))]
      datesArray = newArray
    }
    console.log(datesArray)
    // 해당 숙소 DB 의 객실에 예약 날짜들을 추가
    const { searchedDocRef: accDocRef, searchedData: accData } = await searchFirestoreDoc(`accommodations/${accommodationId}`)
    const findedRoom = accData!.rooms.find((room: RoomType) => room.roomId === roomId)
    findedRoom.reservedDates = [ ...findedRoom.reservedDates, ...datesArray]
    await updateDoc(accDocRef, {
      rooms: accData!.rooms
    })
    dispatch(addRoomReservation({ roomId, newReservedDates: datesArray }))
    
    onClose()
  }

  return (
    <Dialog open={open} onClose={onClose}>
      <Card>
        <CardHeader
          title={<Typography sx={{ fontSize: '18px', fontWeight: 600 }}>{roomName} 방 예약하기</Typography>}
          action={<IconButton onClick={onClose}><CloseIcon /></IconButton>}
        />
        <CardContent>
          <ReserveTimePicker 
            date={date}
            setDate={setDate}
            roomId={roomId}
          />
        </CardContent>
        <Stack direction="row" spacing={1} sx={{ px: 2, pb: 2, justifyContent: 'flex-end' }}>
          <Button variant="outlined" onClick={onClose}>취소</Button>
          <Button variant="contained" onClick={onReserveRoom}>예약하기</Button>
        </Stack>
      </Card>
    </Dialog>
  )
}

export default ReserveModal