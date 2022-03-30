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
    initializeFilter: (state) => {
      state.isInitialLoad = true
      state.searchFilter = []
      state.orderFilter = []
      state.showFilter = []
      state.tagFilter = []
    },
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
    setSearchNicknameFilter: (state, action) => {
      state.isInitialLoad = true
      state.orderFilter = []
      state.showFilter = []
      state.tagFilter = []
      state.searchFilter = [ where("userUid", "==", action.payload.userUid) ]
    },
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