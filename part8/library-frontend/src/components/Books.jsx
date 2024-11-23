import { useEffect, useState } from 'react'
import GET_BOOKS from '../graphql/queries/GetBooks.query'
import GET_FILTERED_BOOKS from '../graphql/queries/GetFilteredBooks.query'
import { useQuery } from "@apollo/client"

const Books = () => {
  const [books, setBooks] = useState([])
  const [genreSelected, setGenreSelected] = useState(null)

  const { loading: loadingAll, error: errorAll, data: dataAll } = useQuery(GET_BOOKS)

  const { loading: loadingFiltered, error: errorFiltered, data: dataFiltered } = useQuery(GET_FILTERED_BOOKS, {
    variables: { genres: [genreSelected] },
    skip: !genreSelected
  })

  useEffect(() => {
    if (dataAll && Array.isArray(dataAll.allBooks)) {
      setBooks(dataAll.allBooks)
    }
  }, [dataAll])

  useEffect(() => {
    console.log('books value', books)
    console.log('books length is', books.length)
  }, [books])

  useEffect(() => {
    if (dataFiltered && Array.isArray(dataFiltered.allBooks)) {
      setBooks(dataFiltered.allBooks)
    }
  }, [dataFiltered])


  if (loadingAll || loadingFiltered) return
  <p>loading</p>

  if (errorAll) return
  <p>error fetching all books: {errorAll} </p>

  if (errorFiltered) return <p>error fetching filtered books : {errorFiltered}</p>



  const genres = dataAll.allBooks.flatMap(book => book.genres)
  const uniqueGenres = [...new Set(genres)]
  console.log('unique genres array', uniqueGenres)

  const filterGenre = (genre) => {
    setGenreSelected(genre)
    console.log('filtered books by genre', genre)
  }

  const allGenres = () => {
    setGenreSelected(null)
    setBooks(dataAll.allBooks)
    console.log('resetting genre filter')
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
