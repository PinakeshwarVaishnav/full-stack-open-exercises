import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import { fetchUsers } from '../features/users/usersSlice'

const UserBlogs = () => {
  const dispatch = useDispatch()
  const users = useSelector((state) => state.users.users)
  const userStatus = useSelector((state) => state.users.status)
  const error = useSelector((state) => state.users.error)
  const { id } = useParams()
  const userId = id

  useEffect(() => {
    if (userStatus === 'idle') {
      dispatch(fetchUsers())
    }
    console.log('users state is', users)

  }, [dispatch])

  const user = users.find((user) => {
    return user.id === userId
  })
  console.log('user found', user)

  if (!user) {
    return <p>user not found</p>
  }

  return (
    <div>
      <h2>{user.name}</h2>
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
