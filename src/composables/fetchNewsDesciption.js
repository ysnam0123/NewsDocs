// utils/fetchArticleContent.js
import axios from 'axios'

export async function fetchArticleContent({ pressId, url }) {
  try {
    const { data } = await axios.get('http://localhost:3000/scrape', {
      params: { pressId, url },
    })
    return data.content
  } catch (err) {
    console.error('[fetchArticleContent 실패]', err)
    throw err
  }
}
