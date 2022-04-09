import { createAsyncThunk } from "@reduxjs/toolkit"
import { updateDoc } from "firebase/firestore"
import searchFirestoreDoc from "utils/functions/searchFirestoreDoc"

export const onDeleteRoomReview = createAsyncThunk(
  "DELETE_ROOM_REVIEW",
  async (data: DeleteRoomReview) => {
    const reviewId = await deleteRoomReview(data)
    return reviewId
  }
)

const deleteRoomReview = async (data: DeleteRoomReview) => {
  const { accommodationId, reviewId } = data
  const { searchedDocRef: reviewDocRef, searchedData: reviewData } = await searchFirestoreDoc(`reviews/${accommodationId}`)
  const reviewsArray = reviewData!.reviews
  const filteredReviews = reviewsArray.filter((review: RoomReviewType) => review.reviewId !== reviewId)
  await updateDoc(reviewDocRef, { reviews: filteredReviews })

  return reviewId
}

export default deleteRoomReview