import { createSlice } from "@reduxjs/toolkit"

const notificationSlice = createSlice({
  name: 'notification',
  initialState: {
    message: null
  },
  reducers: {
    showNotification(state, action) {
      state.message = action.payload
    },
    hideNotification(state) {
      state.message = null
    }
  }
})

export const notifyWithTimeout = (message) => (dispatch) => {
  dispatch(showNotification(message))

  setTimeout(() => {
    dispatch(hideNotification())
  }, 5000)
}

export const { showNotification, hideNotification } = notificationSlice.actions

export default notificationSlice.reducer