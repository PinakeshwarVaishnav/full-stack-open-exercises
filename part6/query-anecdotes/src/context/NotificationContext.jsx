import { useContext, useEffect, useReducer, createContext } from "react";

const NotificationContext = createContext()

const initialState = { message: null }

const reducer = (state, action) => {
  switch (action.type) {
    case 'SHOW_NOTIFICATION':
      return { message: action.payload }
    case 'HIDE_NOTIFICATION':
      return { message: null }
    default:
      return state
  }
}

export const NotificationProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState)

  useEffect(() => {
    if (state.message) {
      const timer = setTimeout(() => {
        dispatch({ type: 'HIDE_NOTIFICATION' })
      }, 5000)

      return () => clearTimeout(timer)
    }
  }, [state.message])

  const showNotification = (message) => {
    dispatch({ type: 'SHOW_NOTIFICATION', payload: message })
  }

  return (
    <NotificationContext.Provider value={{ state, showNotification }}>
      {children}
    </NotificationContext.Provider>
  )
}

export const useNotification = () => {
  return useContext(NotificationContext)
}
