import { AnyAction, configureStore, Reducer, Store } from '@reduxjs/toolkit'
import { createWrapper } from 'next-redux-wrapper'
import rootReducer, { IState } from 'store/reducer'

const createStore = () => {
  const store = configureStore({
    reducer: rootReducer as Reducer<IState, AnyAction>,
  })
  return store
}
const store = createStore()

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

const wrapper = createWrapper<Store<IState>>(createStore)
export default wrapper