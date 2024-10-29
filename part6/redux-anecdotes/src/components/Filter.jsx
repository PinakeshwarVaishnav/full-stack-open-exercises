import { useDispatch, useSelector } from 'react-redux'
import { setFilter } from '../reducers/filterReducer'

const Filter = () => {
  const dispatch = useDispatch()
  const searchTerm = useSelector(state => state.filter.searchTerm)
  const handleChange = (event) => {
    console.log('setfilter is', setFilter)
    dispatch(setFilter(event.target.value))
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
