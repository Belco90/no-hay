import type { NextApiResponse } from 'next'
import type { NextApiRequestWithCache } from '~/cache-middleware'
import { cache } from '~/cache-middleware'
import type { SuccessApiResponse } from '~/news-api-client'
import { retrieveNews } from '~/news-api-client'

const CACHE_MAX_AGE_IN_SEC = Number(process.env.CACHE_MAX_AGE_IN_SEC)

async function handler(
  req: NextApiRequestWithCache, // TODO: pass cache type to NextApiRequestWithCache
  res: NextApiResponse<SuccessApiResponse>
): Promise<undefined> {
  // TODO: use req.url + params to cache different topics responses properly
  const cacheKey = encodeURIComponent(req.url ?? 'none')

  if (req.cache.has(cacheKey)) {
    // TODO: remove "as" here when NextApiRequestWithCache accepts the cache type
    const { data } = req.cache.get(cacheKey) as { data: SuccessApiResponse }
    res.setHeader('Cache-Control', `s-maxage=${CACHE_MAX_AGE_IN_SEC}`)
    res.setHeader('X-Cache', 'HIT')

    res.status(200).json(data)
    return
  }

  const data = await retrieveNews()

  if (req.cache) {
    req.cache.set(cacheKey, { data })
  }

  res.setHeader('Cache-Control', `no-cache`)
  res.setHeader('X-Cache', 'MISS')
  res.status(200).json(data)
}

export default cache(handler)
