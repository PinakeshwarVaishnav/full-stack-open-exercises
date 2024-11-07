import { configureStore } from "@reduxjs/toolkit";
import notificationReducer from "./features/notification/notificationSlice";

const store = configureStore({
  reducer: {
    notifications: notificationReducer,
  },
});

export default store;
