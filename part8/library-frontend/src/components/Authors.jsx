import { useQuery } from '@apollo/client'
import GET_AUTHORS from '../graphql/queries/GetAuthors.query'

const Authors = (props) => {
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
    </div>
  )
}

export default Authors
