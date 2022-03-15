import { createSlice } from '@reduxjs/toolkit'
import type { RootState } from 'store/configureStore'

interface UserState {
  myInfo: UserType | null
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
    // 로그인 상태일 경우 로그인한 유저의 모든정보를 전역 상태 myInfo 에 저장 (action.payload 로 객체가 옴)
    loadMyInfoData: (state, action) => {
      state.myInfo = action.payload
    },
    // 로그아웃시 myInfo 에 저장되어 있던 유저 정보를 제거
    removeMyInfoData: (state) => {
      state.myInfo = null
    },
    // 피드를 작성하면 피드 참조주소를 myInfo.feeds 배열에 저장 (action.payload 가 `feeds/${id}` 형태로 들어옴)
    addFeedInfo: (state, action) => {
      state.myInfo!.feeds.unshift(action.payload)
    },
    // 삭제된 피드의 참조를 사용자 정보에서 제거 (action.payload 로 `feeds/${id}` 로 들어옴)
    deleteFeedInfo: (state, action) => {
      state.myInfo!.feeds = state.myInfo!.feeds.filter(feed => feed !== action.payload)
    },
    // 좋아요/취소한 피드의 참조주소를 myInfo.likeFeeds 배열에 추가/제거함
    // action.payload 가 { feedRef: `feeds/${feedId}` } 형태의 객체로 들어옴
    addLikeFeedRef: (state, action) => {
      state.myInfo!.likeFeeds.push(action.payload.feedRef)
    },
    removeLikeFeedRef: (state, action) => {
      state.myInfo!.likeFeeds = state.myInfo!.likeFeeds.filter((feedRef: string) => feedRef !== action.payload.feedRef)
    },
    // 북마크/취소한 피드의 참조주소를 MyInfo.bookmarkFeeds 배열에 추가/제거함
    // action.payload 가 { feedRef: `feeds/${feedId}` } 형태의 객체로 들어옴
    addBookmarkFeedRef: (state, action) => {
      state.myInfo!.bookmarkFeeds.push(action.payload.feedRef)
    },
    removeBookmarkFeedRef: (state, action) => {
      state.myInfo!.bookmarkFeeds = state.myInfo!.bookmarkFeeds.filter((feedRef: string) => feedRef !== action.payload.feedRef)
    },
    // 상대방 팔로우
    addFollowings: (state, action) => {
      state.myInfo!.followings.push(action.payload.userUid)
      state.myInfo!.followingsCount = state.myInfo!.followingsCount +1
    },
    // 상대방 언팔로우
    removeFollowings: (state, action) => {
      state.myInfo!.followings = state.myInfo!.followings.filter(followingId => followingId !== action.payload.userUid)
      state.myInfo!.followingsCount = state.myInfo!.followingsCount -1
    },
  },
  extraReducers: {},
})

export const { 
  loadMyInfoData, 
  removeMyInfoData, 
  addFeedInfo,
  deleteFeedInfo,
  addLikeFeedRef,
  removeLikeFeedRef,
  addBookmarkFeedRef,
  removeBookmarkFeedRef,
  addFollowings,
  removeFollowings,
} = usersSlice.actions

export const selectUser = (state: RootState) => state.users.myInfo

export default usersSlice.reducer