import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = newToken => {
  token = `Bearer ${newToken}`
}

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const create = async newObject => {
  const config = {
    headers: { Authorization: token }
  }

  const response = await axios.post(baseUrl, newObject, config)
  return response.data
}

const updateBlog = async updatedObject => {
  if (!updatedObject.id) {
    console.error('blog id is undefined or null')
  }

  console.log('updatedBlog id is', updatedObject.id)

  const config = {
    headers: { Authorization: token }
  }

  try {
    const response = await axios.put(`/api/blogs/${updatedObject.id}`, updatedObject, config)
    console.log('updating blog', response.data)
    return response.data
  } catch (error) {
    console.error('error while updating blogs', error.response.data)
  }
}

const getBlogWithId = async (blogId) => {
  const response = await axios.get(`/api/blogs/${blogId}`)
  return response.data
}

const deleteBlog = async (blogId) => {
  const config = {
    headers: { Authorization: token }
  }
  try {
    const response = await axios.delete(`api/blogs/${blogId}`, config)
    return response
  } catch (error) {
    console.error('error while deleting blog', error)
  }
}

export default { getAll, setToken, create, updateBlog, getBlogWithId, deleteBlog }
