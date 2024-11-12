import axios from "axios"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"

const UserBlogs = () => {
  const [users, setUsers] = useState(null)
  const { id } = useParams()
  const userId = parseInt(id)
  const noUsers = !users

  useEffect(() => {
    const fetchUsers = async () => {
      const response = await axios.get('/api/users')
      setUsers(response.data)
      console.log('users state is', users)
    }
    fetchUsers()
  }, [noUsers])

  const user = users.find((user) => {
    user.id === userId
  })

  if (!users) return <div>Loading...</div>

  return (
    <div>
      <h1>{user.name}</h1>
      <ul>
        {user.blogs.map((blog) => (
          <li key={blog.id}>{blog.title}</li>
        ))}
      </ul>
    </div>
  )
}

export default UserBlogs
