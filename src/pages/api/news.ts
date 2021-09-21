import type { NextApiResponse } from 'next'
import type { NextApiRequestWithCache } from '~/cache-middleware'
import { cache } from '~/cache-middleware'
import type { Article } from '~/models'

interface BaseApiResponse {
  totalResults: number
}

interface SuccessApiResponse extends BaseApiResponse {
  status: 'ok'
  articles: Array<Article>
}

interface ErrorApiResponse extends BaseApiResponse {
  status: 'error'
  code: number
  message: string
}

type ApiResponse = SuccessApiResponse | ErrorApiResponse

const CACHE_MAX_AGE_IN_SEC = Number(process.env.CACHE_MAX_AGE_IN_SEC)
const NEWS_API_ENDPOINT = process.env.NEWS_API_ENDPOINT
const NEWS_API_KEY = process.env.NEWS_API_KEY ?? 'none'

async function handler(
  req: NextApiRequestWithCache, // TODO: pass cache type to NextApiRequestWithCache
  res: NextApiResponse<SuccessApiResponse>
): Promise<unknown> {
  const cacheKey = encodeURIComponent(req.url ?? 'none')

  if (req.cache.has(cacheKey)) {
    const { data } = req.cache.get(cacheKey) as { data: SuccessApiResponse }
    res.setHeader('Cache-Control', `s-maxage=${CACHE_MAX_AGE_IN_SEC}`)
    res.setHeader('X-Cache', 'HIT')

    res.status(200).json(data)
    return
  }

  // TODO: catch errors
  const response = await fetch(`${NEWS_API_ENDPOINT}?q=homofobia&language=es`, {
    headers: {
      'X-Api-Key': NEWS_API_KEY,
    },
  })
  const data = (await response.json()) as ApiResponse

  if (data.status === 'error') {
    // TODO: to something with the error
    return
  }

  if (req.cache) {
    req.cache.set(cacheKey, { data })
  }

  res.setHeader('Cache-Control', `no-cache`)
  res.setHeader('X-Cache', 'MISS')
  res.status(200).json(data)
}

export default cache(handler)
