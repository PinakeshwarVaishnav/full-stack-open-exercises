import { createSlice } from "@reduxjs/toolkit"

const notificationSlice = createSlice({
  name: 'notification',
  initialState: {
    content: 'Hello, world!'
  },
  reducers: {
    setNotification(state, action) {
      state.content = action.payload
    }
  }
})

export const { setNotification } = notificationSlice.actions

export default notificationSlice.reducer
