import { Dispatch, FC, SetStateAction, useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardMedia, Dialog, IconButton, Stack, Typography } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import styled from "@emotion/styled";
import { useAppSelector } from "store/hooks";
import MyCarousel from "components/parts/MyCarousel";

type RoomCardDetailProps = {
  open: boolean
  setCardOpened: Dispatch<SetStateAction<boolean>>
  cardId: string
}
const RoomCardDetail: FC<RoomCardDetailProps> = ({ open, setCardOpened, cardId }) => {
  const [data, setData] = useState<RoomType | null>(null)
  const { rooms } = useAppSelector(state => state.rooms.roomData!)

  useEffect(() => {
    const findedData = rooms.find(room => room.roomName === cardId)
    setData(findedData!)
  }, [rooms, cardId])

  if (!data) return <div>Loading...</div>

  const { roomName, price, people, bed, equipment, images, description } = data

  const onClose = () => {
    setCardOpened(false)
  }

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
    >
      <Card>
        <CardHeader 
          title={<Typography sx={{ fontSize: '18px', fontWeight: 600 }}>{roomName}</Typography>}
          action={
            <IconButton onClick={onClose}>
              <CloseIcon />
            </IconButton>
          }
        />
        <CardMedia>
          <MyCarousel imgsArray={images} />
        </CardMedia>
        <CardContent>
          <DescContainer spacing={0.5}>
            <DescHeader>인원</DescHeader>
            <Description>{people}</Description>
          </DescContainer>
          <DescContainer spacing={0.5}>
            <DescHeader>침대 개수</DescHeader>
            <Description>{bed}</Description>
          </DescContainer>
          <DescContainer spacing={0.5}>
            <DescHeader>객실 상세</DescHeader>
            <Description>
              {description.map((desc, i) => <Typography key={i} component="div" sx={{ fontSize: '14px' }}>{desc}</Typography>)}
            </Description>
          </DescContainer>
          <DescContainer spacing={0.5}>
            <DescHeader>편의 시설</DescHeader>
            <Description>
              {equipment.map((value, i) => <Typography key={i} sx={{ fontSize: '14px' }}>{value}</Typography>)}
            </Description>
          </DescContainer>
          <DescContainer spacing={0.5}>
            <DescHeader>가격 (1박 기준)</DescHeader>
            <Description>{price}</Description>
          </DescContainer>
        </CardContent>
      </Card>
    </Dialog>
  )
}

const DescContainer = styled(Stack)`
  margin-top: 8px;
  margin-bottom: 16px;
`
const DescHeader = styled(Typography)`
  font-weight: 600;
`
const Description = styled.div`
  font-size: 14px;
`

export default RoomCardDetail