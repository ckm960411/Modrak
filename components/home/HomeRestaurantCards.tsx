import { FC, useEffect, useState } from "react";
import { Button, ImageList, Typography, useMediaQuery, useTheme } from "@mui/material";
import { collection, getDocs, limit, orderBy, query } from "firebase/firestore";
import { dbService } from "fireBaseApp/fBase";
import RestaurantCard from "components/restaurant/RestaurantCard";
import { useRouter } from "next/router";
import styled from "@emotion/styled";

const HomeAccommodationCards: FC = () => {
  const [restaurants, setRestaurants] = useState<RestaurantWithId[]>([])

  const router = useRouter()
  const theme = useTheme()
  const downMd = useMediaQuery(theme.breakpoints.down('md'))
  const downSm = useMediaQuery(theme.breakpoints.down('sm'))

  const onLoadRestaurants = async () => {
    const queryInstance = query(collection(dbService, 'restaurants'), orderBy("rating", "desc"), limit(6))
    await getDocs(queryInstance).then(res => {
      res.docs.map(doc => {
        const restaurantData = {
          id: doc.id,
          ...doc.data() as RestaurantType
        }
        setRestaurants(prev => [ ...prev, restaurantData ])
      })
    })
  }

  useEffect(() => {
    onLoadRestaurants()
  }, [])

  return (
    <div>
      <Typography sx={{ fontFamily: 'Katuri', fontSize: 18 }}>현재 뜨는 제주 맛집!</Typography>
      <ImageList cols={downSm ? 1 : downMd ? 2 : 3} gap={16} sx={{ overflow: 'visible' }}>
        {restaurants.map((item: RestaurantWithId) => (
          <RestaurantCard key={item.id} item={item} />
        ))}
      </ImageList>
      <BtnWrapper>
        <Button onClick={() => router.push('/restaurant')}>
          맛집 더보기
        </Button>
      </BtnWrapper>
    </div>
  )
}

const BtnWrapper = styled.div`
  text-align: center;
`

export default HomeAccommodationCards