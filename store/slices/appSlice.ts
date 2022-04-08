import { createSlice } from "@reduxjs/toolkit";

export interface AppState {
  isShown: boolean
  message: string | null
  severity: 'success' | 'error' | 'warning' | 'info'
}
const initialState: AppState = {
  isShown: false,
  message: null,
  severity: 'success',
}

export const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    showAlert: (state, action) => {
      state.isShown = action.payload.isShown
      state.message = action.payload.message
      if (action.payload.severity) { // severity 가 없으면 기본값으로 'success' 할당
        state.severity = action.payload.severity
      } else {
        state.severity = 'success'
      }
    },
  },
})

export const { showAlert } = appSlice.actions

export default appSlice.reducer