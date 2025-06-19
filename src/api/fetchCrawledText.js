import axios from 'axios'

export const fetchCrawledText = async (sourceName, url) => {
  try {
    const response = await axios.get('https://my-news-scraper-production.up.railway.app/scrape', {
      params: { source_name: sourceName, url },
    })
    console.log('서버 응답:', response.data)
    const { htmlContent } = response.data

    return htmlContent || ''
  } catch (e) {
    console.error('크롤링 텍스트 가져오기 실패:', e.message, e.response?.data)
    return ''
  }
}
