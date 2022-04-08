import { createAsyncThunk } from "@reduxjs/toolkit"
import { updateDoc } from "firebase/firestore"
import searchFirestoreDoc from "utils/functions/searchFirestoreDoc"

export const onRemoveBookmarkAccommodation = createAsyncThunk(
  "REMOVE_BOOKMARK_ACCOMMODATION", 
  async (data: AccommodationDataType) => {
    const accommodationId = await removeBookmarkAccommodation(data)
    return accommodationId
  }
)

const removeBookmarkAccommodation = async (data: AccommodationDataType) => {
  const { uid, accommodationId } = data
  const { searchedDocRef: userRef, searchedData: userData } = await searchFirestoreDoc(`users/${uid}`)
  await updateDoc(userRef, { 
    bookmarkAccommodations: userData!.bookmarkAccommodations.filter((accId: string) => accId !== accommodationId) 
  })

  return accommodationId
}

export default removeBookmarkAccommodation