import { ref } from 'vue'

export const userRelativeTime = (createdAt) => {
  const timeDiffText = ref('')

  const calculateDate = () => {
    const created = new Date(createdAt)
    const now = new Date()

    const diffMs = now.getTime() - created.getTime()
    const diffMinutes = Math.floor(diffMs / (1000 * 60))
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60))
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24))

    if (diffMinutes < 1) {
      timeDiffText.value = '방금 전'
    } else if (diffMinutes < 60) {
      timeDiffText.value = `${diffMinutes}분 전`
    } else if (diffHours < 24) {
      timeDiffText.value = `${diffHours}시간 전`
    } else {
      timeDiffText.value = `${diffDays}일 전`
    }
  }

  return { timeDiffText, calculateDate }
}
