import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import BlogForm from './components/BlogForm'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [newBlog, setNewBlog] = useState({
    title: "",
    author: "",
    url: "",
  })
  const [username, setUsername] = useState('')
  const [message, setMessage] = useState(null)
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [isVisible, setIsVisible] = useState(false)
  const [updatedBlogId, setUpdatedBlogId] = useState(null)
  const [sortOrder, setSortOrder] = useState('asc')

  const sortBlogsByLikes = (order) => {
    const sortedBlogs = [...blogs].sort((a, b) => {
      return order === 'asc' ? a.likes - b.likes : b.likes - a.likes
    })
    setBlogs(sortedBlogs)
  }

  const toggleForm = () => {
    setIsVisible(!isVisible)
  }


  const handleUpdatedBlog = (updatedBlogIdData) => {
    setUpdatedBlogId(updatedBlogIdData)
  }

  const handleLogout = () => {
    localStorage.removeItem('loggedBlogappUser')
    setUser(null)
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
      setUser(user)
      setUsername('')
      setPassword('')

    } catch (error) {
      const errorMessage = error.response ? error.response.data.error : "Wrong username or password"
      console.log('Login Error:', error)
      setMessage(errorMessage)
      console.log('message is set to', message)
    }
  }

  console.log('user is', user)
  const fetchBlogs = async () => {
    try {
      const blogs = await blogService.getAll()
      if (blogs) {
        setBlogs(blogs)
      } else {
        console.log('No blogs found')
      }
    } catch (error) {
      console.error('Error fetching blogs'.error)
    }
  }
  useEffect(() => {
    fetchBlogs()
    console.log('updated blog id is', updatedBlogId)
  }, [updatedBlogId])

  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => {
        setMessage(null)
      }, 5000)

      return () => {
        clearTimeout(timer)
      }
    }
  }, [message])

  useEffect(() => {
    console.log('message state is', message)
  }, [message])

  useEffect(() => {
    const loggedUserJSON =
      window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON && loggedUserJSON !== '' && loggedUserJSON !== undefined && loggedUserJSON !== null) {
      const user = JSON.parse(loggedUserJSON)
      console.log('Parsed user', user)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  useEffect(() => {
    if (updatedBlogId) {
      const timer = setTimeout(() => {
        setUpdatedBlogId(null)
      }, 1)

      return () => {
        clearTimeout(timer)
      }
    }
  }, [updatedBlogId])

  const addBlog = async (event) => {
    event.preventDefault()
    const blogObject = {
      title: newBlog.title,
      author: newBlog.author,
      url: newBlog.url,
      user: user
    }
    console.log('new created blog is', blogObject)

    const response = await blogService.create(blogObject)
    setBlogs((prevBlogs) => [...prevBlogs, response])
    setMessage(`a new blog ${newBlog.title} by ${newBlog.author} added`)


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
        <Notification message={message} />
        <h2>Log in to application</h2>
        <form onSubmit={handleLogin}>
          <div>
            username
            <input
              type='text'
              value={username}
              name='Username'
              onChange={({ target }) => setUsername(target.value)}
            />
          </div>
          <div>
            password
            <input
              type='password'
              value={password}
              name='Password'
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

  return (
    <div>
      <h1>blogs</h1>
      <Notification message={message} />
      {user !== null &&
        (
          <div>
            <div className='container'>
              <p>{user.name} logged in </p>
              <button className='button' onClick={handleLogout}>
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
        blogs.map(blog =>
          <Blog key={blog.id} blog={blog} onBlogDataChange={handleUpdatedBlog} />
        )
      }
    </div >
  )
}

export default App
