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
  },
  extraReducers: {},
})

export const {
  setUserData,
} = profileSlice.actions

export default profileSlice.reducer