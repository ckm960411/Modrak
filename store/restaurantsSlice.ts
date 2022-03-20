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
  },
  extraReducers: {}
})

export const { 
  addReview,
  setReviews, 
  clearReviews
} = restaurantsSlice.actions

export default restaurantsSlice.reducer