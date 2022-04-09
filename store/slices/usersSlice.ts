import { createSlice } from '@reduxjs/toolkit'
import { 
  onAddBookmarkAccommodation,
  onAddBookmarkRestaurant,
  onAddFollowing,
  onAddRecommendRestaurant,
  onAddRoomInfoAndPush,
  onRemoveBookmarkAccommodation,
  onRemoveBookmarkRestaurant,
  onRemoveCheckedPush,
  onRemoveFollowing,
  onRemoveRecommendRestaurant,
  onUpdateNickname,
  onUpdateProfileImg,
} from 'store/asyncFunctions'

export interface UserState {
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
  },
  extraReducers: {
    // 상대방 팔로우: 내 팔로잉에 상대 id 를 추가하고 팔로잉수 +1 증가 (action.payload 로 상대 userUid 가 옴)
    [onAddFollowing.fulfilled.type]: (state, action) => {
      state.myInfo!.followings.push(action.payload)
      state.myInfo!.followingsCount = state.myInfo!.followingsCount +1
    },
    [onAddFollowing.rejected.type]: (state, action) => {
      state.error = "팔로잉 도중 예상 못한 에러가 발생했습니다. 다시 시도해주세요!"
    },
    // 상대방 언팔로우: 내 팔로잉에 상대 id 를 제거하고 팔로잉수 -1 감소
    [onRemoveFollowing.fulfilled.type]: (state, action) => {
      state.myInfo!.followings = state.myInfo!.followings.filter(followingId => followingId !== action.payload)
      state.myInfo!.followingsCount = state.myInfo!.followingsCount -1
    },
    [onRemoveFollowing.rejected.type]: (state, action) => {
      state.error = "팔로잉 취소 도중 예상 못한 에러가 발생했습니다. 다시 시도해주세요!"
    },
    // 맛집 추천 id 등록 (action.payload 로 restaurantId 가 옴)
    [onAddRecommendRestaurant.fulfilled.type]: (state, action) => {
      state.myInfo!.recommendRestaurants.push(action.payload)
    },
    [onAddRecommendRestaurant.rejected.type]: (state, action) => {
      state.error = "맛집 추천 도중 예상 못한 에러가 발생했습니다. 다시 시도해주세요!"
    },
    // 맛집 추천 취소 (action.payload 로 restaurantId 가 옴)
    [onRemoveRecommendRestaurant.fulfilled.type]: (state, action) => {
      state.myInfo!.recommendRestaurants = state.myInfo!.recommendRestaurants.filter(restId => restId !== action.payload)
    },
    [onRemoveRecommendRestaurant.rejected.type]: (state, action) => {
      state.error = "맛집 추천 취소 중 예상 못한 에러가 발생했습니다. 다시 시도해주세요!"
    },
    // 맛집 찜(북마크) id 등록 (action.payload 로 restaurantId 가 옴)
    [onAddBookmarkRestaurant.fulfilled.type]: (state, action) => {
      state.myInfo!.bookmarkRestaurants.push(action.payload)
    },
    [onAddBookmarkRestaurant.rejected.type]: (state, action) => {
      state.error = "맛집 찜 도중 예상 못한 에러가 발생했습니다. 다시 시도해주세요!"
    },
    // 맛집 찜(북마크) 취소 (action.payload 로 restaurantId 가 옴)
    [onRemoveBookmarkRestaurant.fulfilled.type]: (state, action) => {
      state.myInfo!.bookmarkRestaurants = state.myInfo!.bookmarkRestaurants.filter(restId => restId !== action.payload)
    },
    [onRemoveBookmarkRestaurant.rejected.type]: (state, action) => {
      state.error = "맛집 찜 취소 도중 예상 못한 에러가 발생했습니다. 다시 시도해주세요!"
    },
    // 숙소 찜(북마크) id 등록 (action.payload 로 accommodationId 가 옴)
    [onAddBookmarkAccommodation.fulfilled.type]: (state, action) => {
      state.myInfo!.bookmarkAccommodations.push(action.payload)
    },
    [onAddBookmarkAccommodation.rejected.type]: (state, action) => {
      state.error = "숙소 찜 도중 예상 못한 에러가 발생했습니다. 다시 시도해주세요!"
    },
    // 숙소 찜(북마크) id 취소 (action.payload 로 accommodationId 가 옴)
    [onRemoveBookmarkAccommodation.fulfilled.type]: (state, action) => {
      state.myInfo!.bookmarkAccommodations = state.myInfo!.bookmarkAccommodations.filter(accId => accId !== action.payload)
    },
    [onRemoveBookmarkAccommodation.rejected.type]: (state, action) => {
      state.error = "숙소 찜 취소 도중 예상 못한 에러가 발생했습니다. 다시 시도해주세요!"
    },
    // 예약한 객실 데이터를 유저 정보에 저장하고 알림을 보냄
    // action.payload 로 { accommodationId, roomId, reservedDates, newPush } 가 옴
    [onAddRoomInfoAndPush.fulfilled.type]: (state, action) => {
      const { accommodationId, roomId, reservedDates, newPush } = action.payload
      state.myInfo!.roomReserved.push({ accommodationId, roomId, reservedDates })
      state.myInfo!.pushUnchecked.push(newPush)
    },
    [onAddRoomInfoAndPush.rejected.type]: (state, action) => {
      state.error = "객실 예약 도중 예상 못한 에러가 발생했습니다. 다시 시도해주세요!"
    },
    // 상단 네비바에서 알림 확인시 myInfo.pushUnchecked 에서 제거 (action.payload 로 pushId 가 옴)
    [onRemoveCheckedPush.fulfilled.type]: (state, action) => {
      state.myInfo!.pushUnchecked = state.myInfo!.pushUnchecked.filter(push => push.pushId !== action.payload)
    },
    [onRemoveCheckedPush.rejected.type]: (state, action) => {
      state.error = "예상 못한 에러가 발생했습니다. 다시 시도해주세요!"
    },
    // 프로필 이미지 변경 (action.payload 로 newProfileImg 가 옴)
    [onUpdateProfileImg.fulfilled.type]: (state, action) => {
      state.myInfo!.profileImg = action.payload
    },
    [onUpdateProfileImg.rejected.type]: (state, action) => {
      state.error = "프로필 사진 변경 중 예상 못한 에러가 발생했습니다. 다시 시도해주세요!"
    },
    // 프로필 닉네임 변경 (action.payload 로 nickname 이 옴)
    [onUpdateNickname.fulfilled.type]: (state, action) => {
      state.myInfo!.nickname = action.payload
    },
    [onUpdateNickname.rejected.type]: (state, action) => {
      state.error = "닉네임 변경 중 예상 못한 에러가 발생했습니다. 다시 시도해주세요!"
    },
  },
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
} = usersSlice.actions


export default usersSlice.reducer