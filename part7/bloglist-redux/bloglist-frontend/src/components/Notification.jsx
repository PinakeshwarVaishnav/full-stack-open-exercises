import { useSelector } from "react-redux"

const Notification = () => {
  const notifications = useSelector(state => state.notifications)

  console.log('notifications are', notifications)

  if (notifications.length === 0) {
    console.log('no notifications to display')
    return null
  }


  return notifications.map(notification => {


    if (notification.message.includes('invalid')) {
      console.log('message includes invalid')
      return <div className="error"> {notification.message}</div>
    }

    return <div className="blog">{notification.message}</div>

  })
}


export default Notification
