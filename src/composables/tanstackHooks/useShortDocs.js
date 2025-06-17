import { fetchShortDocs } from '@/api/fetchNews'
import { useQuery } from '@tanstack/vue-query'

export function useShortDocsData(keywords, language) {
  return useQuery({
    queryKey: ['shortDocs', keywords, language],
    queryFn: () => fetchShortDocs(keywords, language),
    staleTime: 1000 * 60 * 15, // 15분 마다 갱신
    cacheTime: 1000 * 60 * 30, // 30분 동안 메모리에 유지
  })
}
