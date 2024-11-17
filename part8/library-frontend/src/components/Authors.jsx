import { useMutation, useQuery } from '@apollo/client'
import GET_AUTHORS from '../graphql/queries/GetAuthors.query'
import ADD_AUTHOR_DETAIL from '../graphql/mutations/addAuthorDetail.mutation'
import { useState } from 'react'

const Authors = (props) => {
  const [name, setName] = useState('')
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

  const handleSubmit = async (e) => {
    e.preventDefault()
    console.log('value of born before submitting', born)
    console.log('value of name before submitting', name)
    try {
      await addAuthorDetail({
        variables: { name, setBornTo: parseInt(born) },
        update(cache, { data: { addAuthorDetail } }) {
          const updatedAuthors = authors[0].map(author => author.name === name ? {
            ...author, born: born
          } : author)

          cache.writeQuery({
            query: GET_AUTHORS,
            data: { allAuthors: updatedAuthors }
          })
        }
      })
      setBorn('')
      setName('')
      console.log('added author detail',)
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
        <label >name</label>
        <input type="text" value={name} onChange={e => setName(e.target.value)} />
        <br />
        <label >born</label>
        <input type="text" value={born} onChange={e => setBorn(e.target.value)} />
        <br />
        <button type='submit'>update author</button>
      </form>
    </div>
  )
}

export default Authors
