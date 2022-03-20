import { createSlice } from "@reduxjs/toolkit";
import { QueryConstraint } from "firebase/firestore";

interface RestaurantState {
  value: RestaurantWithId[]
  filter: QueryConstraint[]
  isInitialLoad: boolean
  reviews: ReviewWithUserInfo[]
  loading: boolean
  error: any | null
}
const initialState: RestaurantState = {
  value: [],
  filter: [],
  isInitialLoad: true,
  reviews: [],
  loading: false,
  error: null
}

export const restaurantsSlice = createSlice({
  name: 'restaurants',
  initialState,
  reducers: {    
    // 맛집 리스트를 처음 로드하는지 아닌지 isInitialLoad 상태를 변경
    // true 가 들어오면 첫 리스트 몇개를 새로 로드함 (action.payload 로 boolean 이 들어옴)
    setIsInitialLoad: (state, action) => {
      state.isInitialLoad = action.payload
    },
    // 로드한 맛집리스트를 전역 상태 value 에 저장 (action.payload 로 RestaurantWIthId 객체가 들어옴)
    setRestaurantsData: (state, action) => {
      if (state.value.findIndex(v => v.id === action.payload.id) !== -1) return
      state.value = [ ...state.value, action.payload ]
    },
    // 새로 리스트를 로드하기 위해 기존 value 에 저장되어 있던 피드들을 지움
    clearRestaurantsData: (state) => {
      state.value = []
    },
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
  setIsInitialLoad,
  setRestaurantsData,
  clearRestaurantsData,
  addReview,
  setReviews, 
  clearReviews,
  updateReview,
  deleteReview,
} = restaurantsSlice.actions

export default restaurantsSlice.reducer