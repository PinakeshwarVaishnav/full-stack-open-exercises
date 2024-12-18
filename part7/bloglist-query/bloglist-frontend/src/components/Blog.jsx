import { useState } from "react"
import blogService from '../services/blogs'
import { useMutation, useQueryClient } from "@tanstack/react-query"

const Blog = ({ blog, user }) => {
  const [isVisible, setIsVisible] = useState(false)
  const queryClient = useQueryClient()
  const removeMutation = useMutation({
    mutationFn: blogService.deleteBlog,
    onSuccess: () => {
      console.log('blog deleted')
      queryClient.invalidateQueries('blogs')
    },
    onError: (error) => {
      console.error('error deleting blogs', error)
    }
  })
  const likeMutation = useMutation({
    mutationFn: blogService.updateBlog,
    onMutate: (likedBlog) => {
      console.log('blog received in like mutation is', likedBlog)
    },
    onSuccess: () => {
      console.log('blog like increased')
      queryClient.invalidateQueries(['blogs'])

    }
  }
  )

  const toggleBlogDetails = () => {
    setIsVisible(!isVisible)
  }

  const handleLike = async (event) => {
    event.preventDefault()
    const blogId = blog.id
    console.log('liked blog id is', blogId)
    const likedBlog = {
      ...blog,
      likes: blog.likes + 1,
    }

    const response = likeMutation.mutate(likedBlog)
    console.log('blog likes updated response', response)
  }

  const handleBlogRemoval = async (event) => {
    event.preventDefault()
    const confirmed = window.confirm(`Remove blog ${blog.title} by ${blog.author}`)
    if (confirmed) {
      console.log('blog to be removed is', blog)
      const response = await blogService.deleteBlog(blog.id)
      console.log('blog removal status', response.status)
      removeMutation.mutate(blog.id)
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
              <button
                className="delete-button"
                onClick={handleBlogRemoval}>remove</button>
            </div>
          )}
        </div>
      )}

    </div >
  )
}

export default Blog
