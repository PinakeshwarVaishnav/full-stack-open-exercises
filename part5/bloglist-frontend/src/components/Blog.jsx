import { useState } from "react"
import blogService from '../services/blogs'

const Blog = ({ blog, onBlogDataChange }) => {
  const [isVisible, setIsVisible] = useState(false)

  const toggleBlogDetails = () => {
    setIsVisible(!isVisible)
  }

  const handleLikeChange = async (event) => {
    event.preventDefault()
    console.log('blog id is', blog.id)
    const updatedBlog = {
      likes: blog.likes + 1,
      author: blog.author,
      title: blog.title,
      url: blog.url,
      id: blog.id
    }

    onBlogDataChange(updatedBlog.id)
    const response = await blogService.updateBlog(updatedBlog)
    console.log('updated blog is', response.data)
  }

  return (
    < div >

      {blog.title} {blog.author}

      <button onClick={toggleBlogDetails} className="button">{isVisible ? 'hide' : 'view'} </button>

      {isVisible && (
        <div>
          {blog.likes}
          <button onClick={handleLikeChange}> like </button>
          <br />
          {blog.url}
          <br />
          {blog.user}
        </div>
      )}

    </div >
  )
}

export default Blog
