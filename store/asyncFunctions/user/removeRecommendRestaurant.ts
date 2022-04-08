import { createAsyncThunk } from "@reduxjs/toolkit"
import { doc, updateDoc } from "firebase/firestore"
import { dbService } from "fireBaseApp/fBase"
import searchFirestoreDoc from "utils/functions/searchFirestoreDoc"

export const onRemoveRecommendRestaurant = createAsyncThunk(
  "REMOVE_RECOMMEND_RESTAURANT",
  async (data: RecommendRestaurantDataType) => {
    const response = await removeRecommendRestaurant(data)
    return response
  }
)

const removeRecommendRestaurant = async (data: RecommendRestaurantDataType) => {
  const { restaurantId, uid } = data
  const restaurantRef = doc(dbService, "restaurants", restaurantId)
  const { searchedDocRef: userRef, searchedData: userData } = await searchFirestoreDoc(`users/${uid}`)
  await updateDoc(restaurantRef, { recommend: userData!.recommendCount -1 })
  await updateDoc(userRef, { 
    recommendRestaurants: userData!.recommendRestaurants.filter((restId: string) => restId !== restaurantId) 
  })

  return restaurantId
}

export default removeRecommendRestaurant