import { Dispatch, FC, SetStateAction, useEffect, useState } from "react";
import { Button, Card, CardContent, CardHeader, Dialog, IconButton, Stack, Typography } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import { v4 as uuid_v4 } from "uuid";
import { addDays, differenceInDays, format } from "date-fns";
import { useAppDispatch, useAppSelector } from "store/hooks";
import { showAlert } from "store/slices/appSlice";
import { onAddRoomInfoAndPush, onAddRoomReservation } from "store/asyncFunctions";
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
  const myInfo = useAppSelector(state => state.users.myInfo)
  const { name, checkin, rooms, id: accommodationId } = useAppSelector(state => state.rooms.roomData!)

  useEffect(() => {
    const findedData = rooms.find(room => room.roomId === cardId)
    setData(findedData!)
  }, [rooms, cardId])

  const handleClose = () => setIsReserving(false)

  if (!data) return (
    <Dialog open={open}>
      <div>Loading...</div>
    </Dialog>
  )

  const { roomName, reservedDates, roomId } = data

  const handleReserveRoom = async () => {
    if (!myInfo) return dispatch(showAlert({ isShown: true, message: '로그인 이후에 예약할 수 있습니다!', severity: 'error' }))
    const { startDate, endDate } = date
    if (startDate.toString() === endDate.toString())
      return dispatch(showAlert({ isShown: true, message: '체크인 날짜와 체크아웃 날짜를 확인해주세요!', severity: 'warning' }))
    if (reservedDates.includes(removeDetailTime(startDate)))
      return dispatch(showAlert({ isShown: true, message: '예약할 수 없는 날짜입니다!', severity: 'error' }))
    if (reservedDates.includes(removeDetailTime(endDate)))
      return dispatch(showAlert({ isShown: true, message: '예약할 수 없는 날짜입니다!', severity: 'error' }))
    const ok = window.confirm('이 날짜로 예약하시겠습니까?')
    if (!ok) return
    const diffDays = differenceInDays(endDate, startDate) // 두 날짜간의 차이를 계산
    // 체크인날짜와 체크아웃날짜 사이의 날짜들을 모두 문자열로 바꿔 배열로 담음
    let datesArray = [removeDetailTime(startDate)]
    for (let i = 0; i < diffDays; i++) {
      let newArray = [...datesArray, removeDetailTime(addDays(startDate, i+1))]
      datesArray = newArray
    }
    // 해당 숙소 DB 의 객실에 예약 날짜들을 추가
    dispatch(onAddRoomReservation({ roomId, accommodationId, datesArray }))
    // 예약한 정보를 유저정보에 저장하고, 알림을 보냄
    const newPush = {
      pushId: uuid_v4(),
      isChecked: false,
      createdAt: Date.now(),
      message: `${name} ${roomName} 객실 예약이 완료되었습니다! 체크인은 ${format(new Date(startDate), 'yyyy년 MM월 dd일')} ${checkin} 입니다.`
    }
    dispatch(onAddRoomInfoAndPush({ accommodationId, roomId, uid: myInfo.uid, datesArray, newPush }))
    handleClose()
  }

  return (
    <Dialog open={open} onClose={handleClose}>
      <Card>
        <CardHeader
          title={<Typography sx={{ fontSize: '18px', fontWeight: 600 }}>{roomName} 방 예약하기</Typography>}
          action={<IconButton onClick={handleClose}><CloseIcon /></IconButton>}
        />
        <CardContent>
          <ReserveTimePicker 
            date={date}
            setDate={setDate}
            roomId={roomId}
          />
        </CardContent>
        <Stack direction="row" spacing={1} sx={{ px: 2, pb: 2, justifyContent: 'flex-end' }}>
          <Button variant="outlined" onClick={handleClose}>취소</Button>
          <Button variant="contained" onClick={handleReserveRoom}>예약하기</Button>
        </Stack>
      </Card>
    </Dialog>
  )
}

export default ReserveModal