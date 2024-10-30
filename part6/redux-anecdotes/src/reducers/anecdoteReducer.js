import { createSlice } from "@reduxjs/toolkit"

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
      state.push(asObject(action.payload))
    },
    setAnecdotes(state, action) {
      return action.payload
    }
  }
})

export const { vote, addAnecdote, setAnecdotes } = anecdoteSlice.actions

export default anecdoteSlice.reducer
