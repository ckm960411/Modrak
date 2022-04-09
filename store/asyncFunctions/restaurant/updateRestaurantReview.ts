import { createAsyncThunk } from "@reduxjs/toolkit"
import { updateDoc } from "firebase/firestore"
import searchFirestoreDoc from "utils/functions/searchFirestoreDoc"
import uploadImagesDB from "utils/functions/uploadImagesDB"

export const onUpdateRestaurantReview = createAsyncThunk(
  "UPDATE_RESTAURANT_REIVEW",
  async (data: UpdateRestaurantReview) => {
    const reviewData = await updateRestaurantReview(data)
    return reviewData
  }
)

const updateRestaurantReview = async (updateData: UpdateRestaurantReview) => {
  const { uid, restaurantId, reviewId, reviewText, images, rating } = updateData
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
  const { searchedDocRef: reviewDocRef, searchedData: searchedReviewData } = await searchFirestoreDoc(`reviews/${restaurantId}`)
  const reviewsArray = searchedReviewData!.reviews
  const reviewIndex = reviewsArray.findIndex((review: RestaurantReviewType) => review.reviewId === reviewId)
  reviewsArray[reviewIndex].reviewText = reviewData.reviewText
  reviewsArray[reviewIndex].modifiedAt = reviewData.modifiedAt
  reviewsArray[reviewIndex].reviewImages = reviewData.reviewImages
  reviewsArray[reviewIndex].rating = reviewData.rating
  await updateDoc(reviewDocRef, { reviews: reviewsArray })

  return reviewData
}

export default updateRestaurantReview