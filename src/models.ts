export interface Article {
  title: string
  author: string | null
  published_date: string
  published_date_precision: 'full' | 'timezone unknown' | 'date'
  link: string
  clean_url: string
  excerpt: string
  summary: string
  rights: string
  rank: number
  topic: 'todo'
  country: string
  language: string
  authors: Array<string>
  media: string
  is_opinion: boolean
  twitter_account: string | null
  _score: number
  _id: string
}
