import { useState } from "react"
import blogService from '../services/blogs'

const Blog = ({ blog, user, handleLikeChange }) => {
  const [isVisible, setIsVisible] = useState(false)

  const toggleBlogDetails = () => {
    setIsVisible(!isVisible)
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
    }
  }

  return (
    < div className="blogs">

      <h3 className="blog-title">{blog.title}</h3>
      <p className="blog-author">{blog.author} </p>

      <button onClick={toggleBlogDetails} className="view-button">{isVisible ? 'hide' : 'view'} </button>

      {isVisible && (
        <div>
          <p className="blog-likes">{blog.likes}</p>
          <button className="like-button" onClick={handleLike}> like </button>
          <br />
          <p className="blog-url">{blog.url}</p>
          <br />
          {blog.user && (
            <div>
              <p className="blog-username">{blog.user.username}</p>
            </div>
          )}
          {blog.user && blog.user.username === user && (
            <div>
              <button onClick={handleBlogRemoval} className="delete-button">remove</button>
            </div>
          )}
        </div>
      )}

    </div >
  )
}

export default Blog
