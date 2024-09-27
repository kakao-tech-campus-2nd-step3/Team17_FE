import './App.css'
import { BrowserRouter } from 'react-router-dom'
import Footer from './components/Footer';
import AppRoutes from './routes/AppRoutes';

const App = () => {
  return (
    <BrowserRouter>
      <div className="App">
        <AppRoutes />
        <Footer />
      </div>
    </BrowserRouter>
  );
};

export default App
