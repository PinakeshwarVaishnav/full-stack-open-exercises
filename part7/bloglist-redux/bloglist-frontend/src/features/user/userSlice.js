import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    isAuthenticated: false,
    userInfo: null,
  },
  reducers: {
    setUser: (state, action) => {
      state.isAuthenticated = true;
      state.userInfo = action.payload;
      console.log("user saved to the redux store is", action.payload);
    },
    clearUser: (state) => {
      state.isAuthenticated = false;
      state.userInfo = null;
      console.log("user cleared from redux store");
    },
  },
});

export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;
