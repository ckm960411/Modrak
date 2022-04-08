import { createAsyncThunk } from "@reduxjs/toolkit"
import { updateDoc } from "firebase/firestore"
import searchFirestoreDoc from "utils/functions/searchFirestoreDoc"

export const onRemoveRecommendRestaurant = createAsyncThunk(
  "REMOVE_RECOMMEND_RESTAURANT",
  async (data: RestaurantDataType) => {
    const response = await removeRecommendRestaurant(data)
    return response
  }
)

const removeRecommendRestaurant = async (data: RestaurantDataType) => {
  const { restaurantId, uid } = data
  const { searchedDocRef: restaurantRef, searchedData: restaurantData } = await searchFirestoreDoc(`restaurants/${restaurantId}`)
  const { searchedDocRef: userRef, searchedData: userData } = await searchFirestoreDoc(`users/${uid}`)
  await updateDoc(restaurantRef, { recommend: restaurantData!.recommend -1 })
  await updateDoc(userRef, { 
    recommendRestaurants: userData!.recommendRestaurants.filter((restId: string) => restId !== restaurantId) 
  })

  return restaurantId
}

export default removeRecommendRestaurant