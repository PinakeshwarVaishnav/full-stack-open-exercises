import { createContext, useContext, useReducer, } from "react";

export const NotificationContext = createContext()
export const NotificationDispatchContext = createContext()

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

export const NotificationProvider = ({ children }) => {
  const [state, dispatch] = useReducer(notificationReducer, initialState)
  return (
    <NotificationContext.Provider value={state}>
      <NotificationDispatchContext.Provider value={dispatch}>
        {children}
      </NotificationDispatchContext.Provider>
    </NotificationContext.Provider>
  )
}
