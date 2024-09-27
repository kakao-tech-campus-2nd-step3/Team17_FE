import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Main from './pages/Main';
import Login from './pages/Login';
import Mygroup from './pages/GroupSearch';

const App = () => {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path='/' element={<Main />} />
          <Route path='/login' element={<Login />} />
          <Route path='/groupsearch' element={<Mygroup />} />
        </Routes>
      </div>
    </BrowserRouter>
    
  );
};

export default App;
