import { request } from './utils';

import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async (req: VercelRequest, response: VercelResponse) => {
  const { query } = req;

  const res = await request
    .get<Stock.XueqiuSearchResponse>('https://xueqiu.com/stock/search.json', {
      params: {
        code: query?.name,
        size: 3,
        page: 1,
      },
      headers: {
        Cookie: `xq_a_token=${query?.token}`,
      },
    })
    .catch();
  const { stocks } = res;

  if (stocks.length === 0) {
    // eslint-disable-next-line @typescript-eslint/no-throw-literal
    throw res;
  }
  const stock = stocks[0];
  const data = { success: true, data: stock };
  response.json(data);

  return data;
};
