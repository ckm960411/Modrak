import { createAsyncThunk } from "@reduxjs/toolkit"
import { updateDoc } from "firebase/firestore"
import searchFirestoreDoc from "utils/functions/searchFirestoreDoc"

export const onRemoveBookmarkRestaurant = createAsyncThunk(
  "REMOVE_BOOKMARK_RESTAURANT",
  async (data: RestaurantDataType) => {
    const restaurantId = await removeBookmarkRestaurant(data)
    return restaurantId
  }
)

const removeBookmarkRestaurant = async (data: RestaurantDataType) => {
  const { restaurantId, uid } = data
  const { searchedDocRef: restaurantRef, searchedData: restaurantData } = await searchFirestoreDoc(`restaurants/${restaurantId}`)
  const { searchedDocRef: userRef, searchedData: userData } = await searchFirestoreDoc(`users/${uid}`)
  await updateDoc(restaurantRef, { bookmark: restaurantData!.bookmark -1 })
  await updateDoc(userRef, { 
    bookmarkRestaurants: userData!.bookmarkRestaurants.filter((restId: string) => restId !== restaurantId) 
  })

  return restaurantId
}

export default removeBookmarkRestaurant