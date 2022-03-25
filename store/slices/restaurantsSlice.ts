import { createSlice } from "@reduxjs/toolkit";
import { QueryConstraint, where } from "firebase/firestore";

export interface RestaurantState {
  value: RestaurantWithId[]
  isInitialLoad: boolean
  divisionFilter: QueryConstraint[]
  categoryFilter: QueryConstraint[]
  tagFilter: QueryConstraint[]
  reviews: RestaurantReviewWithUserInfo[]
  loading: boolean
  error: any | null
}
const initialState: RestaurantState = {
  value: [],
  divisionFilter: [],
  categoryFilter: [],
  tagFilter: [],
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
    addRestaurantReview: (state, action) => {
      state.reviews.unshift(action.payload)
    },
    // 서버에서 가져온 리뷰들을 저장 (action.payload 로 리뷰객체가 1개씩 들어옴)
    setRestaurantReviews: (state, action) => {
      state.reviews = [ ...state.reviews, action.payload ]
    },
    // 모든 리뷰 상태들을 지움
    clearRestaurantReviews: (state) => {
      state.reviews = []
    },
    // 수정하려는 리뷰를 찾아 해당 리뷰를 수정함
    // (action.payload 에는 reviewId, reviewText, reviewImages, modifiedAt 이 객체로 들어옴)
    updateRestaurantReview: (state, action) => {
      const finded = state.reviews.find(review => review.reviewId === action.payload.reviewId)
      if (!finded) return
      finded.reviewText = action.payload.reviewText
      finded.reviewImages = action.payload.reviewImages
      finded.modifiedAt = action.payload.modifiedAt
      finded.rating = action.payload.rating
    },
    // 삭제하려는 리뷰를 찾아 해당 리뷰를 삭제함
    // (action.payload 에는 reviewId 를 담은 객체가 들어옴)
    deleteRestaurantReview: (state, action) => {
      state.reviews = state.reviews.filter(review => review.reviewId !== action.payload.reviewId)
    },
    // 위치별 맛집 필터 적용
    setDivisionFilter: (state, action) => {
      state.isInitialLoad = true // 바뀐 필터로 첫 9개부터 로드하기 위함
      switch (action.payload.division as DivisionType) {
        case '전체 지역': 
          state.divisionFilter = []
          break
        case '제주시':
          state.divisionFilter = [ where("division", "==", "제주시") ]
          break
        case '애월':
          state.divisionFilter = [ where("division", "==", "애월") ]
          break
        case '한경/한림':
          state.divisionFilter = [ where("division", "==", "한경/한림") ]
          break
        case '대정/안덕':
          state.divisionFilter = [ where("division", "==", "대정/안덕") ]
          break
        case '서귀포':
          state.divisionFilter = [ where("division", "==", "서귀포") ]
          break
        case '남원':
          state.divisionFilter = [ where("division", "==", "남원") ]
          break
        case '표선/성산':
          state.divisionFilter = [ where("division", "==", "표선/성산") ]
          break
        case '구좌':
          state.divisionFilter = [ where("division", "==", "구좌") ]
          break
        case '조천':
          state.divisionFilter = [ where("division", "==", "조천") ]
          break
        default:
          state.divisionFilter = []
          break
      }
    },
    // 카테고리별 맛집 필터 적용
    setCategoryFilter: (state, action) => {
      state.isInitialLoad = true // 바뀐 필터로 첫 9개부터 로드하기 위함
      switch (action.payload.category as FoodCategory) {
        case '전체':
          state.categoryFilter = []
          break
        case '한식/분식': 
          state.categoryFilter = [ where("category", "==", "한식/분식") ]
          break
        case '양식':
          state.categoryFilter = [ where("category", "==", "양식") ]
          break
        case '일식/중식':
          state.categoryFilter = [ where("category", "==", "일식/중식") ]
          break
        case '카페':
          state.categoryFilter = [ where("category", "==", "카페") ]
          break
        default:
          state.categoryFilter = []
          break
      }
    },
    // 태그별 맛집 필터 적용
    setTagFilter: (state, action) => {
      state.isInitialLoad = true // 바뀐 필터로 첫 9개부터 로드하기 위함
      switch (action.payload.tag as Tags) {
        case '전체':
          state.tagFilter = []
          break
        case '로컬맛집':
          state.tagFilter = [ where("tags", "array-contains", "로컬맛집") ]
          break
        case '데이트':
          state.tagFilter = [ where("tags", "array-contains", "데이트") ]
          break
        case '가족식사':
          state.tagFilter = [ where("tags", "array-contains", "가족식사") ]
          break
        case '모임':
          state.tagFilter = [ where("tags", "array-contains", "모임") ]
          break
        case '혼밥/혼술':
          state.tagFilter = [ where("tags", "array-contains", "혼밥/혼술") ]
          break
        default:
          state.tagFilter = []
          break
      }
    },
  },
  extraReducers: {}
})

export const { 
  setIsInitialLoad,
  setRestaurantsData,
  clearRestaurantsData,
  addRestaurantReview,
  setRestaurantReviews, 
  clearRestaurantReviews,
  updateRestaurantReview,
  deleteRestaurantReview,
  setDivisionFilter,
  setCategoryFilter,
  setTagFilter,
} = restaurantsSlice.actions

export default restaurantsSlice.reducer