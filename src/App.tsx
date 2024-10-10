import './App.css'
import { useLocation } from 'react-router-dom'
import Footer from './components/Footer'
import AppRoutes from './routes/AppRoutes'

const App = () => {
  const location = useLocation()

  return (
    <div className="App">
      <AppRoutes />
      {location.pathname !== '/login' && <Footer />}
    </div>
  )
}


export default App
