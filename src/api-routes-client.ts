import type { SuccessApiResponse } from '~/news-api-client'
import type { MainTopic } from '~/models'

interface GetNewsArgs {
  topic: MainTopic
}

// TODO: move to useNewsQuery hook
export async function getNews({
  topic,
}: GetNewsArgs): Promise<SuccessApiResponse> {
  const response = await fetch(`/api/news?topic=${topic}`)
  return await response.json()
}
