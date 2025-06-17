import { fetchNewsData } from '@/api/fetchNews'
import { useInterestStore } from '@/stores/interestStore'
import { useQuery } from '@tanstack/vue-query'
import { computed } from 'vue'

export function useInterestNewsQueries(language = 'ko') {
  const interestStore = useInterestStore()
  const interestList = computed(() => interestStore.interestList)

  // interestList에 있는 각 id마다 useQuery 호출해서 배열로 반환
  const interestNewsQueries = computed(() =>
    interestList.value.map((item) =>
      useQuery({
        queryKey: ['newsData', item.id, language],
        queryFn: () => fetchNewsData(item.id, language),
        staleTime: 1000 * 60 * 15,
        cacheTime: 1000 * 60 * 30,
      }),
    ),
  )

  return { interestNewsQueries }
}
