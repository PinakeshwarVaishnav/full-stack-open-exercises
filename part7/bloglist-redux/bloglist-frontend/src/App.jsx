import { useState, useEffect } from 'react'
import { Route, Routes, Link, useLocation } from 'react-router-dom'
import BlogComponent from './components/Blog'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'
import { addNotification, clearNotification } from './features/notification/notificationSlice'
import { fetchBlogs, addNewBlog, removeBlog, likeBlog } from './features/blogs/blogSlice'
import { setUser, clearUser } from './features/user/userSlice.js'
import { useDispatch, useSelector } from 'react-redux'
import User from './components/User'
import UserBlogs from './components/UserBlogs'
import BlogsList from './components/BlogsList.jsx'
import NavBar from './components/NavBar.jsx'

const App = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const notifications = useSelector(state => state.notifications)
  const blogs = useSelector(state => state.blogs)
  console.log('blogs state is', blogs)
  const dispatch = useDispatch()
  const { items, loading, error } = blogs
  const user = useSelector(state => state.user)
  const { isAuthenticated, userInfo } = user
  console.log('user state is', user)
  const location = useLocation()












  const handleLogin = async (event) => {
    console.log('login form submitted')
    event.preventDefault()
    console.log(username, typeof (username))
    console.log(password, typeof (password))

    try {
      const user = await loginService.login({
        username, password
      })

      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )

      blogService.setToken(user.token)
      dispatch(setUser(user))
      setUsername('')
      setPassword('')

    } catch (error) {
      const errorMessage = error.response ? error.response.data.error : "Wrong username or password"
      console.log('Login Error:', error)
      dispatch(addNotification(errorMessage))
    }
  }


  useEffect(() => {
    console.log('fetching blogs...')
    dispatch(fetchBlogs())
  }, [dispatch])

  useEffect(() => {
    if (notifications) {
      const timer = setTimeout(() => {
        dispatch(clearNotification())
      }, 3000)

      return () => {
        clearTimeout(timer)
      }
    }
  }, [notifications])

  useEffect(() => {
    console.log('notification state is', notifications)
  }, [notifications])

  useEffect(() => {
    const loggedUserJSON =
      window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON && loggedUserJSON !== '' && loggedUserJSON !== undefined && loggedUserJSON !== null) {
      const user = JSON.parse(loggedUserJSON)
      console.log('Parsed user', user)
      dispatch(setUser(user))
      blogService.setToken(user.token)
    }
  }, [])





  if (!user || !isAuthenticated) {
    return (
      <div>
        <Notification />
        <h2>Log in to application</h2>
        <form onSubmit={handleLogin}>
          <div>
            username
            <input
              type='text'
              value={username}
              name='Username'
              data-testid='username'
              onChange={({ target }) => setUsername(target.value)}
            />
          </div>
          <div>
            password
            <input
              type='password'
              value={password}
              name='Password'
              data-testid="password"
              onChange={({ target }) => setPassword(target.value)}
            />
          </div>
          <button type='submit'>login</button>
        </form>
      </div>
    )
  }




  if (loading) {
    return <div>Loading...</div>
  }

  if (error) {
    return <div>Error: {error}</div>
  }

  return (
    <div>
      <NavBar />
      <Notification />
      {
        user !== null &&
        (
          <div>
            <div className='container'>
            </div>
            <Routes>
              <Route path='/' element={<BlogsList />} />
              <Route path='/blogs' element={<BlogsList />} />
              <Route path="/users" element={<User />} />
              <Route path='/users/:id' element={<UserBlogs />} />
              <Route path='/blogs/:id' element={<BlogComponent />} />
            </Routes>



          </div>
        )
      }

    </div >
  )
}

export default App
