import { useMutation } from '@apollo/client'
import { useState } from 'react'
import ADD_BOOK from '../graphql/mutations/addBook.mutation'
import GET_BOOKS from '../graphql/queries/GetBooks.query'

const NewBook = () => {
  const [addBook] = useMutation(ADD_BOOK, {
    update(cache, { data: { addBook } }) {
      const books = cache.readQuery({ query: GET_BOOKS })
      console.log('books before updating', books)

      cache.writeQuery({
        query: GET_BOOKS,
        data: { allBooks: books.allBooks.concat([addBook]) }
      })
    }
  })
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [published, setPublished] = useState('')
  const [genre, setGenre] = useState('')
  const [genres, setGenres] = useState([])
  const publishedAsNumber = parseInt(published)



  const submit = async (event) => {
    event.preventDefault()

    console.log('add book...')
    addBook({
      variables: { title, published: publishedAsNumber, author, genres }
    })

    setTitle('')
    setPublished('')
    setAuthor('')
    setGenres([])
    setGenre('')
  }

  const addGenre = () => {
    setGenres(genres.concat(genre))
    setGenre('')
  }

  return (
    <div>
      <form onSubmit={submit}>
        <div>
          title
          <input
            className='border-2 border-gray-300 rounded-md '
            value={title}
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          author
          <input
            className='border-2 border-gray-300 rounded-md '
            value={author}
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          published
          <input
            className='border-2 border-gray-300 rounded-md '
            type="number"
            value={published}
            onChange={({ target }) => setPublished(target.value)}
          />
        </div>
        <div>
          <input
            className='border-2 border-gray-300 rounded-md '
            value={genre}
            onChange={({ target }) => setGenre(target.value)}
          />
          <button onClick={addGenre} type="button" className='bg-blue-500 hover:bg-blue-950 text-white font-bold p-1 px-2 rounded'>
            add genre
          </button>
        </div>
        <div>genres: {genres.join(' ')}</div>
        <button type="submit" className='bg-blue-500 hover:bg-blue-950 text-white font-bold p-1 px-2 rounded'>create book</button>
      </form>
    </div>
  )
}

export default NewBook
