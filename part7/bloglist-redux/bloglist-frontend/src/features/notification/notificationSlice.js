import { createSlice } from "@reduxjs/toolkit";

const notificationSlice = createSlice({
  name: "notification",
  initialState: [],
  reducers: {
    addNotification: (state, action) => {
      state.push(action.payload);
    },
    clearNotification: (notifications) => {
      notifications = [];
    },
  },
});

export const { addNotification, clearNotification } = notificationSlice.actions;
export default notificationSlice.reducer;
