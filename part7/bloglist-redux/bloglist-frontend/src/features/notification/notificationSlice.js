import { createSlice } from "@reduxjs/toolkit";

const notificationSlice = createSlice({
  name: "notification",
  initialState: [],
  reducers: {
    addNotification: (state, action) => {
      state.push(action.payload);
    },
    clearNotification: () => {
      return [null];
    },
  },
});

export const { addNotification, clearNotification } = notificationSlice.actions;
export default notificationSlice.reducer;
