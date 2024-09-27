import { Route, Routes } from 'react-router'
import Main from '../pages/Main'
import Login from '../pages/Login'

const AppRoutes = () => {
  return (
    <div className='AppRoutes'>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/login" element={<Login />} />
        </Routes>
    </div>
  )
}

export default AppRoutes