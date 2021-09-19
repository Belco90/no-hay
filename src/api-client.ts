export interface GetNewsResponse {
  name: string
}

export function getNews(): Promise<GetNewsResponse> {
  return fetch('/api/hello')
    .then((response) => response.json())
    .then((data) => data)
}
