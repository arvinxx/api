import type { VercelRequest, VercelResponse } from '@vercel/node';

import { request } from '../../_utils';

export default async (req: VercelRequest, response: VercelResponse) => {
  const { query } = req;

  const res = await request
    .get<Stock.EasyMoneyProfitResponse>('http://f10.eastmoney.com/ProfitForecast/PageAjax', {
      params: {
        code: query?.code,
      },
    })
    .catch();
  const { jgyc } = res;

  if (!jgyc) {
    // eslint-disable-next-line @typescript-eslint/no-throw-literal
    throw res;
  }
  // EPS2 对应的是 当年初
  // EPS3 对应的是 下年末
  // 东财按照前年开始 因此年份要加 2
  const { EPS2, EPS3, YEAR2 } = jgyc[0];

  const data = {
    success: true,
    data: {
      year: YEAR2,
      yearStart: EPS2,
      yearEnd: EPS3,
    },
  };

  response.json(data);

  return data;
};
