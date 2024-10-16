const Notification = ({ message }) => {
  console.log('Notification message:', message)
  if (!message) {
    return null
  }

  if (message.includes('invalid')) {
    console.log('message includes invalid')
    return <div className="error"> {message}</div>
  }

  return <div className="blog">{message}</div>
}

export default Notification
