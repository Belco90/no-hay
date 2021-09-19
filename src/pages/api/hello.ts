import type { NextApiResponse } from 'next'
import type { NextApiRequestWithCache } from '~/cache-middleware'
import { cache } from '~/cache-middleware'

type Data = {
  name: string
}

// TODO: temporary method, remove later
const random = (length = 8): string => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'

  let str = ''
  for (let i = 0; i < length; i++) {
    str += chars.charAt(Math.floor(Math.random() * chars.length))
  }

  return str
}

const CACHE_MAX_AGE_IN_SEC = Number(process.env.CACHE_MAX_AGE_IN_SEC)

function handler(
  req: NextApiRequestWithCache, // TODO: pass cache type to NextApiRequestWithCache
  res: NextApiResponse<Data>
): void {
  const cacheKey = encodeURIComponent(req.url ?? 'none')

  if (req.cache.has(cacheKey)) {
    const { data } = req.cache.get(cacheKey) as { data: Data }
    res.setHeader('Cache-Control', `s-maxage=${CACHE_MAX_AGE_IN_SEC}`)
    res.setHeader('X-Cache', 'HIT')

    res.status(200).json(data)
    return
  }

  // TODO: perform actual request here in the future and catch error
  const randomString = random()

  if (req.cache) {
    req.cache.set(cacheKey, { data: { name: randomString } })
  }

  res.setHeader('Cache-Control', `no-cache`)
  res.setHeader('X-Cache', 'MISS')
  res.status(200).json({ name: randomString })
}

export default cache(handler)
