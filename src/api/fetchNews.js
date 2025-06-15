import axios from 'axios'

// 뉴스 불러오기
export const fetchNewsData = async (keywords, language) => {
  try {
    const res = await axios.get('https://newsdata.io/api/1/latest', {
      params: {
        apikey: import.meta.env.VITE_NEWSDATA_API_KEY,
        q: keywords,
        language,
      },
    })
    const results = res.data?.results.filter((news) => news.description !== null)
    return results
  } catch (e) {
    console.error(e)
    return []
  }
}
