import { createSlice } from '@reduxjs/toolkit'
import type { RootState } from 'store/configureStore'

interface UserState {
  value: any | null
  loading: boolean
  error: any | null
}

const initialState: UserState = {
  value: null,
  loading: false,
  error: null
}

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setFeedLoadingTrue: (state) => {
      state.loading = true
    },
    setFeedLoadingfalse: (state) => {
      state.loading = false
    },
  },
  extraReducers: {},
})

export const { setFeedLoadingTrue, setFeedLoadingfalse } = usersSlice.actions

export const selectUser = (state: RootState) => state.users.myInfo

export default usersSlice.reducer