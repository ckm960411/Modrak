import { FC, useRef } from "react";
import styled from "@emotion/styled";
import { ImageList, useMediaQuery, useTheme } from "@mui/material";
import useLoadingRestaurants from "utils/hooks/useLoadingRestaurants";
import RestaurantCard from "components/restaurant/RestaurantCard";

const FoodListContainer: FC = () => {
  const theme = useTheme()
  const downMd = useMediaQuery(theme.breakpoints.down('md'))
  const downSm = useMediaQuery(theme.breakpoints.down('sm'))

  const targetRef = useRef<HTMLDivElement>(null)
  const { restaurants } = useLoadingRestaurants(targetRef)

  return (
    <>
      <ImageList cols={downSm ? 1 : downMd ? 2 : 3} gap={16} sx={{ overflow: 'visible' }}>
        {restaurants.map((item: RestaurantWithId) => (
          <RestaurantCard key={item.id} item={item} />
        ))}
      </ImageList>
      <TargetDiv ref={targetRef} />
    </>
  )
}

const TargetDiv = styled.div`
  height: 100px;
  background-color: transparent;
`

export default FoodListContainer