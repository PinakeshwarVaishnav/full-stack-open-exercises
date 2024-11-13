import { Link } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { setUser, clearUser } from '../features/user/userSlice.js'

const NavBar = () => {
  const user = useSelector(state => state.user)
  const dispatch = useDispatch()
  const handleLogout = () => {
    localStorage.removeItem('loggedBlogappUser')
    dispatch(clearUser())
  }

  return (
    <div>
      <nav className="navbar">
        <ul className="navbar-links">
          <li>
            <Link to={'/blogs'} >blogs</Link>
          </li>
          <li>
            <Link to={'/users'}>users</Link>
          </li>
          <li> {user.userInfo.username} logged in </li>
          <li>
            <button className='logout-button' onClick={handleLogout}>
              Logout
            </button>
          </li>
        </ul>
      </nav>
    </div>
  )
}

export default NavBar
