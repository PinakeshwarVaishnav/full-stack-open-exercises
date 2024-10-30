import { useDispatch } from 'react-redux'
import { addAnecdote } from '../reducers/anecdoteReducer'
import { notifyWithTimeout } from '../reducers/notificationReducer.js'

const AnecdoteForm = () => {
  const dispatch = useDispatch()

  const addAnecdotes = (event) => {
    event.preventDefault()
    const anecdote = event.target.anecdote.value
    event.target.anecdote.value = ''
    console.log('new created anecdote is', anecdote)
    dispatch(addAnecdote(anecdote))
    dispatch(notifyWithTimeout(`added '${anecdote}'`))
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
