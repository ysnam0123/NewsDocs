import axios from 'axios'

// 국내 뉴스 불러오기
export const fetchKoreanNewsData = async (keyword) => {
  const res = await axios.get('https://newsdata.io/api/1/news', {
    params: {
      apikey: import.meta.env.VITE_NEWSDATA_API_KEY,
      q: keyword,
      language: 'ko',
    },
  })
  return res.data.results.slice(0, 10)
}

// 해외 뉴스 불러오기
export const fetchForeignNews = async (keyword) => {
  const res = await axios.get('https://newsdata.io/api/1/news', {
    params: {
      apikey: import.meta.env.VITE_NEWSDATA_API_KEY,
      q: keyword,
      language: 'en',
    },
  })
  return res.data.results.slice(0, 10)
}
