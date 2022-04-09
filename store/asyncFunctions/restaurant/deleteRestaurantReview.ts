import { createAsyncThunk } from "@reduxjs/toolkit"
import { updateDoc } from "firebase/firestore"
import searchFirestoreDoc from "utils/functions/searchFirestoreDoc"

export const onDeleteRestaurantReview = createAsyncThunk(
  "DELETE_RESTAURANT_REVIEW",
  async (data: DeleteRestaurantReview) => {
    const reviewId = await deleteRestaurantReview(data)
    return reviewId
  }
)

const deleteRestaurantReview = async (data: DeleteRestaurantReview) => {
  const { restaurantId, reviewId } = data
  const { searchedDocRef: reviewDocRef, searchedData: reviewData } = await searchFirestoreDoc(`reviews/${restaurantId}`)
  const reviewsArray = reviewData!.reviews
  const filteredReviews = reviewsArray.filter((review: RestaurantReviewType) => review.reviewId !== reviewId)
  await updateDoc(reviewDocRef, { reviews: filteredReviews })

  return reviewId
}

export default deleteRestaurantReview