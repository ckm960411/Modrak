import { createAsyncThunk } from "@reduxjs/toolkit"
import { updateDoc } from "firebase/firestore"
import searchFirestoreDoc from "utils/functions/searchFirestoreDoc"

export const onAddBookmarkAccommodation = createAsyncThunk(
  "ADD_BOOKMARK_ACCOMMODATION",
  async (data: AccommodationDataType) => {
    const accommodationId = await addBookmarkAccommodation(data)
    return accommodationId
  }
)

const addBookmarkAccommodation = async (data: AccommodationDataType) => {
  const { uid, accommodationId } = data
  const { searchedDocRef: userRef, searchedData: userData } = await searchFirestoreDoc(`users/${uid}`)
  await updateDoc(userRef, { bookmarkAccommodations: [ ...userData!.bookmarkAccommodations, accommodationId ] })

  return accommodationId
}

export default addBookmarkAccommodation