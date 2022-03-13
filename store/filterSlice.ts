import { createSlice } from '@reduxjs/toolkit'
import { QueryConstraint } from 'firebase/firestore'
import type { RootState } from 'store/configureStore'

interface FilterState {
  value: QueryConstraint[]
  order: OrderType
  show: ShowType
  tag: TagType
}

const initialState: FilterState = {
  value: [],
  order: "latest",
  show: "allShow",
  tag: "allTag"
}

export const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setOrder: (state, action) => {
      state.order = action.payload
    },
    setShow: (state, action) => {
      state.show = action.payload
    },
    setTag: (state, action) => {
      state.tag = action.payload
    },
    initializeFilter: (state) => {
      state.value = []
    },
  },
  extraReducers: {},
})

export const { setOrder, setShow, setTag } = filterSlice.actions

export const selectFilter = (state: RootState) => state.filter.order

export default filterSlice.reducer