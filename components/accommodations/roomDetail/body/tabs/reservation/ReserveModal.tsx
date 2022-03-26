import { Dispatch, FC, SetStateAction, useEffect, useState } from "react";
import { Button, Card, CardContent, CardHeader, Dialog, IconButton, Stack, Typography } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import { useAppSelector } from "store/hooks";
import ReserveTimePicker from "@reservation/ReserveTimePicker";

type ReserveModalProps = {
  open: boolean
  setIsReserving: Dispatch<SetStateAction<boolean>>
  cardId: string
}
const ReserveModal: FC<ReserveModalProps> = ({ open, setIsReserving, cardId }) => {
  const [data, setData] = useState<RoomType | null>(null)
  const { rooms } = useAppSelector(state => state.rooms.roomData!)

  useEffect(() => {
    const findedData = rooms.find(room => room.roomName === cardId)
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

  const { roomName } = data

  return (
    <Dialog
      open={open}
      onClose={onClose}
    >
      <Card>
        <CardHeader
          title={<Typography sx={{ fontSize: '18px', fontWeight: 600 }}>{roomName} 방 예약하기</Typography>}
          action={<IconButton onClick={onClose}><CloseIcon /></IconButton>}
        />
        <CardContent>
          <ReserveTimePicker />
        </CardContent>
        <Stack direction="row" spacing={1} sx={{ px: 2, pb: 2, justifyContent: 'flex-end' }}>
          <Button variant="outlined" onClick={onClose}>취소</Button>
          <Button variant="contained">예약하기</Button>
        </Stack>
      </Card>
    </Dialog>
  )
}

export default ReserveModal