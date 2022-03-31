import { createSlice } from '@reduxjs/toolkit'
import { orderBy, QueryConstraint, where } from 'firebase/firestore'

export interface FeedFilterState {
  searchFilter: QueryConstraint[]
  isInitialLoad: boolean
  orderFilter: QueryConstraint[]
  showFilter: QueryConstraint[]
  tagFilter: QueryConstraint[]
}

const initialState: FeedFilterState = {
  searchFilter: [],
  isInitialLoad: true,
  orderFilter: [],
  showFilter: [],
  tagFilter: [],
}

export const feedFilterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    // 피드를 처음 로드하는지 아닌지 isInitialLoad 상태를 변경
    // true 가 들어오면 첫 게시물 몇개를 새로 로드함 (action.payload 로 boolean 이 들어옴)
    setIsInitialLoad: (state, action) => {
      state.isInitialLoad = action.payload
    },
    // 모든 필터 초기화
    initializeFilter: (state) => {
      state.isInitialLoad = true
      state.searchFilter = []
      state.orderFilter = []
      state.showFilter = []
      state.tagFilter = []
    },
    // 최신순(기본), 좋아요순, 찜(북마크)순으로 정렬
    setOrderFilter: (state, action) => {
      state.isInitialLoad = true // 바뀐 필터로 처음부터 불러오기 위함
      state.searchFilter = []
      switch(action.payload as OrderType) {
        case 'latest':
          break
        case 'famous':
          state.orderFilter = [orderBy("likesCount", "desc")]
          break
        case 'interest':
          state.orderFilter = [orderBy("bookmarksCount", "desc")]
          break
        default:
          state.orderFilter = []
          break
      }
    },
    // 전체(기본), 팔로잉 글만, 내 글만 필터링
    setShowFilter: (state, action) => {
      state.isInitialLoad = true
      state.searchFilter = []
      switch(action.payload.show as ShowType) {
        case 'allShow':
          break
        case 'followingOnly':
          if (action.payload.userUid) {
            state.showFilter = action.payload.followings.length > 0 
              ? [ where("userUid", "in", action.payload.followings ) ] 
              : []
          }
          break
        case 'myFeedOnly':
          if (action.payload.userUid) {
            state.showFilter = [where("userUid", "==", action.payload.userUid)]
          }
          break
        default:
          state.showFilter = []
          break
      }
    },
    // 모든태그(기본), 숙소태그만, 맛집태그만 필터링
    setTagFilter: (state, action) => {
      state.isInitialLoad = true
      state.searchFilter = []
      switch(action.payload as TagType) {
        case 'allTag':
          break
        case 'accommodationOnly':
          state.tagFilter = [where("tags", "array-contains", "숙소")]
          break
        case 'restaurantOnly':
          state.tagFilter = [where("tags", "array-contains", "맛집")]
          break
        default:
          state.tagFilter = []
          break
      }
    },
    // 검색된 닉네임의 유저의 글만 필터링
    setSearchNicknameFilter: (state, action) => {
      state.isInitialLoad = true
      state.orderFilter = []
      state.showFilter = []
      state.tagFilter = []
      state.searchFilter = [ where("userUid", "==", action.payload.userUid) ]
    },
    // 검색된 태그의 글만 필터링
    setSearchTagFilter: (state, action) => {
      state.isInitialLoad = true
      state.orderFilter = []
      state.showFilter = []
      state.tagFilter = []
      state.searchFilter = [ where("tags", "array-contains", action.payload.tag) ]
    },
  },
  extraReducers: {},
})

export const { 
  setIsInitialLoad,
  setOrderFilter,
  setShowFilter,
  setTagFilter,
  initializeFilter, 
  setSearchNicknameFilter,
  setSearchTagFilter
} = feedFilterSlice.actions


export default feedFilterSlice.reducer