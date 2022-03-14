import { createSlice } from '@reduxjs/toolkit'
import type { RootState } from 'store/configureStore'

interface UserState {
  value: FeedWithUserInfoType[]
  isInitialLoad: boolean
  error: any | null
}

const initialState: UserState = {
  value: [],
  isInitialLoad: true,
  error: null
}

export const feedsSlice = createSlice({
  name: 'feeds',
  initialState,
  reducers: {
    // 피드를 처음 로드하는지 아닌지 isInitialLoad 상태를 변경
    // true 가 들어오면 첫 게시물 몇개를 새로 로드함 (action.payload 로 boolean 이 들어옴)
    setIsInitialLoad: (state, action) => {
      state.isInitialLoad = action.payload
    },
    // 로드한 피드들을 전역 상태 value 에 저장 (action.payload 로 FeedWithUserInfoType 객체가 들어옴)
    setFeeds: (state, action) => {
      if (state.value.findIndex(v => v.id === action.payload.id) !== -1) return
      state.value = [...state.value, action.payload]
    },
    // 새로 작성한 피드를 전역 상태 value 맨앞에 저장 (action.payload 로 FeedWithUserInfoType 객체가 들어옴)
    addFeeds: (state, action) => {
      state.value = [action.payload, ...state.value]
    },
    // 새로 게시물을 로드하기 위해 기존 value 에 저장되어 있던 피드들을 지움
    clearFeeds: (state) => {
      state.value = []
    },
    // 수정된 피드의 정보를 찾아서 수정 (action.payload 로 feedId 를 포함해 수정할 정보만 담긴 객체가 옴)
    updateFeed: (state, action) => {
      const finded = state.value.find(feed => feed.id === action.payload.feedId)
      if (!finded) return
      finded.feedText = action.payload.feedText,
      finded.feedImages = action.payload.feedImages,
      finded.tags = action.payload.tags,
      finded.modifiedAt = action.payload.modifiedAt
    },
    // 삭제할 피드 id 를 찾아 value 에서 제거 (action.payload 로 삭제할 feedId 를 담은 객체가 옴)
    deleteFeed: (state, action) => {
      state.value = state.value.filter(feed => feed.id !== action.payload.feedId)
    },
    // 피드를 좋아요/취소한 유저id 를 likes 배열에 저장/제거하고 피드의 likesCount 를 +1/-1 시킴 
    // (action.payload 로 feedId, userUid 를 담은 객체가 옴)
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
    // 피드를 북마크/취소한 유저id 를 bookmarks 배열에 저장/제거하고 피드의 bookmarksCount 를 +1/-1 시킴
    // (action.payload 로 feedId, userUid 를 담은 객체가 옴)
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
      finded.comments = [ ...finded.comments, action.payload ]
    },
    // 모든 댓글 상태들을 지움
    clearComments: (state, action) => {
      const finded = state.value.find(feed => feed.id === action.payload.feedId)
      if (!finded) return
      finded.comments = []
    },
    // 댓글을 수정하려는 피드id 를 찾아 해당 댓글을 수정함
    // (action.payload 에는 feedId, commentId, editText, modifiedAt 이 객체로 들어옴)
    updateComment: (state, action) => {
      const finded = state.value.find(feed => feed.id === action.payload.feedId)
      if (!finded) return
      const findedComment = finded.comments.find(comment => comment.id === action.payload.commentId)
      if (!findedComment) return
      findedComment.commentText = action.payload.editText
      findedComment.modifiedAt = action.payload.modifiedAt
    },
  },
  extraReducers: {},
})

export const { 
  setIsInitialLoad,
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
  updateComment,
} = feedsSlice.actions

export const selectFeed = (state: RootState) => state.feeds.value

export default feedsSlice.reducer