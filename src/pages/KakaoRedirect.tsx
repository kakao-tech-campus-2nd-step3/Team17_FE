import { useEffect } from 'react'
import { useNavigate } from 'react-router'
import axiosInstance from '../api/axiosInstance'

const KakaoRedirect = () => {
  const navigate = useNavigate()

  useEffect(() => {
    const code = new URL(document.location.toString()).searchParams.get('code')

    const fetchLogin = async () => {
      try {
        const response = await axiosInstance.get(`/api/oauth/login`, {
          params: {
            code,
          },
        })

        const token = response.data

        if (token) {
          localStorage.setItem('authToken', token)
          navigate('/')
        }
      } catch (error) {
        // 추후 에러 처리 예정
        // eslint-disable-next-line no-console
        console.error('로그인 에러: ', error)
      }
    }

    fetchLogin()
  }, [navigate])

  return <div>KakaoRedirect</div>
}

export default KakaoRedirect
