import axiosInstance from './axiosInstance'

const getMarketView = async (productId: number) => {
  const response = await axiosInstance.get(`/api/market/${productId}`)
  return response.data
}

export default getMarketView
