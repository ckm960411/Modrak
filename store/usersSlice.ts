import { createSlice } from '@reduxjs/toolkit'
import type { RootState } from 'store/configureStore'

interface UserState {
  myInfo: any | null
  loading: boolean
  error: any | null
}

const initialState: UserState = {
  myInfo: null,
  loading: false,
  error: null
}

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    loadMyInfoData: (state, action) => {
      state.myInfo = action.payload
    },
    removeMyInfoData: (state) => {
      state.myInfo = null
    },
    setUserLoadingTrue: (state) => {
      state.loading = true
    },
    setUserLoadingfalse: (state) => {
      state.loading = false
    },
    addFeedInfo: (state, action) => {
      state.myInfo.feeds.unshift(action.payload)
    },
    deleteFeedInfo: (state, action) => {
      state.myInfo.feeds = (state.myInfo.feeds as string[]).filter(feed => feed !== action.payload)
    },
    addLikeFeedRef: (state, action) => {
      state.myInfo.likeFeeds.push(action.payload.feedRef)
    },
    removeLikeFeedRef: (state, action) => {
      state.myInfo.likeFeeds = state.myInfo.likeFeeds.filter((feedRef: string) => feedRef !== action.payload.feedRef)
    }
  },
  extraReducers: {},
})

export const { 
  loadMyInfoData, 
  removeMyInfoData, 
  setUserLoadingTrue, 
  setUserLoadingfalse,
  addFeedInfo,
  deleteFeedInfo,
  addLikeFeedRef,
  removeLikeFeedRef
} = usersSlice.actions

export const selectUser = (state: RootState) => state.users.myInfo

export default usersSlice.reducer