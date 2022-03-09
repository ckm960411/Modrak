import { configureStore } from '@reduxjs/toolkit'
import userReducer from 'store/usersSlice'
import feedReducer from 'store/feedsSlice'

export const store = configureStore({
  reducer: {
    users: userReducer,
    feeds: feedReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch