import { useNavigate } from 'react-router'
import { useQuery } from '@tanstack/react-query'
import { useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import axiosInstance from '../api/axiosInstance'

const fetchLogin = async (code: string | null): Promise<string> => {
  const { data } = await axiosInstance.get(`/api/oauth/login`, {
    params: {
      code,
    },
  })
  return data
}

const KakaoRedirect = () => {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const code = searchParams.get('code')

  const {
    data: tokenData,
    isSuccess,
    isLoading,
    isError,
    error: queryError,
  } = useQuery({
    queryKey: ['kakaoLogin', code],
    queryFn: () => fetchLogin(code),
    enabled: !!code,
    retry: 1,
  })

  useEffect(() => {
    if (isSuccess && tokenData) {
      localStorage.setItem('authToken', tokenData)
      navigate('/')
    }
    if (!code) {
      navigate('/login', { replace: true })
    }
  }, [isSuccess, navigate, tokenData, code])
  if (isLoading) return <div>로그인 중 ...</div>
  if (isError)
    return <div>에러가 발생했습니다: {`${(queryError as Error).message}`}</div>
  if (!code)
    return <div>유효한 코드가 없습니다. 로그인 페이지로 이동합니다.</div>

  return <div>로그인 리다이렉트 중</div>
}

export default KakaoRedirect
