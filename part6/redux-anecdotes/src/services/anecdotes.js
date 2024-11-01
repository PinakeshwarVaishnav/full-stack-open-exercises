import axios from "axios"

const baseUrl = 'http://localhost:3001/anecdotes'

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const createNew = async (content) => {
  const object = { content, votes: 0 }
  const response = await axios.post(baseUrl, object)
  return response.data
}

const voteAnecdote = async (id) => {
  const anecdote = await axios.get(`http://localhost:3001/anecdotes/${id}`)
  const response = await axios.patch(`http://localhost:3001/anecdotes/${id}`, { votes: anecdote.data.votes + 1 })
  console.log('updated votes for anecdote', response.data)
  return response.data
}

export default { getAll, createNew, voteAnecdote }
