import politicsIcon from '@/assets/icons/politicsIcon.svg'
import sportsIcon from '@/assets/icons/sportsIcon.svg'
import entertainmentIcon from '@/assets/icons/entertainmentIcon.svg'
import cultureIcon from '@/assets/icons/cultureIcon.svg'
import worldIcon from '@/assets/icons/worldIcon.svg'
import societyIcon from '@/assets/icons/societyIcon.svg'
import economyIcon from '@/assets/icons/economyIcon.svg'
import etcIcon from '@/assets/icons/etcIcon.svg'

export const allCategoryMap = [
  { num: 1, id: 'politics', label: '정치', icon: politicsIcon },
  { num: 2, id: 'sports', label: '스포츠', icon: sportsIcon },
  { num: 3, id: 'entertainment', label: '연예', icon: entertainmentIcon },
  { num: 3, id: 'entertain', label: '연예', icon: entertainmentIcon },
  { num: 4, id: 'culture', label: '문화', icon: cultureIcon },
  { num: 5, id: 'world', label: '해외', icon: worldIcon },
  { num: 6, id: 'society', label: '사회', icon: societyIcon },
  { num: 6, id: 'top', label: '사회', icon: societyIcon },
  { num: 7, id: 'economy', label: '경제', icon: economyIcon },
  { num: 7, id: 'business', label: '경제', icon: economyIcon },
  { num: 8, id: 'etc', label: '그 외', icon: etcIcon },
  { num: 8, id: 'other', label: '그 외', icon: etcIcon },
  { num: 8, id: 'lifestyle', label: '그 외', icon: etcIcon },
]

export const categoryNameMap = {
  politics: '정치',
  sports: '스포츠',
  entertainment: '연예',
  entertain: '연예',
  culture: '문화',
  world: '해외',
  society: '사회',
  top: '사회',
  economy: '경제',
  business: '경제',
  technology: '기술',
  other: '그 외',
  etc: '그 외',
}

export const categoryIdMap = {
  politics: 1, // 정치
  sports: 2, // 스포츠
  entertainment: 3, // 연예
  entertain: 3, // 연예 (동의어)
  culture: 4, // 문화
  world: 5, // 해외 (동의어)
  society: 6, // 사회
  economy: 7, // 경제
  business: 7, // 경제 (동의어)
  etc: 8, // 그 외
  other: 8, // 그 외 (동의어)
}
