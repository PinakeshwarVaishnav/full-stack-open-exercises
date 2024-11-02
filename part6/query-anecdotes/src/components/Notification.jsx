import { useNotification } from '../context/NotificationContext'

const Notification = () => {
  const { state } = useNotification()
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    marginBottom: 5
  }

  if (!state.message) return null

  return (
    <div style={style} className="Notification">
      {state.message}
    </div>
  )
}

export default Notification
