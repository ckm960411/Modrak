import { itemData } from "dummyData/itemData"

export const getRestaurantData = async (restaurantId: string) => {
  const restaurantData = itemData.find(item => item.id === restaurantId)
  return restaurantData
}