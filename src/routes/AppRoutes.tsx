import { Route, Routes } from 'react-router'
import Main from '../pages/Main'
import Login from '../pages/Login'
import MyGroup from '../pages/MyGroup'
import SearchGroup from '../pages/SearchGroup'
import Market from '../pages/Market'
import MyPage from '../pages/MyPage'

const AppRoutes = () => {
  return (
    <div className='AppRoutes'>
        <Routes>
          <Route path='/' element={<Main />} />
          <Route path='/login' element={<Login />} />
          <Route path='/mygroup' element={<MyGroup />} />
          <Route path='/searchgroup' element={<SearchGroup />} />
          <Route path='/market' element={<Market />} />
          <Route path='/mypage' element={<MyPage />} />
        </Routes>
    </div>
  )
}

export default AppRoutes