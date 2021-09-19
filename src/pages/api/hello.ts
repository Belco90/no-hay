import type { NextApiRequest, NextApiResponse } from 'next'

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

const CACHE_SECONDS = 21600 // 6 hours

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
): void {
  res.setHeader('Cache-Control', `s-maxage=${CACHE_SECONDS}`)
  res.status(200).json({ name: random() })
}
