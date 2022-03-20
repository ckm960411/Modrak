import { itemData } from "dummyData/itemData"

export const getAllRestaurantsId = async () => {
  const restaurants = itemData
  return restaurants.map(restaurant => {
    return {
      params: {
        id: restaurant.id
      }
    }
  })
}