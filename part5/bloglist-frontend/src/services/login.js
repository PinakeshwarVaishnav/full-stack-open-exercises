import axios from 'axios'
const baseUrl = '/api/login'

const login = async credentials => {
  try {
    const response = await axios.post(baseUrl, credentials)
    return response.data
  } catch (error) {
    console.log('login error in login.js', error.response.data.error)
    throw (error)
  }
}

export default { login }
