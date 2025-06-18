const newsResults = []
  // 원하는 카테고리 순서 (한글)
  const desiredCategories = ['정치', '스포츠', '연예', '문화', '해외', '사회', '경제']
  if (isLoggedIn.value && interestList.value.length > 0) {
    try {
      // 사용자의 관심사에 포함된 카테고리만 필터링, 순서 유지
      const userCategories = desiredCategories.filter((koreanCategory) =>
        interestList.value.some((item) => {
          // item.name이 한글 또는 영어일 경우 처리
          const itemCategory =
            item.name && categoryNameMap[item.name.toLowerCase()]
              ? categoryNameMap[item.name.toLowerCase()]
              : Object.values(categoryNameMap).find(
                  (korean) =>
                    categoryIdMap[
                      Object.keys(categoryNameMap).find((key) => categoryNameMap[key] === korean)
                    ] === item.id,
                )
          return itemCategory === koreanCategory
        }),
      )

      // 관심사가 없으면 전체 desiredCategories 사용
      const categoriesToFetch = userCategories.length > 0 ? userCategories : desiredCategories

      // 각 카테고리에 대해 뉴스 가져오기
      for (const koreanCategory of categoriesToFetch) {
        console.log(`뉴스 가져오기: ${koreanCategory}`)
        const result = await getFreshNews(koreanCategory, 'ko')
        newsResults.push(result)
        console.log(
          `뉴스 결과 (${koreanCategory}):`,
          result.map((news) => ({
            title: news.title,
            category_id: news.category_id,
            category: news.category,
          })),
        )
        await new Promise((resolve) => setTimeout(resolve, 300))
      }
      allNews.value = newsResults
      console.log(
        'allNews:',
        allNews.value.map((arr, index) => ({
          index,
          category: categoriesToFetch[index],
          category_id: arr[0]?.category_id,
          titles: arr.map((news) => news.title),
        })),
      )
      console.log('allNews 결과:', allNews.value)

      loading.value = false
    } catch (error) {
      console.error('Error fetching news:', error)
      loading.value = false
    }
  } else {
    loading.value = false
  }
  // post 불러오기
  const { data, error } = await supabase
    .from('post')
    .select(
      `
    post_id,
    title,
    contents,
    category_id,
    profiles (
    nickname,
    profile_img
    ),
    comments!comments_post_id_fkey (
      comments_id,
      contents
  )
      `,
    )
    .order('created_at', { ascending: true })
    .limit(3)
  if (error) {
    console.error('post 불러오기 실패', error)
    return
  }
  for (const post of data) {
    const likeCount = await getLikeCount(post.post_id)
    post.like_count = likeCount
  }
  posts.value = data
})


// newsCache.js

import dayjs from 'dayjs'
import supabase from '@/utils/supabase'
import { fetchNewsData } from '@/api/fetchNews'
import { categoryIdMap, categoryNameMap } from '@/composables/useCategoryMap'

const NEWS_TTL_MINUTES = 10

// 한글 카테고리 이름을 category_id로 변환
const getCategoryIdFromKoreanName = (koreanCategory) => {
  // categoryNameMap에서 한글 이름에 해당하는 영어 키 찾기
  const engKey = Object.keys(categoryNameMap).find((key) => categoryNameMap[key] === koreanCategory)
  if (!engKey) {
    console.warn(`[카테고리 매핑 실패] 한글 카테고리: ${koreanCategory}`)
    return categoryIdMap['other'] || 8 // 기본값: '그 외'
  }
  const categoryId = categoryIdMap[engKey]
  console.log(`[카테고리 매핑] 한글: ${koreanCategory} | 영어: ${engKey} | ID: ${categoryId}`)
  return categoryId
}

// 영어 카테고리 이름에서 category_id로 변환 (기존 함수 유지)
const getCategoryIdFromName = (categoryArrStr) => {
  let engKey = null
  try {
    if (!categoryArrStr) return null
    if (typeof categoryArrStr === 'string' && categoryArrStr.startsWith('[')) {
      const arr = JSON.parse(categoryArrStr)
      if (Array.isArray(arr) && arr.length > 0) {
        engKey = arr[0].toLowerCase()
      }
    } else if (typeof categoryArrStr === 'string') {
      engKey = categoryArrStr.toLowerCase()
    }
    const id = categoryIdMap[engKey] ?? null
    // console.log('[카테고리 매핑] 원본:', categoryArrStr, '| 추출:', engKey, '| 매핑된 ID:', id)
    return id
  } catch {
    return null
  }
}

export async function getFreshNews(koreanCategory, language) {
  // console.log(`getFreshNews 호출: category=${koreanCategory}, language=${language}`)

  // 한글 카테고리를 category_id로 변환
  const category_id = getCategoryIdFromKoreanName(koreanCategory)

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
    console.log(
      `신선도 false -> fetchNewsData 호출: category=${koreanCategory}, language=${language}`,
    )
    const freshNews = await fetchNewsData(koreanCategory, language)
    console.log(`fetchNewsData 결과: ${freshNews?.length || 0}개`)
    console.log('freshNews:', freshNews)
    if (freshNews && freshNews.length > 0) {
      await supabase.from('news').upsert(
        freshNews.map((news) => {
          const mappedId = getCategoryIdFromName(news.category) || category_id
          // console.log(
          //   '[뉴스 저장] news.article_id:',
          //   news.article_id,
          //   '| category:',
          //   news.category,
          //   '| category_id:',
          //   mappedId,
          // )
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
    return freshNews || []
  }
}
