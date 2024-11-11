import { createContext, useContext, useReducer, } from "react";

export const UserContext = createContext()
export const UserDispatchContext = createContext()

const initialState = null

const notificationReducer = (state, action) => {
  switch (action.type) {
    case 'ADD':
      return action.payload
    case 'CLEAR':
      return null
    default:
      return state
  }
}

export const UserProvider = ({ children }) => {
  const [state, dispatch] = useReducer(notificationReducer, initialState)
  return (
    <UserContext.Provider value={state}>
      <UserDispatchContext.Provider value={dispatch}>
        {children}
      </UserDispatchContext.Provider>
    </UserContext.Provider>
  )
}
