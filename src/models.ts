type ArticleTopic =
  | 'news'
  | 'sport'
  | 'tech'
  | 'world'
  | 'finance'
  | 'politics'
  | 'business'
  | 'economics'
  | 'entertainment'
  | 'beauty'
  | 'travel'
  | 'music'
  | 'food'
  | 'science'
  | 'gaming'
  | 'energy'

export interface Article {
  title: string
  author: string | null
  published_date: string
  published_date_precision: 'full' | 'timezone unknown' | 'date'
  link: string
  clean_url: string
  excerpt: string | null
  summary: string
  rights: string
  rank: number
  topic: ArticleTopic
  country: string
  language: string
  authors: Array<string>
  media: string
  is_opinion: boolean
  twitter_account: string | null
  _score: number
  _id: string
}
