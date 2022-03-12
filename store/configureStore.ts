import { configureStore } from '@reduxjs/toolkit'
import userReducer from 'store/usersSlice'
import feedReducer from 'store/feedsSlice'
import filterReducer from 'store/filterSlice'

export const store = configureStore({
  reducer: {
    users: userReducer,
    feeds: feedReducer,
    filter: filterReducer
  },
  middleware: (getDefaultMiddleware) => 
    getDefaultMiddleware({
      serializableCheck: false
    })
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch