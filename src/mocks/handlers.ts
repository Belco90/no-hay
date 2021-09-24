import type { DefaultRequestBody, RequestParams } from 'msw'
import { rest } from 'msw'
import type { SuccessApiResponse } from '~/news-api-client'
import homophobiaFixture from '~/fixtures/homophobia-example'

export const handlers = [
  rest.get<DefaultRequestBody, SuccessApiResponse, RequestParams>(
    'https://api.newscatcherapi.com/v2/search',
    (req, res, ctx) => {
      return res(ctx.json(homophobiaFixture))
    }
  ),
]
