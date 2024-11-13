import axios from "axios"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"

const UserBlogs = () => {
  const [users, setUsers] = useState(null)
  const { id } = useParams()
  const userId = id

  useEffect(() => {
    const fetchUsers = async () => {
      const response = await axios.get('/api/users')
      setUsers(response.data)
      console.log('users state is', users)
    }
    fetchUsers()
  }, [])

  if (!users) return <div>Loading...</div>

  const user = users.find((user) => {
    user.id === userId
  })
  console.log('users found', users)

  if (!user) {
    return null
  }

  return (
    <div>
      <h1>{user.name}</h1>
      <h3>added blogs</h3>
      <ul>
        {user.blogs.map((blog) => (
          <li key={blog.id}>{blog.title}</li>
        ))}
      </ul>
    </div>
  )
}

export default UserBlogs
