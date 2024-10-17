import { Route, Routes } from 'react-router-dom'
import Main from '../pages/Main'
import Login from '../pages/Login'
import MyGroup from '../pages/MyGroup'
import SearchGroup from '../pages/SearchGroup'
import Market from '../pages/Market'
import MyPage from '../pages/MyPage'
import Ranking from '../pages/Ranking'
import Chatting from '../pages/Chatting'
import AddGroup from '../pages/AddGroup'
import KakaoRedirect from '../pages/KakaoRedirect'

const AppRoutes = () => {
  return (
    <div className="AppRoutes">
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/login" element={<Login />} />
        <Route path="/mygroup" element={<MyGroup />} />
        <Route path="/searchgroup" element={<SearchGroup />} />
        <Route path="/market" element={<Market />} />
        <Route path="/mypage" element={<MyPage />} />
        <Route path="/ranking/:groupId" element={<Ranking />} />
        <Route path="/chat/:groupId" element={<Chatting />} />
        <Route path="/addGroup" element={<AddGroup />} />
        <Route path="/oauth" element={<KakaoRedirect />} />
      </Routes>
    </div>
  )
}

export default AppRoutes
