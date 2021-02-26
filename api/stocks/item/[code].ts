import { request } from '../utils';

import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async (req: VercelRequest, response: VercelResponse) => {
  const { query } = req;

  const res = await request
    .get<Stock.XueqiuResponse>('https://stock.xueqiu.com/v5/stock/quote.json', {
      params: {
        symbol: query?.code,
        extend: 'detail',
      },
      headers: {
        Cookie: `xq_a_token=${query?.token}`,
      },
    })
    .catch();
  const { error_code, data: xueqieData } = res;

  if (error_code === 0) {
    const { quote } = xueqieData;
    const data = { success: true, data: quote };
    response.json(data);

    return data;
  }

  // eslint-disable-next-line @typescript-eslint/no-throw-literal
  throw res;
};
