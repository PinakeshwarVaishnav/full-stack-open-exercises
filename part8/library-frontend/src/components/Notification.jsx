import { useEffect } from 'react'
import { useApolloClient, useSubscription } from '@apollo/client'
import BOOK_ADDED from '../graphql/subscriptions/subscription'
import GET_BOOKS from '../graphql/queries/GetBooks.query'

const Notification = () => {
  const client = useApolloClient()
  const { data, loading, error } = useSubscription(BOOK_ADDED)

  useEffect(() => {
    if (data && data.bookAdded) {
      const { title, author } = data.bookAdded
      window.alert(`new book  ${title} by ${author.name} added`)

      client.cache.updateQuery({ query: GET_BOOKS }, (existingData) => {
        const allBooks = existingData ? existingData.allBooks : []
        return {
          allBooks: allBooks.concat(data.bookAdded)
        }
      })
    }
  }, [data, client])

  if (loading) return
  if (error) return <p>error for subscription: {error.message}</p>

  return null

}

export default Notification
