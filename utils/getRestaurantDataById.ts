import searchFirestoreDoc from "./searchFirestoreDoc"

export const getRestaurantDataById = async (restaurantId: string) => {
  const { searchedData: restaurantData } = await searchFirestoreDoc(`restaurants/${restaurantId}`)
  return restaurantData
}