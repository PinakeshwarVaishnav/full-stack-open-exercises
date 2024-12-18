import { createSlice } from "@reduxjs/toolkit"
import anecdoteService from '../services/anecdotes'

const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}

const anecdoteSlice = createSlice({
  name: 'anecdote',
  initialState: [],
  reducers: {
    vote(state, action) {
      console.log('action for vote is', action)
      console.log('state for vote is', state)
      const anecdote = state.find(a => a.id === action.payload)
      if (anecdote) {
        anecdote.votes++
      }
    },
    addAnecdote(state, action) {
      console.log('action for addAnecdote is', action)
      state.push(action.payload)
    },
    setAnecdotes(state, action) {
      return action.payload
    }
  }
})

export const { vote, addAnecdote, setAnecdotes } = anecdoteSlice.actions

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch(setAnecdotes(anecdotes))
  }
}

export const createAnecdote = (content) => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNew(content)
    console.log('new anecdote sent to the server is', newAnecdote)
    await dispatch(addAnecdote(newAnecdote))
  }
}

export const voteAnecdote = (id) => {
  return async (dispatch) => {
    try {
      await anecdoteService.voteAnecdote(id)
      await dispatch(vote(id))
    } catch (error) {
      console.error('failed to vote', error)
    }
  }
}

export default anecdoteSlice.reducer
