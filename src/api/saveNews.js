import supabase from '@/utils/supabase'

// supabase에 news저장
export const saveNewsToSupabase = async (newsList, origin) => {
  if (!newsList || newsList.length === 0) return

  const newsMap = newsList.map((news) => ({
    title: news.title,
    url: news.link,
    image_url: news.image_url,
    source_name: news.source_name,
    description: news.description,
    keywords: news.keywords?.join(', '),
  }))

  const { error } = await supabase.from('news_data').insert(newsMap)

  if (error) {
    console.error('저장 실패', error)
  } else {
    console.log(`supabase newsData (${origin})`)
  }
}
