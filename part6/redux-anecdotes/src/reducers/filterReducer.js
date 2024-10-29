const initialState = {
  searchTerm: ''
}

const filterReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_FILTER':
      return action.payload

    default:
      return state
  }
}

export const setFilter = (searchTerm) => ({
  type: 'SET_FILTER',
  payload: searchTerm
})

export default filterReducer
