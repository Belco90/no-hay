import type { NextApiResponse } from 'next'
import type { NextApiRequestWithCache } from '~/cache-middleware'
import { cache } from '~/cache-middleware'
import type {
  SuccessApiResponse,
  RetrieveNewsRequestParams,
} from '~/news-api-client'
import { retrieveNews } from '~/news-api-client'
import type { MainTopic } from '~/models'

const CACHE_MAX_AGE_IN_SEC = Number(process.env.CACHE_MAX_AGE_IN_SEC)

const COMMON_REQUEST_PARAMS: Omit<RetrieveNewsRequestParams, 'q'> = {
  lang: 'es',
  countries: 'ES',
  search_in: 'title',
  page_size: 100,
}

async function handler(
  req: NextApiRequestWithCache, // TODO: pass cache type to NextApiRequestWithCache
  res: NextApiResponse<SuccessApiResponse>
): Promise<undefined> {
  // req.url contains the api endpoint + query strings,
  // so it should be enough for identifying each request cache.
  const cacheKey = encodeURIComponent(req.url ?? 'none')

  if (req.cache.has(cacheKey)) {
    // TODO: remove "as" here when NextApiRequestWithCache accepts the cache type
    const { data } = req.cache.get(cacheKey) as { data: SuccessApiResponse }
    res.setHeader('Cache-Control', `s-maxage=${CACHE_MAX_AGE_IN_SEC}`)
    res.setHeader('X-Cache', 'HIT')

    res.status(200).json(data)
    return
  }

  const { topic } = req.query as { topic: MainTopic }
  // TODO: map `topic` to corresponding NewsCatcher query
  const data = await retrieveNews({ ...COMMON_REQUEST_PARAMS, q: topic })

  if (req.cache) {
    req.cache.set(cacheKey, { data })
  }

  res.setHeader('Cache-Control', `no-cache`)
  res.setHeader('X-Cache', 'MISS')
  res.status(200).json(data)
}

export default cache(handler)
