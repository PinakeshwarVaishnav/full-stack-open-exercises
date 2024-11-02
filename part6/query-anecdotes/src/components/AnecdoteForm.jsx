import { useMutation, useQueryClient } from "@tanstack/react-query"
import { createAnecdote } from '../requests'
import { useNotification } from '../context/NotificationContext'

const AnecdoteForm = () => {
  const queryClient = useQueryClient()
  const { showNotification } = useNotification()
  const newAnecdoteMutation = useMutation({
    mutationFn: createAnecdote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['anecdotes'] })
    },
    onError: () => {
      showNotification('too short anecdote, must have length 5 or more')
    }
  })

  const onCreate = (event) => {
    event.preventDefault()

    const content = event.target.anecdote.value
    event.target.anecdote.value = ''

    if (content.length < 5) {
      showNotification('too short anecdote, must have length 5 or more')
      return
    }

    newAnecdoteMutation.mutate({ content, votes: 0 })
    console.log('new anecdote added is', content)
    showNotification(`You added '${content}'`)
  }

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name='anecdote' />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
