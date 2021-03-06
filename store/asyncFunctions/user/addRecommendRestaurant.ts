import { createAsyncThunk } from "@reduxjs/toolkit"
import { updateDoc } from "firebase/firestore"
import searchFirestoreDoc from "utils/functions/searchFirestoreDoc"

export const onAddRecommendRestaurant = createAsyncThunk(
  "ADD_RECOMMEND_RESTAURANT",
  async (data: RestaurantDataType) => {
    const response = await addRecommendRestaurant(data)
    return response
  }
)

const addRecommendRestaurant = async (data: RestaurantDataType) => {
  const { restaurantId, uid } = data
  const { searchedDocRef: restaurantRef, searchedData: restaurantData } = await searchFirestoreDoc(`restaurants/${restaurantId}`)
  const { searchedDocRef: userRef, searchedData: userData } = await searchFirestoreDoc(`users/${uid}`)
  await updateDoc(restaurantRef, { recommend: restaurantData!.recommend +1 })
  await updateDoc(userRef, { recommendRestaurants: [ ...userData!.recommendRestaurants, restaurantId ] })

  return restaurantId
}

export default addRecommendRestaurant