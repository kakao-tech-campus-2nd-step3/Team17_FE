import './App.css'
import { BrowserRouter, useLocation } from 'react-router-dom'
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

const AppWrapper = (): JSX.Element => (
    <BrowserRouter>
        <App />
    </BrowserRouter>
)

export default AppWrapper
