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
    removeBlog: (state, action) => {
      state.items = state.items.filter((blog) => blog.id !== action.payload);
    },
    likeBlog: (state, action) => {
      console.log("updating blog likes for blog with id", action.payload);
      const blogId = action.payload;
      const blog = state.items.find((blog) => blog.id === blogId);

      if (blog) {
        console.log("blog found", blog);
        blog.likes++;
      }
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

export const { addNewBlog, removeBlog, likeBlog } = blogSlice.actions;
export default blogSlice.reducer;
