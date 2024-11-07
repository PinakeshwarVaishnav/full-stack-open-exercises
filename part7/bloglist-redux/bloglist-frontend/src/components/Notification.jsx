import { useSelector } from "react-redux"

const Notification = () => {
  const notifications = useSelector(state => state.notifications)

  console.log('notifications are', notifications)

  if (notifications.length === 0) {
    console.log('no notifications to display')
    return null
  }

  if (notifications.includes('invalid')) {
    console.log('message includes invalid')
    return <div className="error"> {notifications}</div>
  }

  return <div className="blog">{notifications}</div>

}



export default Notification
