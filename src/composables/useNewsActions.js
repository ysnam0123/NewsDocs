import { useNewsStore } from '@/stores/newsStore'
import supabase from '@/utils/supabase'
import { useRouter } from 'vue-router'

// news component에서 사용할 함수들을 지정
export const useNewsActions = () => {
  const interests = [
    { id: 'politics', label: '정치' },
    { id: 'sports', label: '스포츠' },
    { id: 'entertain', label: '연예' },
    { id: 'culture', label: '문화' },
    { id: 'abroad', label: '해외' },
    { id: 'society', label: '사회' },
    { id: 'economy', label: '경제' },
    { id: 'etc', label: '그 외' },
  ]
  const categoryIdMap = {
    politics: 1, // 정치
    sports: 2, // 스포츠
    entertain: 3, // 연예
    culture: 4, // 문화
    abroad: 5, // 해외
    society: 6, // 사회
    economy: 7, // 경제
    etc: 8, // 기타
  }

  const router = useRouter()
  const newsStore = useNewsStore()
  newsStore.selectedNews

  // supabase에 뉴스 저장하고 selectedNews
  const saveNews = async (news) => {
    // news 전역저장
    newsStore.selectedNews = news
    const getCategoryId = (categoryInput) => {
      // category가 없으면 etc로 분류
      if (!categoryInput) {
        return categoryIdMap['etc']
      }

      for (const interest of interests) {
        if (categoryInput.includes(interest.id)) {
          return categoryIdMap[interest.id]
        }
      }

      return categoryIdMap['etc']
    }
    const categoryId = getCategoryId(news.category)
    console.log('카테고리 확인:', news.category, 'categoryId:', categoryId)
    // 해당 뉴스가 supabase에 있는지
    const { data: savedNews, error } = await supabase
      .from('news')
      .select(
        `news_id, view_count, description, title, image_url,
            like!like_news_id_fkey (like_id)`,
      )
      .eq('news_id', news.article_id)
      .maybeSingle()

    console.log(news.article_id)
    if (error) {
      console.error('뉴스 저장 실패', error)
      return
    }
    // 없다면 supabase insert
    if (!savedNews) {
      const { data: insertData, error: insertError } = await supabase
        .from('news')
        .insert([
          {
            news_id: news.article_id,
            category_id: categoryId,
            view_count: 0,
            title: news.title,
            link: news.link,
            keywords: news.keywords,
            description: news.description,
            pub_date: news.pub_date,
            image_url: news.image_url,
            source_name: news.source_name,
            category: news.category,
          },
        ])
        .select()

      console.log('저장된 데이터 ', insertData)
      if (insertError) {
        console.error('뉴스 저장 실패함', insertError)
      }
    } else {
      console.log('이미 저장된 뉴스입니다:', news.title)
    }
  }

  // view count 증가
  const updateViewCount = async (newsId) => {
    const { error } = await supabase.rpc('increment_viewcount', {
      news_id_input: newsId,
    })
    if (error) {
      console.error('조회수 증가 에러', error)
    }
  }
  // 뉴스 클릭 시 저장 -> 조회수 증가 -> 디테일 페이지 이동
  const toDetailHandler = async (news) => {
    await updateViewCount(news.article_id)
    router.push(`/news/detail/${news.article_id}`)
  }

  return {
    saveNews,
    updateViewCount,
    toDetailHandler,
  }
}
