import { createSlice } from '@reduxjs/toolkit'
import type { RootState } from 'store/configureStore'

interface UserState {
  value: FeedWithUserInfoType[]
  isInitialLoad: boolean
  loading: boolean
  editFeedLoading: boolean
  error: any | null
}

const initialState: UserState = {
  value: [],
  isInitialLoad: true,
  loading: false,
  editFeedLoading: false,
  error: null
}

export const feedsSlice = createSlice({
  name: 'feeds',
  initialState,
  reducers: {
    setIsInitialLoad: (state, action) => {
      state.isInitialLoad = action.payload
    },
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
      finded.tags = action.payload.tags,
      finded.modifiedAt = action.payload.modifiedAt
    },
    deleteFeed: (state, action) => {
      state.value = state.value.filter(feed => feed.id !== action.payload)
    },
    addFeedLikeUserUid: (state, action) => {
      const finded = state.value.find(feed => feed.id === action.payload.feedId)
      if (!finded) return
      finded.likesCount +1
      finded.likes.push(action.payload.userUid)
    },
    removeFeedLikeUserUid: (state, action) => {
      const finded = state.value.find(feed => feed.id === action.payload.feedId)
      if (!finded) return
      finded.likesCount -1
      finded.likes = finded.likes.filter(userUid => userUid !== action.payload.userUid)
    },
    addFeedBookmarkUserUid: (state, action) => {
      const finded = state.value.find(feed => feed.id === action.payload.feedId)
      if (!finded) return
      finded.bookmarksCount +1
      finded.bookmarks.push(action.payload.userUid)
    },
    removeFeedBookmarkUserUid: (state, action) => {
      const finded = state.value.find(feed => feed.id === action.payload.feedId)
      if (!finded) return
      finded.bookmarksCount -1
      finded.bookmarks = finded.bookmarks.filter(userUid => userUid !== action.payload.userUid)
    },
    // 댓글 추가
    addComment: (state, action) => {
      const finded = state.value.find(feed => feed.id === action.payload.feedId)
      if (!finded) return
      finded.comments.unshift(action.payload)
    },
    // 댓글창을 열 때 서버에서 가져온 댓글들을 저장
    setComments: (state, action) => {
      const finded = state.value.find(feed => feed.id === action.payload.feedId)
      if (!finded) return
      finded.comments = [ action.payload, ...finded.comments ]
    },
    // 모든 댓글 상태들을 지움
    clearComments: (state, action) => {
      const finded = state.value.find(feed => feed.id === action.payload.feedId)
      if (!finded) return
      finded.comments = []
    },
  },
  extraReducers: {},
})

export const { 
  setIsInitialLoad,
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
  addComment,
  setComments,
  clearComments,
} = feedsSlice.actions

export const selectFeed = (state: RootState) => state.feeds.value

export default feedsSlice.reducer