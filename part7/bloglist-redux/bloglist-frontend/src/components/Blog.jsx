import { useState } from "react"
import blogService from '../services/blogs'
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import { fetchBlogs, addNewBlog, removeBlog, likeBlog } from '../features/blogs/blogSlice'
import CommentSection from './CommentSection'

const BlogComponent = () => {
  const dispatch = useDispatch()
  const { id } = useParams()
  const blogId = id
  const blogs = useSelector((state) => state.blogs)
  console.log('blogs', blogs)
  const blog = blogs.items.find((blog) => (
    blog.id === blogId
  ))
  const userState = useSelector(state => state.user)
  const user = userState.userInfo.username
  const [isVisible, setIsVisible] = useState(false)
  const handleUpdatedBlog = (updatedBlogIdData) => {
    dispatch(likeBlog(updatedBlogIdData))
  }
  const handleLikeChange = async (blog) => {
    event.preventDefault()
    console.log('blog id is', blog.id)
    const updatedBlog = {
      likes: blog.likes + 1,
      author: blog.author,
      title: blog.title,
      url: blog.url,
      id: blog.id
    }

    handleUpdatedBlog(updatedBlog.id)
    const response = await blogService.updateBlog(updatedBlog)
    console.log('updated blog is', response)
  }

  const handleRemovedBlog = (blogId) => {
    dispatch(removeBlog(blogId))
  }



  const handleLike = (event) => {
    if (handleLikeChange) {
      handleLikeChange(blog)
    }
  }

  const handleBlogRemoval = async (event) => {
    event.preventDefault()
    const confirmed = window.confirm(`Remove blog ${blog.title} by ${blog.author}`)
    if (confirmed) {
      console.log('blog to be removed is', blog)
      const response = await blogService.deleteBlog(blog.id)
      console.log('blog removal status', response.status)
      handleRemovedBlog(blog.id)
    }
  }

  return (
    < div className="blogs">

      <h3 className="blog-title">{blog.title}</h3>
      <p className="blog-author">{blog.author} </p>
      <p className="blog-likes">{blog.likes}</p>
      <button className="like-button" onClick={handleLike}> like </button>
      <br />
      <p className="blog-url">
        <a href={blog.url}>
          {blog.url}
        </a>
      </p>
      <br />
      {
        blog.user && (
          <div>
            <p className="blog-username">{blog.user.username}</p>
          </div>
        )
      }
      {
        blog.user && blog.user.username === user && (
          <div>
            <button
              className="delete-button"
              onClick={handleBlogRemoval}>remove</button>
          </div>
        )
      }
      <CommentSection blogId={blogId} />
    </div >
  )
}

export default BlogComponent
