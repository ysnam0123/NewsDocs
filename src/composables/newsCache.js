// util/newsCache.js
import dayjs from 'dayjs'
import supabase from '@/utils/supabase'
import { fetchNewsData } from '@/api/fetchNews'
import { categoryIdMap } from '@/composables/useCategoryMap'

const NEWS_TTL_MINUTES = 10
const getCategoryIdFromName = (categoryArrStr) => {
  let engKey = null
  try {
    if (!categoryArrStr) return null
    // 배열 문자열이면 파싱
    if (typeof categoryArrStr === 'string' && categoryArrStr.startsWith('[')) {
      const arr = JSON.parse(categoryArrStr)
      if (Array.isArray(arr) && arr.length > 0) {
        engKey = arr[0].toLowerCase()
      }
    } else if (typeof categoryArrStr === 'string') {
      engKey = categoryArrStr.toLowerCase()
    }
    const id = categoryIdMap[engKey] ?? null
    console.log('[카테고리 매핑] 원본:', categoryArrStr, '| 추출:', engKey, '| 매핑된 ID:', id)
    return categoryIdMap[engKey] ?? null
  } catch {
    return null
  }
}

export async function getFreshNews(keywords, language) {
  // news 테이블에서 생성된 기사를 오름차순으로 선택 50개
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
        freshNews.map((news) => {
          const mappedId = getCategoryIdFromName(news.category)
          // 디버깅: 각 뉴스별 매핑 결과
          console.log(
            '[뉴스 저장] news.article_id:',
            news.article_id,
            '| category:',
            news.category,
            '| category_id:',
            mappedId,
          )
          return {
            news_id: news.article_id,
            category_id: mappedId,
            title: news.title,
            link: news.link,
            keywords: news.keywords ?? [],
            description: news.description,
            pub_date: news.pub_date ?? null,
            image_url: news.image_url,
            source_name: news.source_name,
            category: news.category,
          }
        }),
      )
    }
    return freshNews
  }
}
