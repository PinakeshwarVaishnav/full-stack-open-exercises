import { useMutation, useQuery } from '@apollo/client'
import GET_AUTHORS from '../graphql/queries/GetAuthors.query'
import ADD_AUTHOR_DETAIL from '../graphql/mutations/addAuthorDetail.mutation'
import { useState } from 'react'
import Select from 'react-select'

const Authors = (props) => {
  const [selectedAuthor, setSelectedAuthor] = useState(null)
  const [born, setBorn] = useState('')
  const [addAuthorDetail] = useMutation(ADD_AUTHOR_DETAIL)
  const { loading, error, data } = useQuery(GET_AUTHORS)
  if (!props.show) {
    return null
  }

  console.log('data fetched ', data)
  if (loading) return
  <p>loading...</p>

  if (error) return
  <p>error: {error}</p>

  const authors = [data.allAuthors]
  console.log('authors', authors)

  const options = authors ? authors[0].map(author => ({
    value: author.name,
    label: author.name
  })) : []

  const handleSubmit = async (e) => {
    e.preventDefault()
    console.log('selected author value is', selectedAuthor)
    if (!selectedAuthor || !born) {
      alert('please select an author and enter a birth year')
      return
    }

    try {
      await addAuthorDetail({
        variables: { name: selectedAuthor.value, setBornTo: parseInt(born) },
        update(cache, { data: { addAuthorDetail } }) {
          const updatedAuthors = authors[0].map(author => author.name === selectedAuthor.value ? {
            ...author, born: born
          } : author)

          cache.writeQuery({
            query: GET_AUTHORS,
            data: { allAuthors: updatedAuthors }
          })
        }
      })
      setBorn('')
      alert('author birth year updated successfully')
    } catch (err) {
      console.log('error updating author', err)
    }
  }

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {authors[0].map((a) => (
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <h2>Set birthyear</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label >select author</label>
          <Select options={options} onChange={setSelectedAuthor} value={selectedAuthor} placeholder="select an author" />
        </div>
        <div>
          <label >born</label>
          <input type="number" value={born} onChange={e => setBorn(e.target.value)} />
        </div>
        <button type='submit'>update author</button>
      </form>
    </div>
  )
}

export default Authors
