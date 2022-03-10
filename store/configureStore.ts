import { configureStore } from '@reduxjs/toolkit'
import userReducer from 'store/usersSlice'
import feedReducer from 'store/feedsSlice'

export const store = configureStore({
  reducer: {
    users: userReducer,
    feeds: feedReducer,
  },
  middleware: (getDefaultMiddleware) => 
    getDefaultMiddleware({
      serializableCheck: false
    })
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch