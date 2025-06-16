// util/newsCache.js
import dayjs from 'dayjs'
import supabase from '@/utils/supabase'
import { fetchNewsData } from '@/api/fetchNews'

const NEWS_TTL_MINUTES = 10

export async function getFreshNews(keywords, language) {
  const { data: newsArr } = await supabase
    .from('news')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(50)

  const now = dayjs()
  const isFresh =
    newsArr &&
    newsArr.length > 0 &&
    now.diff(dayjs(newsArr[0].created_at), 'minute') < NEWS_TTL_MINUTES

  if (isFresh) {
    console.log(`Supabase에서 가져옴: "${keywords}" (${language})`)
    return newsArr
  } else {
    const freshNews = await fetchNewsData(keywords, language)
    if (freshNews && freshNews.length > 0) {
      await supabase.from('news').upsert(
        freshNews.map((news) => ({
          news_id: news.article_id,
          category_id: news.category_id ?? null,
          title: news.title,
          link: news.link,
          keywords: news.keywords ?? [],
          description: news.description,
          pub_date: news.pub_date ?? null,
          image_url: news.image_url,
          source_name: news.source_name,
          category: news.category,
        })),
      )
    }
    return freshNews
  }
}
