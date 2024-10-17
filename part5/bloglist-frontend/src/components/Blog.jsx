import { useState } from "react"

const Blog = ({ blog }) => {
  const [isVisible, setIsVisible] = useState(false)
  const toggleBlogDetails = () => {
    setIsVisible(!isVisible)
  }

  return (
    < div >

      {blog.title} {blog.author}

      <button onClick={toggleBlogDetails} className="button">{isVisible ? 'hide' : 'view'} </button>

      {isVisible && (
        <div>
          {blog.likes}
          <br />
          {blog.url}
        </div>
      )}

    </div >
  )
}

export default Blog
