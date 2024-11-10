import { useContext } from 'react'
import { NotificationContext } from '../context/NotificationContext'

const Notification = () => {
  const state = useContext(NotificationContext)
  const notification = state
  console.log('state of the notification is', notification)

  if (!notification) return null

  return (
    <div className='notification'>
      {notification}    </div>
  )
}

export default Notification
