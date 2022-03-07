import { createSlice } from '@reduxjs/toolkit'
import type { RootState } from 'store/configureStore'

interface UserState {
  myInfo: any | null
  loading: boolean
  error: { errorMessage: string } | null
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
    }
  },
  extraReducers: {},
})

export const { loadMyInfoData } = usersSlice.actions

export const selectUser = (state: RootState) => state.users.myInfo

export default usersSlice.reducer