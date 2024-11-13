import { configureStore } from "@reduxjs/toolkit";
import notificationReducer from "./features/notification/notificationSlice";
import blogReducer from "./features/blogs/blogSlice";
import userReducer from "./features/user/userSlice";
import usersReducer from "./features/users/usersSlice";

const store = configureStore({
  reducer: {
    blogs: blogReducer,
    notifications: notificationReducer,
    user: userReducer,
    users: usersReducer,
  },
});

export default store;
