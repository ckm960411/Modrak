import { createSlice } from "@reduxjs/toolkit";

interface RestaurantState {
  reviews: ReviewWithUserInfo[]
  loading: boolean
  error: any | null
}
const initialState: RestaurantState = {
  reviews: [],
  loading: false,
  error: null
}

export const restaurantsSlice = createSlice({
  name: 'restaurants',
  initialState,
  reducers: {
    // 리뷰 작성시 기존 리뷰 제일 위에 추가 (action.payload 로 리뷰객체가 1개씩 들어옴)
    addReview: (state, action) => {
      state.reviews.unshift(action.payload)
    },
    // 서버에서 가져온 리뷰들을 저장 (action.payload 로 리뷰객체가 1개씩 들어옴)
    setReviews: (state, action) => {
      state.reviews = [ ...state.reviews, action.payload ]
    },
    // 모든 리뷰 상태들을 지움
    clearReviews: (state) => {
      state.reviews = []
    },
    // 수정하려는 리뷰를 찾아 해당 리뷰를 수정함
    // (action.payload 에는 reviewId, reviewText, reviewImages, modifiedAt 이 객체로 들어옴)
    updateReview: (state, action) => {
      const finded = state.reviews.find(review => review.reviewId === action.payload.reviewId)
      if (!finded) return
      finded.reviewText = action.payload.reviewText
      finded.reviewImages = action.payload.reviewImages
      finded.modifiedAt = action.payload.modifiedAt
      finded.rating = action.payload.rating
    },
    // 삭제하려는 리뷰를 찾아 해당 리뷰를 삭제함
    // (action.payload 에는 reviewId 를 담은 객체가 들어옴)
    deleteReview: (state, action) => {
      state.reviews = state.reviews.filter(review => review.reviewId !== action.payload.reviewId)
    },
  },
  extraReducers: {}
})

export const { 
  addReview,
  setReviews, 
  clearReviews,
  updateReview,
  deleteReview,
} = restaurantsSlice.actions

export default restaurantsSlice.reducer