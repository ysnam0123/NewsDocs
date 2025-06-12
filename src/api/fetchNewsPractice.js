import axiosInstance from './news'

export const fetchNews = async (keyword, language = 'ko') => {
  try {
    const response = await axiosInstance.get('latest', {
      params: {
        apikey: import.meta.env.VITE_NEWSDATA_API_KEY,
        q: keyword,
        language,
      },
    })
    return response.data?.results || []
  } catch (error) {
    console.error(error)
  }
}
