import { createSlice } from "@reduxjs/toolkit";

export interface UserDataState {
  userData: UserType | null
}
const initialState: UserDataState = {
  userData: null,
}

export const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    // 프로필 페이지 진입시 해당 페이지 유저의 정보를 전역 상태 userData 에 저장
    setUserData: (state, action) => {
      state.userData = action.payload
    },
    // 프로필 이미지 변경 (action.payload 로 newProfileImg 가 옴)
    updateUserProfileImg: (state, action) => {
      state.userData!.profileImg = action.payload
    },
    // 프로필 닉네임 변경
    updateUserNickname: (state, action) => {
      state.userData!.nickname = action.payload.newNickname
    },
  },
  extraReducers: {},
})

export const {
  setUserData,
  updateUserProfileImg,
  updateUserNickname,
} = profileSlice.actions

export default profileSlice.reducer