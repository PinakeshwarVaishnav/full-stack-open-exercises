import { useEffect } from "react"
import { Link } from "react-router-dom"
import { fetchUsers } from '../features/users/usersSlice'
import { useDispatch, useSelector } from "react-redux"

const User = () => {
  const dispatch = useDispatch()
  const users = useSelector((state) => state.users.users)
  const userStatus = useSelector((state) => state.users.status)
  const error = useSelector((state) => state.users.error)

  useEffect(() => {
    if (userStatus === 'idle') {
      dispatch(fetchUsers())
    }
    console.log('users state is', users)

  }, [dispatch])


  return (
    <div>
      {userStatus === 'loading' && (
        <p>Loading...</p>
      )}
      {userStatus === 'failed' && (
        <p>Error: {error}</p>
      )}
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
                <td>
                  <Link to={`/users/${user.id}`}>
                    {user.username}
                  </Link>
                </td>
                <td>{user.blogs.length}</td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div >
  )
}

export default User
