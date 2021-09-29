export const TOPICS = [
  'homophobia',
  'fascism',
  'racism',
  'gender_related_violence',
] as const

export type MainTopic = typeof TOPICS[number]

export const TOPIC_TRANSLATION_MAP: Record<MainTopic, string> = {
  fascism: 'fascismo',
  gender_related_violence: 'violencia de género',
  homophobia: 'homofobia',
  racism: 'racismo',
}

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
