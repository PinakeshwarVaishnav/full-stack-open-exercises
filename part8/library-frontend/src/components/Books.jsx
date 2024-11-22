import GET_BOOKS from '../graphql/queries/GetBooks.query'
import { useQuery } from "@apollo/client"

const Books = () => {
  const { loading, error, data } = useQuery(GET_BOOKS)



  if (loading) return
  <p>loading</p>

  if (error) return
  <p>error: {error}</p>

  console.log('fetched data is', data)
  const books = [data.allBooks]
  console.log('books', books)

  return (
    <div>
      <h2 className="text-3xl font-bold p-3">books</h2>

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {books[0].map(book => (
            <tr key={book.title}>
              <td>{book.title}</td>
              <td>{book.author.name}</td>
              <td>{book.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div >
  )
}

export default Books
