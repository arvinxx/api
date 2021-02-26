import { request } from './utils';
import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async (_: VercelRequest, res: VercelResponse) => {
  const { response } = await request('https://xueqiu.com/', {
    referrer: 'https://xueqiu.com/',
    headers: {
      Host: 'xueqiu.com',
    },
    getResponse: true,
  });

  const tokenStr: string = response.headers['_headers']['set-cookie'].join('\n'); // -> xq_a_token=62effc1d6e7ddef281d52c4ea32f6800ce2c7473; path=/; domain=.xueqiu.com; httponly

  const token = /xq_a_token=(.*);\spath/.exec(tokenStr)?.[1]; // -> 62effc1d6e7ddef281d52c4ea32f6800ce2c7473
  // const xq_id_token = /xq_id_token=(.*);\spath/.exec(tokenStr)?.[1];
  // const xq_r_token = /xq_r_token=(.*);\spath/.exec(tokenStr)?.[1];

  const data = { success: true, data: { token } };

  res.json(data);

  return data;
};
