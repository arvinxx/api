import { request } from '../_utils';

import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async (req: VercelRequest, response: VercelResponse) => {
  const { query } = req;

  const res = await request
    .get<Stock.EasyMoneyProfitResponse>(
      'http://f10.eastmoney.com/ProfitForecast/ProfitForecastAjax',
      {
        params: {
          code: query?.code,
        },
      },
    )
    .catch();
  const { jgyc } = res;

  if (!jgyc) {
    // eslint-disable-next-line @typescript-eslint/no-throw-literal
    throw res;
  }
  const { sy2, sy3 } = jgyc.data[0];

  const data = {
    success: true,
    data: {
      // 东财按照前年开始 因此年份要加 2
      year: jgyc.baseYear + 2,
      yearStart: parseFloat(sy2),
      yearEnd: parseFloat(sy3),
    },
  };

  response.json(data);

  return data;
};
