import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom"
import BlogForm from './BlogForm'
import { useState } from "react"
import blogService from '../services/blogs'
import axios from 'axios'
import { fetchBlogs, addNewBlog, removeBlog, likeBlog } from '../features/blogs/blogSlice'
import { addNotification, clearNotification } from '../features/notification/notificationSlice'

const BlogsList = () => {
  const toggleForm = () => {
    setIsVisible(!isVisible)
  }
  const handleChange = (event) => {
    const { name, value } = event.target
    setNewBlog({
      ...newBlog,
      [name]: value
    })
    console.log('new blog being created is', newBlog)
  }
  const dispatch = useDispatch()
  const [newBlog, setNewBlog] = useState({
    title: "",
    author: "",
    url: "",
  })
  const blogs = useSelector((state) => state.blogs)
  console.log('blogs', blogs)
  const [isVisible, setIsVisible] = useState(false)
  const addBlog = async (event) => {
    event.preventDefault()
    const blogObject = {
      title: newBlog.title,
      author: newBlog.author,
      url: newBlog.url,
    }
    console.log('new created blog is', blogObject)

    const response = await blogService.create(blogObject)
    const userId = response.user

    const userResponse = await axios.get(`/api/users/${userId}`)
    const userDetails = await userResponse.data

    dispatch(addNewBlog({ ...response, user: userDetails }))
    dispatch(addNotification(`a new blog ${newBlog.title} by ${newBlog.author} added`))


    setNewBlog(
      {
        title: "",
        author: "",
        url: "",
      }
    )
    setIsVisible(false)
  }
  return (
    <div>

      <div>
        {isVisible && (
          <BlogForm addBlog={addBlog} newBlog={newBlog} handleChange={handleChange} />
        )}
        <button onClick={toggleForm}>
          {isVisible ? 'Cancel' : ' create new blog'}
        </button>

      </div>
      <h2>blog app </h2>
      {blogs.items.map((blog) => (
        <p key={blog.id}>
          <Link to={`/blogs/${blog.id}`}>
            {blog.title} {blog.name}
          </Link>
        </p>
      ))}
    </div>
  )
}

export default BlogsList
