const openaiKey = import.meta.env.VITE_OPENAI_API_KEY

export const fetchOpenAiShort = async (description) => {
  try {
    const res = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${openaiKey}`,
      },
      body: JSON.stringify({
        model: 'gpt-4.1',
        messages: [
          {
            role: 'user',
            content: `
            다음 뉴스 내용의 키워드를 찾아내서 간단하게 요약해줘.

            - 1줄로 핵심만 요약해줘
            - 말투는 친구처럼 캐주얼하게. 20~30대가 좋아할 만한 친근한 느낌.
            - 내용에 어울리는 이모지를 넣어서
            - 기승전결이 들어가도록
            **단, 기사에 없는 내용은 절대 쓰지 마.**

              뉴스 내용:
              "${description}"
              `,
          },
        ],
        max_tokens: 200,
        temperature: 0.7,
      }),
    })
    const data = await res.json()
    return data.choices[0].message.content
  } catch (err) {
    console.error('요약 중 오류', err)
    return null
  }
}
