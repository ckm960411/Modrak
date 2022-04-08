import { createSlice } from '@reduxjs/toolkit'
import { onDeleteFeed, onSubmitNewFeed, onUpdateFeed } from 'store/asyncFunctions'

export interface FeedState {
  value: FeedWithUserInfoType[]
  error: any | null
}

const initialState: FeedState = {
  value: [],
  error: null
}

export const feedsSlice = createSlice({
  name: 'feeds',
  initialState,
  reducers: {
    // 로드한 피드들을 전역 상태 value 에 저장 (action.payload 로 FeedWithUserInfoType 객체가 들어옴)
    setFeeds: (state, action) => {
      if (state.value.findIndex(v => v.id === action.payload.id) !== -1) return
      state.value = [...state.value, action.payload ]
    },
    // 새로 게시물을 로드하기 위해 기존 value 에 저장되어 있던 피드들을 지움
    clearFeeds: (state) => {
      state.value = []
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
    // 댓글을 삭제하려는 피드id 를 찾아 해당 댓글을 삭제함
    // (action.payload 에는 feedId, commentId 가 객체로 들어옴)
    deleteComment: (state, action) => {
      const finded = state.value.find(feed => feed.id === action.payload.feedId)
      if (!finded) return
      const filteredComments = finded.comments.filter(comment => comment.id !== action.payload.commentId)
      finded.comments = filteredComments
    },
  },
  extraReducers: {
    // 새로 작성한 피드를 전역 상태 value 맨앞에 저장 (action.payload 로 FeedWithUserInfoType 객체가 들어옴)
    [onSubmitNewFeed.fulfilled.type]: (state, action) => {
      state.value = [action.payload, ...state.value]
    },
    [onSubmitNewFeed.rejected.type]: (state, action) => {
      state.error = "게시글 작성중 예상 못한 에러가 발생했습니다. 다시 시도해주세요!"
    },
    // 수정된 피드의 정보를 찾아서 수정 (action.payload 로 feedId 를 포함해 수정할 정보만 담긴 객체가 옴)
    [onUpdateFeed.fulfilled.type]: (state, action) => {
      const finded = state.value.find(feed => feed.id === action.payload.feedId)
      if (!finded) return
      finded.feedText = action.payload.feedText,
      finded.feedImages = action.payload.feedImages,
      finded.tags = action.payload.tags,
      finded.modifiedAt = action.payload.modifiedAt
    },
    [onUpdateFeed.rejected.type]: (state, action) => {
      state.error = "게시글 수정중 예상 못한 에러가 발생했습니다. 다시 시도해주세요!"
    },
    // 삭제할 피드 id 를 찾아 value 에서 제거 (action.payload 로 feedId 가 옴)
    [onDeleteFeed.fulfilled.type]: (state, action) => {
      state.value = state.value.filter(feed => feed.id !== action.payload)
    },
    [onDeleteFeed.rejected.type]: (state, action) => {
      state.error = "게시글 삭제중 예상 못한 에러가 발생했습니다. 다시 시도해주세요!"
    },
  },
})

export const { 
  setFeeds, 
  clearFeeds,
  addFeedLikeUserUid,
  removeFeedLikeUserUid,
  addFeedBookmarkUserUid,
  removeFeedBookmarkUserUid,
  addComment,
  setComments,
  clearComments,
  updateComment,
  deleteComment,
} = feedsSlice.actions


export default feedsSlice.reducer