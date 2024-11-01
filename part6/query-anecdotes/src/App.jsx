import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import { useQuery, useMutation } from '@tanstack/react-query'
import axios from 'axios'
import { getAnecdotes, createAnecdote } from './requests'

const App = () => {
  const result = useQuery({
    queryKey: ['anecdotes'],
    queryFn: getAnecdotes
  })
  console.log(JSON.parse(JSON.stringify(result)))

  if (result.isLoading) {
    return <div>loading data...</div>
  }

  if (result.error) {
    console.error('error while fetching anecdotes from server', result.error)
    return <div>anecdote service is not available due to problems in server</div>
  }

  const anecdotes = result.data
  console.log('anecdotes are', anecdotes)

  const handleVote = (anecdote) => {
    console.log('vote')
  }



  return (
    <div>
      <h3>Anecdote app</h3>

      <Notification />
      <AnecdoteForm />

      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
