import type { NextApiRequest, NextApiResponse } from 'next'
import LRU from 'lru-cache'

const CACHE_MAX_SIZE = Number(process.env.CACHE_MAX_SIZE)
const CACHE_MAX_AGE_IN_SEC = Number(process.env.CACHE_MAX_AGE_IN_SEC)

const context = {
  cache: new LRU<string, unknown>({
    max: CACHE_MAX_SIZE,
    maxAge: CACHE_MAX_AGE_IN_SEC * 1000,
  }),
}

export interface NextApiRequestWithCache extends NextApiRequest {
  cache: typeof context.cache
}

type NextHandler = (req: NextApiRequestWithCache, res: NextApiResponse) => void

export const cache =
  (handler: NextHandler) =>
  (req: NextApiRequestWithCache, res: NextApiResponse): void => {
    req.cache = context.cache

    return handler(req, res)
  }
