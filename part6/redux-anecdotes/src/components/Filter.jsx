import { useDispatch, useSelector } from 'react-redux'
import { setSearchTerm } from '../reducers/filterReducer'

const Filter = () => {
  const dispatch = useDispatch()
  const searchTerm = useSelector(state => state.filter.searchTerm)
  const handleChange = (event) => {
    console.log('setSearchTerm is', setSearchTerm)
    dispatch(setSearchTerm(event.target.value))
  }
  const style = {
    marginBottom: 10
  }

  return (
    <div style={style}>
      filter <input onChange={handleChange} type='text' value={searchTerm} />
    </div>
  )
}

export default Filter
