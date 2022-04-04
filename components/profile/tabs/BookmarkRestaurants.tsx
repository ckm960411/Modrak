import { FC, useEffect, useState } from "react";
import { ImageList, useMediaQuery, useTheme } from "@mui/material";
import { getDoc } from "firebase/firestore";
import { useAppSelector } from "store/hooks";
import searchFirestoreDoc from "utils/functions/searchFirestoreDoc";
import RestaurantCard from "components/restaurant/RestaurantCard";

const BookmarkRestaurants: FC = () => {
  const [restaurants, setRestaurants] = useState<RestaurantWithId[]>([])
  const userData = useAppSelector(state => state.profile.userData!)

  const theme = useTheme()
  const downMd = useMediaQuery(theme.breakpoints.down('md'))
  const downSm = useMediaQuery(theme.breakpoints.down('sm'))

  const onLoadRestaurants = async () => {
    userData.bookmarkRestaurants.map( async (resId) => {
      const { searchedDocRef: restaurantRef } = await searchFirestoreDoc(`restaurants/${resId}`)
      await getDoc(restaurantRef).then(res => {
        const restaurantData: RestaurantWithId = {
          id: res.id,
          ...res.data() as RestaurantType
        }
        setRestaurants(prev => [ ...prev, restaurantData ])
      })
    })
  }

  useEffect(() => {
    onLoadRestaurants()
  }, [])

  return (
    <ImageList cols={downSm ? 1 : downMd ? 2 : 3} gap={16} sx={{ overflow: 'visible' }}>
      {restaurants.map((item: RestaurantWithId) => (
        <RestaurantCard key={item.id} item={item} />
      ))}
    </ImageList>
  )
}

export default BookmarkRestaurants