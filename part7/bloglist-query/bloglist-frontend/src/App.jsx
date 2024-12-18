import { useState, useEffect, useContext } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import BlogForm from './components/BlogForm'
import axios from 'axios'
import { NotificationContext, NotificationDispatchContext } from './context/NotificationContext'
import { useFetchBlogs } from './hooks/useFetchBlogs'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { UserContext, UserDispatchContext } from './context/UserContext'

const App = () => {
  const { data, error, isLoading } = useFetchBlogs()
  const [newBlog, setNewBlog] = useState({
    title: "",
    author: "",
    url: "",
  })
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [isVisible, setIsVisible] = useState(false)
  const [sortOrder, setSortOrder] = useState('asc')
  const notification = useContext(NotificationContext)
  const dispatchNotification = useContext(NotificationDispatchContext)
  const user = useContext(UserContext)
  const dispatchUser = useContext(UserDispatchContext)
  const queryClient = useQueryClient()
  const mutation = useMutation({
    mutationFn:
      (blogService.create),
    onMutate: (newBlog) => {
      console.log('new blog to be added received in onMutate callback function')
    },
    onSuccess: (newBlog) => {
      queryClient.invalidateQueries(['blogs'])
      console.log('new blog created', newBlog)
      dispatchNotification({ type: 'ADD', payload: `a new blog ${newBlog.title} by ${newBlog.author} added` })

    }
  })

  const sortBlogsByLikes = (order) => {
    const sortedBlogs = [...blogs].sort((a, b) => {
      return order === 'asc' ? a.likes - b.likes : b.likes - a.likes
    })
    setBlogs(sortedBlogs)
  }

  const toggleForm = () => {
    setIsVisible(!isVisible)
  }




  const handleLogout = () => {
    localStorage.removeItem('loggedBlogappUser')
    dispatchUser({ type: 'CLEAR' })
  }

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
      dispatchUser({ type: 'ADD', payload: user })
      setUsername('')
      setPassword('')

    } catch (error) {
      const errorMessage = error.response ? error.response.data.error : "Wrong username or password"
      console.log('Login Error:', error)
      dispatchNotification({ type: 'ADD', payload: errorMessage })
      console.log('notification is set to', notification)
    }
  }


  useEffect(() => {
    if (notification) {
      const timer = setTimeout(() => {
        dispatchNotification({ type: 'CLEAR' })
      }, 5000)

      return () => {
        clearTimeout(timer)
      }
    }
  }, [notification])

  useEffect(() => {
    const loggedUserJSON =
      window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON && loggedUserJSON !== '' && loggedUserJSON !== undefined && loggedUserJSON !== null) {
      const user = JSON.parse(loggedUserJSON)
      console.log('Parsed user', user)
      dispatchUser({ type: 'ADD', payload: user })
      blogService.setToken(user.token)
    }
  }, [])

  useEffect(() => {
    console.log('user is', user)
  }, [user])

  const addBlog = async (event) => {
    event.preventDefault()
    const blogObject = {
      title: newBlog.title,
      author: newBlog.author,
      url: newBlog.url,
    }

    mutation.mutate(blogObject)
    console.log('new created blog is', blogObject)


    setNewBlog(
      {
        title: "",
        author: "",
        url: "",
      }
    )
    setIsVisible(false)
  }

  if (user === null) {
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

  const handleChange = (event) => {
    const { name, value } = event.target
    setNewBlog({
      ...newBlog,
      [name]: value
    })
    console.log('new blog being created is', newBlog)
  }

  if (isLoading) return <div>Loading Blogs...</div>

  if (error) return <div>Error fetching Blogs: {error.message}</div>

  return (
    <div>
      <h1>blogs</h1>
      <Notification />
      {user !== null &&
        (
          <div>
            <div className='container'>
              <p>{user.name} logged in </p>
              <button className='logout-button' onClick={handleLogout}>
                Logout
              </button>
            </div>
            <div>
              {isVisible && (
                <BlogForm addBlog={addBlog} newBlog={newBlog} handleChange={handleChange} />
              )}
              <button onClick={toggleForm}>
                {isVisible ? 'Cancel' : ' create new blog'}
              </button>
              <div>
                <button onClick={() => { setSortOrder('asc'); sortBlogsByLikes('asc') }}>Sort by lowest likes</button>
                <button onClick={() => { setSortOrder('dsc'); sortBlogsByLikes('dsc') }}>Sort by highest likes</button>
              </div>
            </div>
          </div>
        )
      }
      <br />
      {
        data.map(blog =>
          <Blog key={blog.id} blog={blog} user={user.username} />
        )
      }
    </div >
  )
}

export default App
