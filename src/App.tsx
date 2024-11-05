import './App.css'
import { useLocation, useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import Footer from './components/Footer'
import AppRoutes from './routes/AppRoutes'
import { setupAxiosInterceptor } from './api/axiosInstance'

const App = () => {
  const location = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    setupAxiosInterceptor(navigate)
  }, [navigate])

  return (
    <div className="App">
      <AppRoutes />
      {location.pathname !== '/login' && <Footer />}
    </div>
  )
}

export default App
