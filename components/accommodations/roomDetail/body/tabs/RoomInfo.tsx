import { FC } from "react";
import { Divider, Stack, Typography } from "@mui/material";
import styled from "@emotion/styled";
import { useAppSelector } from "store/hooks";
import Map from "components/parts/Map";
import RoomIcon from "components/parts/RoomIcon";

const RoomInfo: FC = () => {
  const roomData = useAppSelector(state => state.rooms.roomData)
  if (!roomData) return <div>Loading...</div>
  const { address, description, checkin, checkout, convenience, service, notice } = roomData

  return (
    <>
      <DescContainer>
        <DescHeader>숙소 소개</DescHeader>
        <Description>
          {description.map((desc, i) => <Description key={i}>{desc}</Description>)}
        </Description>
      </DescContainer>
      <Divider />
      <DescContainer>
        <DescHeader>체크인/체크아웃</DescHeader>
        <Description>체크인 - {checkin} / 체크아웃 - {checkout}</Description>
      </DescContainer>
      <Divider />
      <DescContainer>
        <DescHeader>편의 시설</DescHeader>
        <Description>
          {convenience.map((value, i) => <RoomIcon key={i} icon={value} />)}
        </Description>
      </DescContainer>
      <Divider />
      <DescContainer>
        <DescHeader>서비스</DescHeader>
        <Description>
          {service.map((value, i) => <RoomIcon key={i} icon={value} />)}
        </Description>
      </DescContainer>
      <Divider />
      <DescContainer>
        <DescHeader>이용 안내</DescHeader>
        <Description>
          {notice.map((value, i) => <Description key={i}>{value}</Description>)}
        </Description>
      </DescContainer>
      <Divider />
      <DescContainer>
        <DescHeader>숙소 위치</DescHeader>
        <Description style={{ marginBottom: '16px' }}>{address}</Description>
        <Map address={address} />
      </DescContainer>
    </>
  )
}

const DescContainer = styled(Stack)`
  margin-top: 16px;
  margin-bottom: 16px;
`
const DescHeader = styled(Typography)`
  font-weight: 600;
  color: #333;
  margin-bottom: 10px;
`
const Description = styled.div`
  font-size: 14px;
  color: #333;
`

export default RoomInfo