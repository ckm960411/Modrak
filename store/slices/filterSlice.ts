import { createSlice } from '@reduxjs/toolkit'
import { orderBy, QueryConstraint, where } from 'firebase/firestore'

export interface FilterState {
  value: QueryConstraint[]
}

const initialState: FilterState = {
  value: [],
}

export const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    initializeFilter: (state) => {
      state.value = []
    },
    setFilter: (state, action) => {
      let orderFilter: QueryConstraint[] = []
      switch(action.payload.order as OrderType) {
        case 'latest':
          break
        case 'famous':
          orderFilter = [orderBy("likesCount", "desc")]
          break
        case 'interest':
          orderFilter = [orderBy("bookmarksCount", "desc")]
          break
        default:
          break
      }
      let showFilter: QueryConstraint[] = []
      switch(action.payload.show as ShowType) {
        case 'allShow':
          break
        case 'followingOnly':
          if (action.payload.userUid) {
            showFilter = action.payload.followings.length > 0 
              ? [ where("userUid", "in", action.payload.followings ) ] 
              : []
          }
          break
        case 'myFeedOnly':
          if (action.payload.userUid) {
            showFilter = [where("userUid", "==", action.payload.userUid)]
          }
          break
        default:
          break
      }
      let tagFilter: QueryConstraint[] = []
      switch(action.payload.tag as TagType) {
        case 'allTag':
          break
        case 'accommodationOnly':
          tagFilter = [where("tags", "array-contains", "숙소")]
          break
        case 'restaurantOnly':
          tagFilter = [where("tags", "array-contains", "맛집")]
          break
        default:
          break
      }
      state.value = [ ...showFilter ,...tagFilter, ...orderFilter, ]
    },
    setSearchNicknameFilter: (state, action) => {
      state.value = [ where("userUid", "==", action.payload.userUid) ]
    },
    setSearchTagFilter: (state, action) => {
      state.value = [ where("tags", "array-contains", action.payload.tag) ]
    },
  },
  extraReducers: {},
})

export const { 
  initializeFilter, 
  setFilter, 
  setSearchNicknameFilter,
  setSearchTagFilter
} = filterSlice.actions


export default filterSlice.reducer