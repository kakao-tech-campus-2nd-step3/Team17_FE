import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Main from './pages/Main'
import Login from './pages/Login'
import Footer from './components/Footer';

const App = () => {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/login" element={<Login />} />
        </Routes>
        <Footer />
      </div>
    </BrowserRouter>
  );
};

export default App
