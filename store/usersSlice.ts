import { createSlice } from '@reduxjs/toolkit'
import type { RootState } from 'store/configureStore'

interface UserState {
  myInfo: any | null
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
    loadMyInfoData: (state, action) => {
      state.myInfo = action.payload
    },
    removeMyInfoData: (state) => {
      state.myInfo = null
    },
    setUserLoadingTrue: (state) => {
      state.loading = true
    },
    setUserLoadingfalse: (state) => {
      state.loading = false
    },
  },
  extraReducers: {},
})

export const { loadMyInfoData, removeMyInfoData, setUserLoadingTrue, setUserLoadingfalse } = usersSlice.actions

export const selectUser = (state: RootState) => state.users.myInfo

export default usersSlice.reducer