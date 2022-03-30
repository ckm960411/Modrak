import { AnyAction, CombinedState, combineReducers } from "@reduxjs/toolkit";
import { HYDRATE } from 'next-redux-wrapper'

import userReducer, { UserState } from "store/slices//usersSlice";
import feedReducer, { FeedState } from "store/slices/feedsSlice";
import feedFilterReducer, { FeedFilterState } from "store/slices/feedFilterSlice";
import restaurantReducer, { RestaurantState } from "store/slices/restaurantsSlice";
import roomsReducer, { RoomState } from "store/slices/roomsSlice";
import profileReducer, { UserDataState } from "store/slices/profileSlice"

export interface IState {
  users: UserState,
  feeds: FeedState,
  feedFilter: FeedFilterState
  restaurants: RestaurantState
  rooms: RoomState
  profile: UserDataState
}

const rootReducer = (state: IState, action: AnyAction): CombinedState<IState> => {
  switch (action.type) {
    case HYDRATE: 
      return action.payload
    default: {
      const combinedReducer = combineReducers({
        users: userReducer,
        feeds: feedReducer,
        feedFilter: feedFilterReducer,
        restaurants: restaurantReducer,
        rooms: roomsReducer,
        profile: profileReducer,
      })
      return combinedReducer(state, action)
    }
  }
}

export default rootReducer