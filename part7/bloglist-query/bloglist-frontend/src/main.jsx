import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { NotificationProvider } from './context/NotificationContext'
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClient } from './context/QueryClient'
import { UserProvider } from './context/UserContext'

ReactDOM.createRoot(document.getElementById('root')).render(
  <QueryClientProvider client={queryClient}>
    <NotificationProvider>
      <UserProvider>
        <App />
      </UserProvider>
    </NotificationProvider>
  </QueryClientProvider>
)
