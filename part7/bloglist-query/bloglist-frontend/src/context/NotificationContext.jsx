import React, { createContext, useContext, useReducer, } from "react";

const NotificationContext = createContext()

const initialState = { notification: [null] }

const notificationReducer = (state, action) => {
  switch (action.type) {
    case 'ADD':
      return { notification: action.payload }
    case 'CLEAR':
      return initialState
    default:
      return state
  }
}

export const NotificationProvider = ({ children }) => {
  const [state, dispatch] = useReducer(notificationReducer, initialState)
  return (
    <NotificationContext.Provider value={{ state, dispatch }}>
      {children}
    </NotificationContext.Provider>
  )
}

export const useNotification = () => useContext(NotificationContext)
