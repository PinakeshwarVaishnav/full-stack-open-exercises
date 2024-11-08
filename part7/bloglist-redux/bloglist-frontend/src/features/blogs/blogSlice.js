import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import blogService from "../../services/blogs";

export const fetchBlogs = createAsyncThunk("data/fetchBlogs", async () => {
  try {
    const blogs = await blogService.getAll();
    if (blogs) {
      console.log("fetched blogs are", blogs);
      return blogs;
    } else {
      console.log("No blogs found");
    }
  } catch (error) {
    console.error("Error fetching blogs", error);
  }
});

const blogSlice = createSlice({
  name: "blogs",
  initialState: {
    items: [],
    loading: false,
    error: null,
  },
  reducers: {
    addNewBlog: (state, action) => {
      state.items.push(action.payload);
      console.log("added new blog", action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchBlogs.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchBlogs.fulfilled, (state, action) => {
        console.log("fulfilled action payload", action.payload);
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchBlogs.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { addNewBlog } = blogSlice.actions;
export default blogSlice.reducer;
