import { createAsyncThunk } from "@reduxjs/toolkit"
import { updateDoc } from "firebase/firestore"
import searchFirestoreDoc from "utils/functions/searchFirestoreDoc"

export const onAddBookmarkRestaurant = createAsyncThunk(
  "ADD_BOOKMARK_RESTAURANT",
  async (data: RestaurantDataType) => {
    const restaurantId = await addBookmarkRestaurant(data)
    return restaurantId
  }
)

const addBookmarkRestaurant = async (data: RestaurantDataType) => {
  const { restaurantId, uid } = data
  const { searchedDocRef: restaurantRef, searchedData: restaurantData } = await searchFirestoreDoc(`restaurants/${restaurantId}`)
  const { searchedDocRef: userRef, searchedData: userData } = await searchFirestoreDoc(`users/${uid}`)
  await updateDoc(restaurantRef, { bookmark: restaurantData!.bookmark +1 })
  await updateDoc(userRef, { bookmarkRestaurants: [ ...userData!.bookmarkRestaurants, restaurantId ] })

  return restaurantId
}

export default addBookmarkRestaurant