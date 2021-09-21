export interface GetNewsResponse {
  name: string
}

export function getNews(): Promise<GetNewsResponse> {
  return fetch('/api/news')
    .then((response) => response.json())
    .then((data) => data)
}
