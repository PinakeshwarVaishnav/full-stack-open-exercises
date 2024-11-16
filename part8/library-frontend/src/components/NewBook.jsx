import { useMutation } from '@apollo/client'
import { useState } from 'react'
import ADD_BOOK from '../graphql/mutations/addBook.mutation'
import GET_BOOKS from '../graphql/queries/GetBooks.query'

const NewBook = (props) => {
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

  if (!props.show) {
    return null
  }

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
            value={title}
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          author
          <input
            value={author}
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          published
          <input
            type="number"
            value={published}
            onChange={({ target }) => setPublished(target.value)}
          />
        </div>
        <div>
          <input
            value={genre}
            onChange={({ target }) => setGenre(target.value)}
          />
          <button onClick={addGenre} type="button">
            add genre
          </button>
        </div>
        <div>genres: {genres.join(' ')}</div>
        <button type="submit">create book</button>
      </form>
    </div>
  )
}

export default NewBook
