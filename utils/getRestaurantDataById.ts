import { itemData } from "dummyData/itemData"

export const getRestaurantDataById = async (restaurantId: string) => {
  const restaurantData = itemData.find(item => item.id === restaurantId)
  return restaurantData
}