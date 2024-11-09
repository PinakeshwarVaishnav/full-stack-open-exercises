import { useNotification } from '../context/NotificationContext'

const Notification = () => {
  const [state, dispatch] = useNotification()
  const notification = state.notification
  console.log('state of the notification is', notification)
  if (!notification) {
    return null
  }

  if (notification.includes('invalid')) {
    console.log('message includes invalid')
    return <div className="error"> {notification}</div>
  }

  return <div className="blog">{notification}</div>
}

export default Notification
