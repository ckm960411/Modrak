import { createAsyncThunk } from "@reduxjs/toolkit"
import { updateDoc } from "firebase/firestore"
import searchFirestoreDoc from "utils/functions/searchFirestoreDoc"
import uploadImagesDB from "utils/functions/uploadImagesDB"

export const onUpdateRoomReview = createAsyncThunk(
  "UPDATE_ROOM_REVIEW",
  async (data: UpdateRoomReview) => {
    const reviewData = await updateRoomReview(data)
    return reviewData
  }
)

const updateRoomReview = async (data: UpdateRoomReview) => {
  const { uid, accommodationId, reviewId, reviewText, images, rating } = data
  const shouldUpload = images.filter(img => img.startsWith('data:image'))
  const shouldNotUpload = images.filter(img => !img.startsWith('data:image'))
  const newImagesURLs = await uploadImagesDB(shouldUpload, uid)
  const reviewData = {
    reviewText,
    reviewImages: [...shouldNotUpload, ...newImagesURLs!],
    rating,
    reviewId,
    modifiedAt: Date.now(),
  }
  const { searchedDocRef: reviewDocRef, searchedData: searchedReviewData } = await searchFirestoreDoc(`reviews/${accommodationId}`)
  const reviewsArray = searchedReviewData!.reviews
  const reviewIndex = reviewsArray.findIndex((review: RoomReviewType) => review.reviewId === reviewId)
  reviewsArray[reviewIndex].reviewText = reviewData.reviewText
  reviewsArray[reviewIndex].modifiedAt = reviewData.modifiedAt
  reviewsArray[reviewIndex].reviewImages = reviewData.reviewImages
  reviewsArray[reviewIndex].rating = reviewData.rating
  await updateDoc(reviewDocRef, { reviews: reviewsArray })

  return reviewData
}

export default updateRoomReview