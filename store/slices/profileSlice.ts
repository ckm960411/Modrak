import { createSlice } from "@reduxjs/toolkit";

export interface UserDataState {
  userData: UserType | null
  isMyProfile: boolean
}
const initialState: UserDataState = {
  userData: null,
  isMyProfile: false
}

export const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    // 프로필 페이지 진입시 해당 페이지 유저의 정보를 전역 상태 userData 에 저장
    setUserData: (state, action) => {
      state.userData = action.payload
    },
    // 내 프로필인 경우 isMyProfile 을 true 반대는 false 로 변경 (action.payload 로 true/false 가 옴)
    setIsMyProfile: (state, action) => {
      state.isMyProfile = action.payload
    },
  },
  extraReducers: {},
})

export const {
  setUserData,
  setIsMyProfile,
} = profileSlice.actions

export default profileSlice.reducer