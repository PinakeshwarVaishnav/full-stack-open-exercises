import { useSelector, useDispatch } from "react-redux"

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

  const vote = (id) => {
    dispatch({ type: 'VOTE', data: { id } })
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
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default AnecdoteList