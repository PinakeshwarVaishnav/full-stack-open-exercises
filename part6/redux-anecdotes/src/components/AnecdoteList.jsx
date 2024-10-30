import { useSelector, useDispatch } from "react-redux"
import { vote } from '../reducers/anecdoteReducer'
import { notifyWithTimeout } from '../reducers/notificationReducer'

const AnecdoteList = () => {
  const anecdotes = useSelector(state => {
    console.log('state is', state)
    console.log('searchTerm state is', state.filter)
    return state.filter.searchTerm === ''
      ? state.anecdote
      : state.anecdote.filter(anecdote => anecdote.content.toLowerCase().includes(state.filter.searchTerm.toLowerCase()))
  })
  console.log('anecdotes state is', anecdotes)
  const dispatch = useDispatch()

  const handleVote = (id, content) => {
    dispatch(vote(id))
    dispatch(notifyWithTimeout(`you voted '${content}'`))
  }

  const sortedAnecdotes = [...anecdotes].sort((a, b) => b.votes - a.votes)
  return (
    <div>
      {sortedAnecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote.id, anecdote.content)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default AnecdoteList
