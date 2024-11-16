import GET_BOOKS from '../graphql/queries/GetBooks.query'
import { useQuery } from "@apollo/client"

const Books = (props) => {
  const { loading, error, data } = useQuery(GET_BOOKS)

  if (!props.show) {
    return null
  }

  if (loading) return
  <p>loading</p>

  if (error) return
  <p>error: {error}</p>

  console.log('fetched data is', data)
  const books = [data.allBooks]
  console.log('books', books)

  return (
    <div>
      <h2>books</h2>

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {books[0].map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Books
