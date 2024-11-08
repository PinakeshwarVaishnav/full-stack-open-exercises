import { configureStore } from "@reduxjs/toolkit";
import notificationReducer from "./features/notification/notificationSlice";
import blogReducer from "./features/blogs/blogSlice";

const store = configureStore({
  reducer: {
    blogs: blogReducer,
    notifications: notificationReducer,
  },
});

export default store;
