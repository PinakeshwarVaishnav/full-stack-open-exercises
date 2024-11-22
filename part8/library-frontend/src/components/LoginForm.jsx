import { useEffect, useState } from 'react'
import LOGIN from '../graphql/mutations/login.mutation'
import { useMutation } from '@apollo/client'
import { useNavigate } from 'react-router-dom'

const LoginForm = ({ setToken, token }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()
  const [login, result] = useMutation(LOGIN, {
    onError: (error) => {
      console.log('error logging in', error.graphQLErrors[0].message)
    }
  })

  useEffect(() => {
    if (result.data) {
      const token = result.data.login.value
      setToken(token)
      localStorage.setItem('user-token', token)
      navigate('/authors')
    }
  }, [result.data])

  const submit = async (event) => {
    event.preventDefault()

    login({ variables: { username, password } })
  }

  if (token) {
    return
  }

  return (
    <div>
      <h2 className="text-3xl font-bold p-3">Login</h2>
      <form onSubmit={submit}>
        <div>
          username <input
            className='border-2 border-gray-300 rounded-md '
            value={username}
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password <input
            className='border-2 border-gray-300 rounded-md '
            type='password'
            value={password}
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type='submit' className='bg-blue-500 hover:bg-blue-950 text-white font-bold p-1 px-2 rounded'>login</button>
      </form>
    </div>
  )
}

export default LoginForm
