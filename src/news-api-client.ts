import type { Article } from '~/models'

const NEWS_API_KEY = process.env.NEWS_API_KEY ?? 'not-set'
const NEWS_BASE_URL = 'https://api.newscatcherapi.com'

export interface SuccessApiResponse {
  status: 'ok'
  total_hits: number
  page: number
  total_pages: number
  page_size: number
  articles: Array<Article>
  user_input: unknown
}

export interface ErrorApiResponse {
  status: 'error'
  error_code: string
  message: string
}

export type ApiResponse = SuccessApiResponse | ErrorApiResponse

export interface RetrieveNewsRequestParams {
  q: string
  lang?: string
  countries?: string
  search_in?: 'title' | 'summary'
  page_size?: number
}

export async function retrieveNews({
  page_size,
  ...remainingParams
}: RetrieveNewsRequestParams): Promise<SuccessApiResponse> {
  const searchParams = new URLSearchParams({
    ...remainingParams,
    page_size: String(page_size),
  })
  const response = await fetch(
    `${NEWS_BASE_URL}/v2/search?${searchParams.toString()}`,
    {
      method: 'GET',
      headers: {
        'X-API-KEY': NEWS_API_KEY,
      },
    }
  )

  if (!response.ok) {
    throw new Error(`Fetching error: ${response.statusText}`)
  }

  const data = (await response.json()) as ApiResponse

  if (data.status === 'error') {
    throw new Error(`API error: ${data.message}`)
  }

  data.articles = data.articles.filter((article) => !article.is_opinion)

  return data
}
