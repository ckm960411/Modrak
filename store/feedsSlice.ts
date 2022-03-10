import { createSlice } from '@reduxjs/toolkit'
import type { RootState } from 'store/configureStore'
import { FeedWithUserInfoType } from 'types/feedTypes'

interface UserState {
  value: FeedWithUserInfoType[]
  loading: boolean
  error: any | null
}

const initialState: UserState = {
  value: [],
  loading: false,
  error: null
}

export const feedsSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setFeedLoadingTrue: (state) => {
      state.loading = true
    },
    setFeedLoadingfalse: (state) => {
      state.loading = false
    },
    setFeeds: (state, action) => {
      state.value = [...state.value, action.payload]
    },
    addFeeds: (state, action) => {
      state.value = [action.payload, ...state.value]
    },
    clearFeeds: (state) => {
      state.value = []
    },
    updateFeed: (state, action) => {
      const finded = state.value.find(feed => feed.id === action.payload.id)
      if (!finded) return
      finded.feedText = action.payload.feedText,
      finded.feedImages = action.payload.feedImages,
      finded.modifiedAt = action.payload.modifiedAt
    }
  },
  extraReducers: {},
})

export const { 
  setFeedLoadingTrue, 
  setFeedLoadingfalse, 
  setFeeds, 
  addFeeds, 
  clearFeeds,
  updateFeed
} = feedsSlice.actions

export const selectUser = (state: RootState) => state.users.myInfo

export default feedsSlice.reducer