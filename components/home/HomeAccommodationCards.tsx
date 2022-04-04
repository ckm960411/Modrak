import { FC, useEffect, useState } from "react";
import { Button, Stack, Typography } from "@mui/material";
import { collection, getDocs, limit, orderBy, query } from "firebase/firestore";
import { dbService } from "fireBaseApp/fBase";
import AccommodationCard from "components/accommodations/AccommodationCard";
import styled from "@emotion/styled";
import { useRouter } from "next/router";

const HomeAccommodationCards: FC = () => {
  const [accommodations, setAccommodations] = useState<AccommodationWithId[]>([])
  const router = useRouter()

  const onLoadAccommodations = async () => {
    const queryInstance = query(collection(dbService, 'accommodations'), orderBy("rating", "desc"), limit(6))
    await getDocs(queryInstance).then(res => {
      res.docs.map(doc => {
        const roomData = {
          id: doc.id,
          ...doc.data() as AccommodationType
        }
        setAccommodations(prev => [ ...prev, roomData ])
      })
    })
  }

  useEffect(() => {
    onLoadAccommodations()
  }, [])

  return (
    <div>
      <Typography sx={{ fontFamily: 'Katuri', fontSize: 18 }}>현재 뜨는 제주 숙소!</Typography>
      <Stack spacing={2} sx={{ mb: 2 }}>
        {accommodations.map(accommodation => (
          <AccommodationCard key={accommodation.id} accommodation={accommodation} />
        ))}
      </Stack>
      <BtnWrapper>
        <Button onClick={() => router.push('/accommodation')}>
          숙소 더보기
        </Button>
      </BtnWrapper>
    </div>
  )
}

const BtnWrapper = styled.div`
  text-align: center;
`

export default HomeAccommodationCards