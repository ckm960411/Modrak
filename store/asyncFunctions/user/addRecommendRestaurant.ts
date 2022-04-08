import { createAsyncThunk } from "@reduxjs/toolkit"
import { doc, updateDoc } from "firebase/firestore"
import { dbService } from "fireBaseApp/fBase"
import searchFirestoreDoc from "utils/functions/searchFirestoreDoc"

export const onAddRecommendRestaurant = createAsyncThunk(
  "ADD_RECOMMEND_RESTAURANT",
  async (data: RecommendRestaurantDataType) => {
    const response = await addRecommendRestaurant(data)
    return response
  }
)

const addRecommendRestaurant = async (data: RecommendRestaurantDataType) => {
  const { restaurantId, uid } = data
  const restaurantRef = doc(dbService, "restaurants", restaurantId)
  const { searchedDocRef: userRef, searchedData: userData } = await searchFirestoreDoc(`users/${uid}`)
  await updateDoc(restaurantRef, { recommend: userData!.recommendCount +1 })
  await updateDoc(userRef, { recommendRestaurants: [ ...userData!.recommendRestaurants, restaurantId ] })

  return restaurantId
}

export default addRecommendRestaurant