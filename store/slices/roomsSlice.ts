import { createSlice } from "@reduxjs/toolkit";
import { QueryConstraint, where } from "firebase/firestore";
import { onAddRoomReservation, onAddRoomReview, onDeleteRoomReview, onUpdateRoomReview } from "store/asyncFunctions";

export interface RoomState {
  value: AccommodationWithId[]
  roomData: AccommodationWithId | null
  isInitialLoad: boolean
  divisionFilter: QueryConstraint[]
  categoryFilter: QueryConstraint[]
  tagFilter: QueryConstraint[]
  reviews: RoomReviewWithUserInfo[]
  error: any | null
}
const initialState: RoomState = {
  value: [],
  roomData: null,
  isInitialLoad: true,
  divisionFilter: [],
  categoryFilter: [],
  tagFilter: [],
  reviews: [],
  error: null,
}

export const roomsSlice = createSlice({
  name: 'rooms',
  initialState,
  reducers: {
    // 숙소 리스트를 처음 로드하는지 아닌지 isInitialLoad 상태를 변경
    // true 가 들어오면 첫 리스트 몇개를 새로 로드함 (action.payload 로 boolean 이 들어옴)
    setIsInitialLoad: (state, action) => {
      state.isInitialLoad = action.payload
    },
    // 로드한 숙소리스트를 전역 상태 value 에 저장 (action.payload 로 AccommodationWIthId 객체가 들어옴)
    setAccommodationsData: (state, action) => {
      if (state.value.findIndex(v => v.id === action.payload.id) !== -1) return
      state.value = [ ...state.value, action.payload ]
    },
    // 새로 리스트를 로드하기 위해 기존 value 에 저장되어 있던 피드들을 지움
    clearAccommodationsData: (state) => {
      state.value = []
    },
    // 숙소 상세페이지 접속시 숙소 정보를 roomData 에 저장
    addRoomInfo: (state, action) => {
      state.roomData = action.payload
    },
    // 서버에서 가져온 리뷰들을 저장 (action.payload 로 리뷰객체가 1개씩 들어옴)
    setRoomReviews: (state, action) => {
      state.reviews = [ ...state.reviews, action.payload ]
    },
    // 모든 리뷰 상태들을 지움
    clearRoomReviews: (state) => {
      state.reviews = []
    },
    // 위치별 숙소 필터 적용
    setDivisionFilter: (state, action) => {
      state.isInitialLoad = true // 바뀐 필터로 첫 몇개부터 로드하기 위함
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
    // 카테고리별 숙소 필터 적용
    setCategoryFilter: (state, action) => {
      state.isInitialLoad = true // 바뀐 필터로 첫 몇개부터 로드하기 위함
      switch (action.payload.category as AccommodationCategories) {
        case '전체':
          state.categoryFilter = []
          break
        case '호텔': 
          state.categoryFilter = [ where("category", "==", "호텔") ]
          break
        case '캠핑':
          state.categoryFilter = [ where("category", "==", "모텔") ]
          break
        case '펜션':
          state.categoryFilter = [ where("category", "==", "펜션") ]
          break
        case '게스트하우스':
          state.categoryFilter = [ where("category", "==", "게스트하우스") ]
          break
        default:
          state.categoryFilter = []
          break
      }
    },
    // 태그별 숙소 필터 적용
    setTagFilter: (state, action) => {
      state.isInitialLoad = true // 바뀐 필터로 첫 몇개부터 로드하기 위함
      switch (action.payload.tag as AccommodationTags) {
        case '전체':
          state.tagFilter = []
          break
        case '오션뷰':
          state.tagFilter = [ where("tags", "array-contains", "오션뷰") ]
          break
        case '5성급':
          state.tagFilter = [ where("tags", "array-contains", "5성급") ]
          break
        case '독채':
          state.tagFilter = [ where("tags", "array-contains", "독채") ]
          break
        case '아이와함께':
          state.tagFilter = [ where("tags", "array-contains", "아이와함께") ]
          break
        case '가성비숙소':
          state.tagFilter = [ where("tags", "array-contains", "가성비숙소") ]
          break
        default:
          state.tagFilter = []
          break
      }
    },
  },
  extraReducers: {
    // 숙소 예약시 예약된 날짜를 저장해 예약이 안 되도록 막음
    // action.payload 로 예약할 객실의 id 인 roomId 와 예약한 날짜들이 담긴 newReservedDates 배열이 옴
    [onAddRoomReservation.fulfilled.type]: (state, action) => {
      const findedRoom = state.roomData?.rooms.find(room => room.roomId === action.payload.roomId)
      if (!findedRoom) return
      findedRoom.reservedDates = [ ...findedRoom.reservedDates, ...action.payload.newReservedDates ]
    },
    [onAddRoomReservation.rejected.type]: (state, action) => {
      state.error = "객실 예약 도중 예상 못한 에러가 발생했습니다. 다시 시도해주세요!"
    },
    // 리뷰 작성시 기존 리뷰 제일 위에 추가 (action.payload 로 리뷰객체가 1개씩 들어옴)
    [onAddRoomReview.fulfilled.type]: (state, action) => {
      state.reviews.unshift(action.payload)
    },
    [onAddRoomReview.rejected.type]: (state, action) => {
      state.error = "리뷰 작성 도중 예상 못한 에러가 발생했습니다. 다시 시도해주세요!"
    },
    // 수정하려는 리뷰를 찾아 해당 리뷰를 수정함
    // (action.payload 에는 reviewId, reviewText, reviewImages, modifiedAt 이 객체로 들어옴)
    [onUpdateRoomReview.fulfilled.type]: (state, action) => {
      const finded = state.reviews.find(review => review.reviewId === action.payload.reviewId)
      if (!finded) return
      finded.reviewText = action.payload.reviewText
      finded.reviewImages = action.payload.reviewImages
      finded.modifiedAt = action.payload.modifiedAt
      finded.rating = action.payload.rating
    },
    [onUpdateRoomReview.rejected.type]: (state, action) => {
      state.error = "리뷰 수정 도중 예상 못한 에러가 발생했습니다. 다시 시도해주세요!"
    },
    // 삭제하려는 리뷰를 찾아 해당 리뷰를 삭제함 (action.payload 로 reviewId 가 옴)
    [onDeleteRoomReview.fulfilled.type]: (state, action) => {
      state.reviews = state.reviews.filter(review => review.reviewId !== action.payload)
    },
    [onDeleteRoomReview.rejected.type]: (state, action) => {
      state.error = "리뷰 삭제 도중 예상 못한 에러가 발생했습니다. 다시 시도해주세요!"
    },
  },
})

export const {
  setIsInitialLoad,
  setAccommodationsData,
  clearAccommodationsData,
  addRoomInfo,
  setRoomReviews,
  clearRoomReviews,
  setDivisionFilter,
  setCategoryFilter,
  setTagFilter,
} = roomsSlice.actions

export default roomsSlice.reducer