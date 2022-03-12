import { createSlice } from '@reduxjs/toolkit'
import type { RootState } from 'store/configureStore'

interface UserState {
  value: FeedWithUserInfoType[]
  loading: boolean
  editFeedLoading: boolean
  error: any | null
}

const initialState: UserState = {
  value: [],
  loading: false,
  editFeedLoading: false,
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
    setEditFeedLoadingTrue: (state) => {
      state.editFeedLoading = true
    },
    setEditFeedLoadingFalse: (state) => {
      state.editFeedLoading = false
    },
    setFeeds: (state, action) => {
      if (state.value.findIndex(v => v.id === action.payload.id) !== -1) return
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
    },
    deleteFeed: (state, action) => {
      state.value = state.value.filter(feed => feed.id !== action.payload)
    },
    addFeedLikeUserUid: (state, action) => {
      const finded = state.value.find(feed => feed.id === action.payload.feedId)
      if (!finded) return
      finded.likes.push(action.payload.userUid)
    },
    removeFeedLikeUserUid: (state, action) => {
      const finded = state.value.find(feed => feed.id === action.payload.feedId)
      if (!finded) return
      finded.likes = finded.likes.filter(userUid => userUid !== action.payload.userUid)
    },
    addFeedBookmarkUserUid: (state, action) => {
      const finded = state.value.find(feed => feed.id === action.payload.feedId)
      if (!finded) return
      finded.bookmarks.push(action.payload.userUid)
    },
    removeFeedBookmarkUserUid: (state, action) => {
      const finded = state.value.find(feed => feed.id === action.payload.feedId)
      if (!finded) return
      finded.bookmarks = finded.bookmarks.filter(userUid => userUid !== action.payload.userUid)
    },
  },
  extraReducers: {},
})

export const { 
  setFeedLoadingTrue, 
  setFeedLoadingfalse, 
  setEditFeedLoadingTrue,
  setEditFeedLoadingFalse,
  setFeeds, 
  addFeeds, 
  clearFeeds,
  updateFeed,
  deleteFeed,
  addFeedLikeUserUid,
  removeFeedLikeUserUid,
  addFeedBookmarkUserUid,
  removeFeedBookmarkUserUid,
} = feedsSlice.actions

export const selectUser = (state: RootState) => state.users.myInfo

export default feedsSlice.reducer