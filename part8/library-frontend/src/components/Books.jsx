import { useState } from 'react'
import GET_BOOKS from '../graphql/queries/GetBooks.query'
import { useQuery } from "@apollo/client"

const Books = () => {
  const { loading, error, data } = useQuery(GET_BOOKS)
  const [filteredBooks, setFilteredBooks] = useState(null)


  if (loading) return
  <p>loading</p>

  if (error) return
  <p>error: {error}</p>

  console.log('fetched data is', data)
  const books = [data.allBooks]
  console.log('books', books)
  const genres = books[0].flatMap(book => book.genres)
  const uniqueGenres = [...new Set(genres)]


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
      {uniqueGenres.map(genre => (
        <button className='bg-blue-500 hover:bg-blue-950 text-white font-bold p-1 px-2 rounded'>{genre}</button>
      ))}
      <button className='bg-blue-500 hover:bg-blue-950 text-white font-bold p-1 px-2 rounded'>all genres</button>
    </div >
  )
}

export default Books
