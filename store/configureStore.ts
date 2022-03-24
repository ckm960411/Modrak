import { configureStore } from '@reduxjs/toolkit'
import userReducer from 'store/usersSlice'
import feedReducer from 'store/feedsSlice'
import filterReducer from 'store/filterSlice'
import restaurantReducer from 'store/restaurantsSlice'
import roomsReducer from 'store/roomsSlice'

export const store = configureStore({
  reducer: {
    users: userReducer,
    feeds: feedReducer,
    filter: filterReducer,
    restaurants: restaurantReducer,
    rooms: roomsReducer,
  },
  middleware: (getDefaultMiddleware) => 
    getDefaultMiddleware({
      serializableCheck: false
    })
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch