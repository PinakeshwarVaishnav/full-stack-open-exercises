import { useEffect, useState } from 'react'
import GET_BOOKS from '../graphql/queries/GetBooks.query'
import { useQuery } from "@apollo/client"
import GET_USER from '../graphql/queries/GetUser.query'

const Recommendations = () => {
  const { loading: booksLoading, error: booksError, data: booksData } = useQuery(GET_BOOKS)
  const { loading: userLoading, error: userError, data: userData } = useQuery(GET_USER)
  const [books, setBooks] = useState([])
  const [favoriteGenre, setFavoriteGenre] = useState(null)

  useEffect(() => {
    if (booksData && Array.isArray(booksData.allBooks)) {
      setBooks(booksData.allBooks)
    }
  }, [booksData])

  useEffect(() => {
    console.log('books value', books)
  })

  useEffect(() => {
    if (userData) {
      setFavoriteGenre(userData.me.favoriteGenre)
    }
  }, [userData])

  useEffect(() => {
    if (favoriteGenre) {
      const filteredBooks = books.filter(book => book.genres.includes(favoriteGenre))
      setBooks(filteredBooks)
    }
  }, [favoriteGenre])


  if (userLoading || booksLoading) return
  <p>loading</p>

  if (userError || booksError) return
  <p>error: {userError?.message || booksError?.message}</p>

  console.log('fetched books data is', booksData)
  console.log('fetched user data is', userData)





  return (
    <div className='relative overflow-x-auto shadow-md sm:rounded-lg'>
      <h2 className="text-3xl font-bold p-3">recommendations</h2>
      {favoriteGenre ? <>books in your favorite genre <span className='font-bold'>{favoriteGenre}</span> </> : <></>}
      <table className='w-full text-left text-gray-500'>
        <thead className='text-s text-gray-700 '>
          <tr className='bg-white border-b hover:bg-gray-100'>
            <th className='px-6 py-4'>book</th>
            <th className='px-6 py-4'>author</th>
            <th className='px-6 py-4'>published</th>
          </tr>
        </thead>
        <tbody>
          {favoriteGenre &&
            books.length > 0 && (
              books.map(book => (
                <tr className='bg-white border-b hover:bg-gray-100' key={book.title}>
                  <td>{book.title}</td>
                  <td>{book.author.name}</td>
                  <td>{book.published}</td>
                </tr>
              )))}
        </tbody>
      </table>
    </div >
  )
}

export default Recommendations
