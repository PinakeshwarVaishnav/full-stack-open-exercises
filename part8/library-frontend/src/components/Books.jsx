import { useEffect, useState } from 'react'
import GET_BOOKS from '../graphql/queries/GetBooks.query'
import { useQuery } from "@apollo/client"

const Books = () => {
  const { loading, error, data } = useQuery(GET_BOOKS)
  const [books, setBooks] = useState([])
  const [genreSelected, setGenreSelected] = useState(null)

  useEffect(() => {
    if (data && Array.isArray(data.allBooks)) {
      setBooks(data.allBooks)
    }
  }, [data])

  useEffect(() => {
    console.log('books value', books)
  })


  if (loading) return
  <p>loading</p>

  if (error) return
  <p>error: {error}</p>

  console.log('fetched data is', data)

  const genres = data.allBooks.flatMap(book => book.genres)
  const uniqueGenres = [...new Set(genres)]
  console.log('unique genres array', uniqueGenres)

  const filterGenre = (genre) => {
    const filteredBooks = books.filter(book => book.genres.includes(genre))
    setBooks(filteredBooks)
    setGenreSelected(genre)
    console.log('filtered books by genre', genre)
  }

  const allGenres = () => {
    setBooks(data.allBooks)
    console.log('reset the genre filter')
  }


  return (
    <div className='relative overflow-x-auto shadow-md sm:rounded-lg'>
      <h2 className="text-3xl font-bold p-3">books</h2>
      {genreSelected ? <>in genre <span className='font-bold'>{genreSelected}</span> </> : <></>}
      <table className='w-full text-left text-gray-500'>
        <thead className='text-s text-gray-700 '>
          <tr className='bg-white border-b hover:bg-gray-100'>
            <th className='px-6 py-4'>book</th>
            <th className='px-6 py-4'>author</th>
            <th className='px-6 py-4'>published</th>
          </tr>
        </thead>
        <tbody>
          {books.length > 0 && (
            books.map(book => (
              <tr className='bg-white border-b hover:bg-gray-100' key={book.title}>
                <td>{book.title}</td>
                <td>{book.author.name}</td>
                <td>{book.published}</td>
              </tr>
            )))}
        </tbody>
      </table>
      {uniqueGenres.map((genre, index) => (
        <button onClick={() => filterGenre(genre)} key={index} className='bg-blue-500 hover:bg-blue-950 text-white font-bold p-1 px-2 m-1 rounded'>{genre}</button>
      ))}
      <button onClick={allGenres} className='bg-blue-500 hover:bg-blue-950 text-white font-bold p-1 px-2 rounded'>all genres</button>
    </div >
  )
}

export default Books
