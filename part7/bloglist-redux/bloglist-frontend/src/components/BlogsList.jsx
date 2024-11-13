import { useSelector } from "react-redux"
import { Link } from "react-router-dom"

const BlogsList = () => {
  const blogs = useSelector((state) => state.blogs)
  console.log('blogs', blogs)

  return (
    <div>
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
