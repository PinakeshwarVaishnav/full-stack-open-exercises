import { useDispatch } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { notifyWithTimeout } from '../reducers/notificationReducer.js'

const AnecdoteForm = () => {
  const dispatch = useDispatch()

  const addAnecdotes = (event) => {
    event.preventDefault()
    const anecdote = event.target.anecdote.value
    event.target.anecdote.value = ''
    dispatch(createAnecdote(anecdote))
    dispatch(notifyWithTimeout(`added '${anecdote}'`, 10))
    console.log('newAnecdote sent to backend json server is', anecdote)
  }

  return (
    <div>
      < h2 > create new </h2 >
      <form onSubmit={addAnecdotes}>
        <div><input name="anecdote" /></div>
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
