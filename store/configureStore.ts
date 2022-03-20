import { configureStore } from '@reduxjs/toolkit'
import userReducer from 'store/usersSlice'
import feedReducer from 'store/feedsSlice'
import filterReducer from 'store/filterSlice'
import restaurantReducer from 'store/restaurantsSlice'

export const store = configureStore({
  reducer: {
    users: userReducer,
    feeds: feedReducer,
    filter: filterReducer,
    restaurants: restaurantReducer
  },
  middleware: (getDefaultMiddleware) => 
    getDefaultMiddleware({
      serializableCheck: false
    })
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch