import dayjs from 'dayjs'
import supabase from '@/utils/supabase'
import { fetchNewsData, fetchRandomNews } from '@/api/fetchNews'
import { categoryIdMap } from '@/composables/useCategoryMap'

const NEWS_TTL_MINUTES = 10

// 한글 카테고리 이름을 category_id로 변환
const getCategoryIdFromEnglishName = (category) => {
  // categoryNameMap에서 영어 이름에 해당하는 숫자찾기
  const categoryId = categoryIdMap[category]
  if (categoryId === undefined) {
    console.error(`카테고리 매핑 실패: ${category}`)
  }
  return categoryId
}

export async function getFreshNews(category, language) {
  // 영어 카테고리를 category_id로 변환
  const category_id = getCategoryIdFromEnglishName(category)
  console.log('category_id:', category_id)

  // Supabase에서 category_id로 뉴스 조회
  const { data: newsArr } = await supabase
    .from('news')
    .select('*')
    .eq('category_id', category_id)
    .order('created_at', { ascending: false })
    .limit(10)

  console.log(`Supabase 조회 결과: ${newsArr?.length || 0}개, category_id=${category_id}`)

  const now = dayjs()
  const isFresh =
    newsArr &&
    newsArr.length > 0 &&
    now.diff(dayjs(newsArr[0].created_at), 'minute') < NEWS_TTL_MINUTES
  console.log(`신선도: ${isFresh}, category_id=${category_id}`)

  if (isFresh) {
    console.log('신선한 뉴스:', newsArr)
    return newsArr
  } else {
    // fetchNewsData에 한글 카테고리 이름 직접 전달
    console.log(`신선도 false -> fetchNewsData 호출: category=${category}, language=${language}`)
    const freshNews = await fetchNewsData(category, language)
    console.log(`fetchNewsData 결과: ${freshNews?.length || 0}개`)
    console.log('freshNews:', freshNews)
    if (freshNews && freshNews.length > 0) {
      await supabase.from('news').upsert(
        freshNews.map((news) => {
          const mappedId = getCategoryIdFromEnglishName(news.category) || category_id
          return {
            news_id: news.article_id,
            category_id: mappedId,
            view_count: news.view_count,
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
      console.log('저장됨')
    }
    return freshNews || []
  }
}
export async function getFreshRamdomNews(language) {
  // Supabase에서 category_id로 뉴스 조회
  const { data: newsArr } = await supabase
    .from('news')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(20)

  console.log(`Supabase 조회 결과: ${newsArr?.length || 0}개`)

  const now = dayjs()
  const isFresh =
    newsArr &&
    newsArr.length > 0 &&
    now.diff(dayjs(newsArr[0].created_at), 'minute') < NEWS_TTL_MINUTES
  console.log(`신선도: ${isFresh}`)

  if (isFresh) {
    // console.log('신선한 뉴스:', newsArr)
    return newsArr
  } else {
    // fetchNewsData에 한글 카테고리 이름 직접 전달
    console.log(`신선도 false -> 랜덤한 fetchNewsData 호출`)
    const freshRandomNews = await fetchRandomNews(language)
    console.log(`fetchRandomNews 결과: ${freshRandomNews?.length || 0}개`)
    console.log('fetchRandomNews:', freshRandomNews)
    if (freshRandomNews && freshRandomNews.length > 0) {
      await supabase.from('news').upsert(
        freshRandomNews.map((news) => {
          const mappedId = getCategoryIdFromEnglishName(news.category)
          return {
            news_id: news.article_id,
            category_id: mappedId,
            view_count: news.view_count,
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
      console.log('저장됨')
    }
    return freshRandomNews || []
  }
}
