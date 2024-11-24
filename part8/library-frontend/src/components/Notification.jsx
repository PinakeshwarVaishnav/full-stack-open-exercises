import { useEffect } from 'react'
import { useSubscription } from '@apollo/client'
import BOOK_ADDED from '../graphql/subscriptions/subscription'

const Notification = () => {
  const { data, loading, error } = useSubscription(BOOK_ADDED)

  useEffect(() => {
    if (data && data.bookAdded) {
      const { title, author } = data.bookAdded
      window.alert(`new book  ${title} by ${author.name} added`)
    }
  })

  if (loading) return
  if (error) return <p>error for subscription: {error.message}</p>

  return null

}

export default Notification
