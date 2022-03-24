import { createSlice } from "@reduxjs/toolkit";

export interface RoomState {
  value: any[]
  roomData: any | null
}
const initialState: RoomState = {
  value: [],
  roomData: null
}

export const roomsSlice = createSlice({
  name: 'rooms',
  initialState,
  reducers: {
    // 숙소 상세페이지 접속시 숙소 정보를 roomData 에 저장
    addRoomInfo: (state, action) => {
      state.roomData = action.payload
    },
  },
  extraReducers: {},
})

export const { addRoomInfo } = roomsSlice.actions

export default roomsSlice.reducer