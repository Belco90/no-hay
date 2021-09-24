import type { SuccessApiResponse } from '~/news-api-client'

export async function getNews(): Promise<SuccessApiResponse> {
  const response = await fetch('/api/news')
  return await response.json()
}
