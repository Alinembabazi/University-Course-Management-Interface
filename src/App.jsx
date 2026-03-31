import { BrowserRouter } from 'react-router-dom'
import { useEffect } from 'react'
import { Toaster } from 'react-hot-toast'
import AppRoutes from './routes/AppRoutes'
import { AuthProvider } from './context/AuthContext'

function App() {
  useEffect(() => {
    const redirectPath = sessionStorage.getItem('redirect')

    if (redirectPath) {
      sessionStorage.removeItem('redirect')
      window.history.replaceState(null, '', redirectPath)
    }
  }, [])

  return (
    <BrowserRouter>
      <AuthProvider>
        <AppRoutes />
        <Toaster position="top-right" toastOptions={{ duration: 3000 }} />
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App
