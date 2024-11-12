import axios from "axios"
import { useEffect } from "react"
import { useState } from "react"
import { Link } from "react-router-dom"

const User = () => {
  const [users, setUsers] = useState(null)

  useEffect(() => {
    const fetchUsers = async () => {
      const response = await axios.get('/api/users')
      setUsers(response.data)
      console.log('users state is', users)
    }
    fetchUsers()
  }, [!users])

  if (!users) return <div>Loading...</div>

  return (
    <div>
      <table>
        <thead>
          <tr>
            <td className="bold">Users</td>
            <td className="bold">Blogs created</td>
          </tr>
        </thead>
        <tbody>
          {users.map(user => {
            return (
              <tr key={user.id}>
                <Link to={`/users/${user.id}`}><td>{user.username}</td></Link>
                <td>{user.blogs.length}</td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}

export default User
